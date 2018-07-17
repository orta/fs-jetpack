type AppendData = string | Buffer;

type AppendOptions = {
  mode?: string | number;
};

type OverwriteFunction = (
  srcInspectData: InspectResult,
  destInspectData: InspectResult
) => boolean | Promise<boolean>;

type CopyOptions = {
  overwrite?: boolean | OverwriteFunction;
  matching?: string | string[];
};

type DirCriteria = {
  empty?: boolean;
  mode?: string | number;
};

type ExistsResult = false | "dir" | "file" | "other";

type FileOptions = {
  content?: WritableData;
  jsonIndent?: number;
  mode?: string | number;
};

type FindOptions = {
  matching?: string | string[];
  files?: boolean;
  directories?: boolean;
  recursive?: boolean;
};

export type Checksum = "md5" | "sha1" | "sha256" | "sha512";

type InspectOptions = {
  checksum?: Checksum;
  mode?: boolean;
  times?: boolean;
  absolutePath?: boolean;
  symlinks?: "report" | "follow";
};

interface InspectResult {
  name: string;
  type: "file" | "dir" | "symlink";
  size: number;
  md5?: string;
  sha1?: string;
  sha256?: string;
  sha512?: string;
  mode?: number;
  accessTime?: Date;
  modifyTime?: Date;
  changeTime?: Date;
}

type InspectTreeOptions = {
  checksum?: Checksum;
  relativePath?: boolean;
  symlinks?: "report" | "follow";
};

interface InspectTreeResult extends InspectResult {
  relativePath: string;
  children: InspectTreeResult[];
}

type WritableData = string | object | Array<any> | Buffer;

type WriteOptions = {
  atomic?: boolean;
  jsonIndent?: number;
};

interface FSJetpack {
  cwd: {
    (): string;
    (...pathParts: string[]): FSJetpack;
  };

  path(...pathParts: string[]): string;

  append(path: string, data: AppendData, options?: AppendOptions): void;
  appendAsync(
    path: string,
    data: AppendData,
    options?: AppendOptions
  ): Promise<void>;

  copy(from: string, to: string, options?: CopyOptions): void;
  copyAsync(from: string, to: string, options?: CopyOptions): Promise<void>;

  createWriteStream(path: any, options?: any): any; // TODO
  createReadStream(path: any, options?: any): any; // TODO

  dir(path: string, criteria?: DirCriteria): FSJetpack;
  dirAsync(path: string, criteria?: DirCriteria): Promise<FSJetpack>;

  exists(path: string): ExistsResult;
  existsAsync(path: string): Promise<ExistsResult>;

  file(path: string, criteria?: FileOptions): FSJetpack;
  fileAsync(path: string, criteria?: FileOptions): Promise<FSJetpack>;

  find(options?: FindOptions): string[];
  find(startPath: string, options?: FindOptions): string[];
  findAsync(options?: FindOptions): Promise<string[]>;
  findAsync(startPath: string, options?: FindOptions): Promise<string[]>;

  inspect(path: string, options?: InspectOptions): InspectResult;
  inspectAsync(path: string, options?: InspectOptions): Promise<InspectResult>;

  inspectTree(path: string, options?: InspectTreeOptions): InspectTreeResult;
  inspectTreeAsync(
    path: string,
    options?: InspectTreeOptions
  ): Promise<InspectTreeResult>;

  list(path?: string): string[];
  listAsync(path?: string): Promise<string[]>;

  move(from: string, to: string): void;
  moveAsync(from: string, to: string): Promise<void>;

  read(path: string): string;
  read(path: string, returnAs: "utf8"): string;
  read(path: string, returnAs: "buffer"): Buffer;
  read(path: string, returnAs: "json" | "jsonWithDates"): any;
  readAsync(path: string): Promise<string>;
  readAsync(path: string, returnAs: "utf8"): Promise<string>;
  readAsync(path: string, returnAs: "buffer"): Promise<Buffer>;
  readAsync(path: string, returnAs: "json" | "jsonWithDates"): Promise<any>;

  remove(path?: string): void;
  removeAsync(path?: string): Promise<void>;

  rename(path: string, newName: string): void;
  renameAsync(path: string, newName: string): Promise<void>;

  symlink(symlinkValue: string, path: string): void;
  symlinkAsync(symlinkValue: string, path: string): Promise<void>;

  write(path: string, data: WritableData, options?: WriteOptions): void;
  writeAsync(
    path: string,
    data: WritableData,
    options?: WriteOptions
  ): Promise<void>;
}

declare const jetpack: FSJetpack;

export = jetpack;
