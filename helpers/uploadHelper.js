// helpers/uploadHelper.js
import aws from 'aws-sdk';
import awsConfig from '../config/aws-Config.js'

const s3 = new aws.S3(awsConfig);

const uploadToS3 = async (params) => {
  try {
    return await s3.upload(params).promise();
  } catch (error) {
    throw error;
  }
};

export { uploadToS3 };
