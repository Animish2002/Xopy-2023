// controllers/uploadController.js
// import {uploadToS3} from '../helpers/uploadHelper.js';
import AWS from 'aws-sdk'; 




const s3 = new AWS.S3();
async function upS3(base64String, fileName) {
  // Decode the base64 string
  const base64Content = base64String.split(';base64,').pop();
  const buffer = Buffer.from(base64Content, 'base64');

  // Set up the S3 upload parameters
  const params = {
      Bucket: "s3firsttrial",
      Key: fileName,
      Body: buffer,
      ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // Adjust the ContentType based on your file type
  };

  // Upload the file to S3
  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location; // Return the URL of the uploaded file
} catch (error) {
    console.error('Error uploading file:', error);
    throw error; // It's better to throw the error to handle it in the calling function
}}



const uploadController = async (req, res) => {
  
  try {
          let file_name = Object.keys(req.body)[0]
          
          // console.log(file_name)
          // Assuming you are using a middleware to handle file upload
          // console.log(req.body)

          const uploadPromises = Object.keys(req.body).map(file =>
       
            upS3(req.body[file], file)
        );

          const fileUrls = await Promise.all(uploadPromises);

          // let result= await upS3(req.body[file_name],file_name)
          console.log(fileUrls)
          res.json({ success: true, message: 'File uploaded successfully', fileUrl: fileUrls});
        } catch (error) {
          console.error('Error uploading file:', error);
          res.status(500).json({ success: false, message: 'File upload failed' });
        }
      };
      
      export default uploadController;