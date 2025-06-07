import type { Result } from "@core/result";
import type { UnexpectedError } from "../errors/unexpected";

export type FilePath = string;

export interface FileStorageGateway {
  upload(args: {
    file: Buffer;
    path: FilePath;
    mimeType?: string;
  }): Promise<Result<FilePath, UnexpectedError>>;
  download(path: FilePath): Promise<Result<Buffer, UnexpectedError>>;
  delete(path: FilePath): Promise<Result<void, UnexpectedError>>;
  exists(path: FilePath): Promise<Result<boolean, UnexpectedError>>;
}
