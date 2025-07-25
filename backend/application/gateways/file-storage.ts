import type { Result } from "@core/result";
import type { NotFoundError } from "../errors/not-found";
import type { UnexpectedError } from "../errors/unexpected";

export type FilePath = string;

export interface FileStorageGateway {
  upload(args: {
    file: File;
    path: FilePath;
    mimeType?: string;
  }): Promise<Result<FilePath, UnexpectedError>>;
  download(
    path: FilePath,
  ): Promise<Result<File, NotFoundError | UnexpectedError>>;
  delete(path: FilePath): Promise<Result<void, UnexpectedError>>;
  exists(path: FilePath): Promise<Result<boolean, UnexpectedError>>;
}
