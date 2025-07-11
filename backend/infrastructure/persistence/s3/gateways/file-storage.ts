import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
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
import { Bucket } from "../bucket";

export class S3FileStorageGateway implements FileStorageGateway {
  constructor(
    private readonly s3Client: S3Client,
    private readonly bucketName: string,
  ) {
    void new Bucket(s3Client, bucketName).initialize();
  }

  async upload(args: {
    file: File;
    path: FilePath;
    mimeType?: string;
  }): Promise<Result<FilePath, UnexpectedError>> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: args.path,
      Body: Buffer.from(await args.file.arrayBuffer()),
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
  ): Promise<Result<File, NotFoundError | UnexpectedError>> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    try {
      const response = await this.s3Client.send(command);
      if (!response.Body) return err(new NotFoundError("Arquivo"));

      const contentType = response.ContentType ?? "application/octet-stream";
      const filename = path.split("/").pop() ?? "arquivo";

      const byteArray = await response.Body.transformToByteArray();
      const file = new File([new Uint8Array(byteArray)], filename, {
        type: contentType,
      });

      return ok(file);
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

  async delete(path: FilePath): Promise<Result<void, UnexpectedError>> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    try {
      await this.s3Client.send(command);
      return ok(undefined);
    } catch (error) {
      console.error("Erro ao deletar o arquivo do S3:", error);
      return err(
        new UnexpectedError("Erro ao deletar o arquivo", error as Error),
      );
    }
  }

  async exists(path: FilePath): Promise<Result<boolean, UnexpectedError>> {
    // HeadObject é a forma mais eficiente de verificar a existência de um objeto
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    try {
      await this.s3Client.send(command);
      // Se o comando for bem-sucedido, o arquivo existe
      return ok(true);
    } catch (error) {
      // Se o erro for de não encontrado, o arquivo não existe
      if (error instanceof Error && error.name === "NotFound") return ok(false);

      console.error("Erro ao verificar a existência do arquivo no S3:", error);
      return err(
        new UnexpectedError(
          "Erro ao verificar a existência do arquivo",
          error as Error,
        ),
      );
    }
  }
}
