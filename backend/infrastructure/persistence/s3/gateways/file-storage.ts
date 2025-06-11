import type { Result } from "@core/result";
import type { UnexpectedError } from "@server/application/errors/unexpected";
import type {
  FilePath,
  FileStorageGateway,
} from "@server/application/gateways/file-storage";

export class S3FileStorageGateway implements FileStorageGateway {
  upload(args: {
    file: Buffer;
    path: FilePath;
    mimeType?: string;
  }): Promise<Result<FilePath, UnexpectedError>> {
    throw new Error("Method not implemented.");
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
