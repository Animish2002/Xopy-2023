// config/aws-config.js
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucketName: process.env.S3_BUCKET_NAME,
};

export default awsConfig;

