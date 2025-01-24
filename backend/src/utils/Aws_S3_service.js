import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import crypto from 'crypto';
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"


const bucketName = process.env.AWS_BUCKET_NAME || "blogapp-awss3" 
const region = process.env.BUCKET_REGION ||"us-east-1" 
const accessKeyId = process.env.AWS_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const generateFileName = () => {
  return crypto.randomBytes(16).toString('hex')
}


export const uploadto_S3 = async ({ originalname, buffer, mimetype }, res) => {

  const fileName = generateFileName(originalname) //genereate unique name to avoid overriding uploaded image

  //resize images
  const fileBuffer = await sharp(buffer)
    .resize({ height: 600, width: 1200, fit: "contain" })//// stretch
    .toBuffer()

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype
  }

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    return fileName; //to store and retrive image_id from db

  } catch (error) {
    throw new Error(error);
  }

}

export const retrieveFrom_S3 = async (posts) => {

  for (let post of posts) {
    if (post.imageName) {

      const params = {
        Bucket: bucketName,
        Key: post.imageName,
      };
      const command = new GetObjectCommand(params);

      try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        post.imageUrl = url; // Add the signed URL to the post
      } catch (error) {
        console.error(`Error retrieving signed URL for post ${post._id}:`, error);
        post.imageUrl = '';
      }
    }
  }
  return posts;
};

export const deletefromS3 = async (imageName) => {

  const params = {
    Bucket: bucketName,
    Key: imageName,
  }

  const command = new DeleteObjectCommand(params);

  const success = await s3Client.send(command);

  if (success) {
    return;
  }
  else {
    throw new Error("Failed to delete file from S3");
  }
}
export default s3Client;