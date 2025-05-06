import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.NODE_ENV === "production",
});

const uploadOnCloudinary = async function (LocalFilePath) {
  if (!LocalFilePath) return null;
  const isFileExist = fs.existsSync(LocalFilePath);
  if (!isFileExist) return null;
  try {
    const response = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });

    console.log("file uploaded to cloudinary", response.url);
    // delete local file
    fs.unlinkSync(LocalFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(LocalFilePath); // remove locally saved temporary file as the upload operation got failed
    return null;
  }
};

// "http://res.cloudinary.com/cld-docs/image/upload/v1719304891/cld-sample.jpg"
const deleteFromCloudinary = async function (filePath) {
  try {
    const publicID = filePath.split("/").pop().split(".")[0]; // getting the public Id from the url
    const response = await cloudinary.uploader.destroy(publicID); // deleting the file on cloudinary
    if (response.result != "ok")
      console.error("file deletion on cloudinary failed", filePath);
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
