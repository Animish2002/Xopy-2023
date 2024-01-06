import AWS from 'aws-sdk';

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: 'AKIAS4SYGM3PGYIDOZFS',
    secretAccessKey: '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',
    region: 'ap-south-1'
});

const listFilesController = async (req, res) => {
    const params = {
        Bucket: 's3firsttrial', // replace with your bucket name
        // You can add other parameters like Prefix, MaxKeys, etc., if needed
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        // console.log(data)
        const files = data.Contents.map(file => {
            return { 
                key: file.Key,
                size: file.Size,
                lastModified: file.LastModified,
                url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`
            };
        });

        res.json({ success: true, files: files });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch files' });
    }
};

export default listFilesController;
