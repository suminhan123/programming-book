import { ErrorStatus, HttpError } from "@/lib/error";
import * as UploadImage from "../fetcher";
import { uploadImageData } from "./fixture";

jest.mock("../fetcher");

/**
 * 이미지 업로드 api 호출하는 mock 함수
 */
export function mockUploadImage(status?: ErrorStatus) {
  if (status && status > 299) {
    return jest
      .spyOn(UploadImage, "uploadImage")
      .mockRejectedValueOnce(new HttpError(status).serialize());
  }
  return jest
    .spyOn(UploadImage, "uploadImage")
    .mockResolvedValueOnce(uploadImageData);
}
