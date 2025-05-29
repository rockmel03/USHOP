import { deleteFromCloudinary, uploadOnCloudinary } from "./cloudinary.js";

export const uploadFilesToCloud = async (files = [], altPrefix = "image") => {
  const filesToUpload = Array.isArray(files) ? files : [files];
  5;

  const uploads = filesToUpload.map((file, i) => {
    return uploadOnCloudinary(file.path).then((uploadResult) => {
      if (uploadResult) {
        const { public_id, secure_url, format, bytes, created_at } =
          uploadResult;
        return {
          public_id,
          url: secure_url,
          alt: altPrefix.replace(" ", "_") + "_" + i,
          format,
          bytes,
          created_at,
        };
      }
      return null;
    });
  });

  return await Promise.all(uploads);
};

export const deleteFilesFromCloud = async (urls = []) => {
  const fileUrls = Array.isArray(urls) ? urls : [urls];

  // delete img from cloudinary
  const deletePromises = fileUrls.map((url) =>
    deleteFromCloudinary(url).then((res) => {
      return {
        success: res?.result === "ok",
        url: url,
      };
    })
  );

  return await Promise.all(deletePromises);
};
