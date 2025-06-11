import {
  GetObjectCommand,
  PutObjectCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import type {
  FilePath,
  FileStorageGateway,
} from "@server/application/gateways/file-storage";

export class S3FileStorageGateway implements FileStorageGateway {
  constructor(
    private readonly s3Client: S3Client,
    private readonly bucketName: string,
  ) {}

  async upload(args: {
    file: Buffer;
    path: FilePath;
    mimeType?: string;
  }): Promise<Result<FilePath, UnexpectedError>> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: args.path,
      Body: args.file,
      ContentType: args.mimeType,
      ACL: "public-read",
    });

    try {
      await this.s3Client.send(command);
      return ok(args.path);
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo para o S3:", error);
      return err(
        new UnexpectedError("Erro ao fazer upload do arquivo", error as Error),
      );
    }
  }

  async download(
    path: FilePath,
  ): Promise<Result<Buffer, NotFoundError | UnexpectedError>> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    try {
      const response = await this.s3Client.send(command);
      if (!response.Body) return err(new NotFoundError("Arquivo"));

      // Converte o ReadableStream do S3 para um Buffer
      const byteArray = await response.Body.transformToByteArray();
      const buffer = Buffer.from(byteArray);

      return ok(buffer);
    } catch (error) {
      console.error("Erro ao fazer download do arquivo para o S3:", error);
      return err(
        new UnexpectedError(
          "Erro ao fazer download do arquivo",
          error as Error,
        ),
      );
    }
  }

  delete(path: FilePath): Promise<Result<void, UnexpectedError>> {
    throw new Error("Method not implemented.");
  }

  exists(path: FilePath): Promise<Result<boolean, UnexpectedError>> {
    throw new Error("Method not implemented.");
  }
}
