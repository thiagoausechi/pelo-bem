import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketCorsCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { UnexpectedError } from "@server/application/errors/unexpected";

export class Bucket {
  constructor(
    private readonly s3Client: S3Client,
    private readonly bucketName: string,
  ) {}

  async initialize() {
    try {
      if (!(await this.exists())) await this.create();

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
      throw new UnexpectedError("Erro ao verificar bucket", error as Error);
    }
  }

  private async create() {
    try {
      await this.s3Client.send(
        new CreateBucketCommand({ Bucket: this.bucketName }),
      );
    } catch (error) {
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
      if (
        error !== null &&
        typeof error === "object" &&
        "Code" in error &&
        (error.Code === "MalformedXML" || error.Code === "NotImplemented")
      )
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
                // TODO: Ajustar para utilizar variáveis de ambiente
                AllowedOrigins: ["http://localhost:3000"],
                ExposeHeaders: [],
                MaxAgeSeconds: 3000,
              },
            ],
          },
        }),
      );
    } catch (error) {
      throw new UnexpectedError(
        "Erro ao configurar CORS para o bucket",
        error as Error,
      );
    }
  }

  get name() {
    return this.bucketName;
  }
}
