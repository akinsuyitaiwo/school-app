export enum FileTypes {
  IMAGE = "image",
  DOCUMENT = "document",
  AUDIO = "audio",
  VIDEO = "vidoe",
}

export interface FileData {
  key: string;
  type: string;
  url: string;
  mimetype: string;
}
