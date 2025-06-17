import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketCorsCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { UnexpectedError } from "@server/application/errors/unexpected";
import { env } from "@server/infrastructure/configs/env";

export class Bucket {
  constructor(
    private readonly s3Client: S3Client,
    private readonly bucketName: string,
  ) {}

  async initialize() {
    try {
      if (!(await this.exists())) {
        if (await this.create()) return await this.makePublic();

        // Se a criação falhar, não faz nada, pois o bucket já existe ou não pode ser criado
        return;
      }

      await this.makePublic();
    } catch (error) {
      throw new UnexpectedError("Erro ao inicializar bucket", error as Error);
    }
  }

  private async exists(): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadBucketCommand({ Bucket: this.bucketName }),
      );
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "NotFound") return false;
      if (
        this.handleConnectionError(
          error,
          "Não foi possível determinar se o bucket existe.",
        )
      )
        return false;
      throw new UnexpectedError("Erro ao verificar bucket", error as Error);
    }
  }

  private async create() {
    try {
      await this.s3Client.send(
        new CreateBucketCommand({ Bucket: this.bucketName }),
      );
      return true;
    } catch (error) {
      if (this.handleConnectionError(error, "Não foi possível criar o bucket."))
        return false;
      throw new UnexpectedError("Erro ao criar bucket", error as Error);
    }
  }

  private async makePublic() {
    try {
      await Promise.all([
        this.disablePublicAccessBlock(),
        this.definePublicPolicy(),
        this.configureCORS(),
      ]);
    } catch (error) {
      throw new UnexpectedError(
        "Erro ao configurar o acesso público ou CORS para o bucket",
        error as Error,
      );
    }
  }

  private async disablePublicAccessBlock() {
    try {
      await this.s3Client.send(
        new PutPublicAccessBlockCommand({
          Bucket: this.bucketName,
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: false,
            IgnorePublicAcls: false,
            BlockPublicPolicy: false,
            RestrictPublicBuckets: false,
          },
        }),
      );
    } catch (error) {
      if (this.isCode(error, ["MalformedXML", "NotImplemented"]))
        return console.warn(
          "AVISO: O comando PutPublicAccessBlock não é suportado por este endpoint S3. Isso é esperado para o MinIO e pode ser ignorado.",
        );

      throw new UnexpectedError(
        "Erro ao desativar bloqueio de acesso público",
        error as Error,
      );
    }
  }

  private async definePublicPolicy() {
    try {
      await this.s3Client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucketName,
          Policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "PublicReadGetObject",
                Effect: "Allow",
                Principal: "*",
                Action: "s3:GetObject",
                // Permite acesso a todos os objetos no bucket
                Resource: `arn:aws:s3:::${this.bucketName}/*`,
              },
            ],
          }),
        }),
      );
    } catch (error) {
      throw new UnexpectedError(
        "Erro ao definir política pública para o bucket",
        error as Error,
      );
    }
  }

  private async configureCORS() {
    try {
      await this.s3Client.send(
        new PutBucketCorsCommand({
          Bucket: this.bucketName,
          CORSConfiguration: {
            CORSRules: [
              {
                AllowedHeaders: [],
                AllowedMethods: ["GET", "HEAD"],
                AllowedOrigins: [env.APP_URL],
                ExposeHeaders: [],
                MaxAgeSeconds: 3000,
              },
            ],
          },
        }),
      );
    } catch (error) {
      if (this.isCode(error, "NotImplemented")) return;
      throw new UnexpectedError(
        "Erro ao configurar CORS para o bucket",
        error as Error,
      );
    }
  }

  private isCode(error: unknown, code: string | string[]) {
    if (error === null || typeof error !== "object") return false;

    const includesCode = (codeInError: string) =>
      Array.isArray(code) ? code.includes(codeInError) : codeInError === code;

    if ("Code" in error) return includesCode((error as { Code: string }).Code);
    if ("code" in error) return includesCode((error as { code: string }).code);
    return false;
  }

  private handleConnectionError(error: unknown, message: string) {
    if (!this.isCode(error, "ECONNREFUSED")) return false;

    console.warn(
      `AVISO: ${message} A conexão foi recusada. Isso pode indicar que o serviço S3 não está em execução.`,
    );

    return true;
  }

  get name() {
    return this.bucketName;
  }
}
