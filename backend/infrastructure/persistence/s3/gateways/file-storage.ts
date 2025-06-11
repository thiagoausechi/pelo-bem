import { PutObjectCommand, type S3Client } from "@aws-sdk/client-s3";
import { err, ok, type Result } from "@core/result";
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

  download(path: FilePath): Promise<Result<Buffer, UnexpectedError>> {
    throw new Error("Method not implemented.");
  }

  delete(path: FilePath): Promise<Result<void, UnexpectedError>> {
    throw new Error("Method not implemented.");
  }

  exists(path: FilePath): Promise<Result<boolean, UnexpectedError>> {
    throw new Error("Method not implemented.");
  }
}
