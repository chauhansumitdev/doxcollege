import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { Response } from "express";
import {
  BlobServiceClient,
  BlobClient,
  ContainerClient,
  BlobDownloadResponseModel,
} from "@azure/storage-blob";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

// Connection string
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!connectionString && !containerName) {
  throw Error("Azure Storage Connection string and Container name not found");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);

export async function uploadFile(file: any, userId: number) {
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
  }

  const name = `doxcollege-${userId}-${file.filename}`;
  const blockBlobClient = containerClient.getBlockBlobClient(name);

  const fileData = fs.readFileSync(file.path);
  await blockBlobClient.uploadData(fileData);
  const blob = {
    url: blockBlobClient.url,
    name: file.filename,
    mimetype: file.mimetype,
  };
  return blob;
}

export async function downloadBlobAsStream(
  blobName: string,
  response: Response
): Promise<void> {
  const blobClient: BlobClient = containerClient.getBlobClient(blobName);

  const downloadResponse: BlobDownloadResponseModel =
    await blobClient.download();

  if (!downloadResponse.errorCode && downloadResponse.readableStreamBody) {
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${blobName}"`
    );
    response.setHeader("Content-Type", downloadResponse.contentType);

    downloadResponse.readableStreamBody.on("data", (chunk) => {
      response.write(chunk);
    });

    downloadResponse.readableStreamBody.on("end", () => {
      response.end();
      console.log(`Download of ${blobName} succeeded`);
    });
  }
}
