const AWS = require('aws-sdk');
const Sharp = require('sharp');

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();

exports.handler = async (event) => {
  let filesProcessed = event.Records.map(async (record) => {
    let bucket = record.s3.bucket.name;
    let filename = record.s3.object.key;

    // Get file from S3
    var params = {
      Bucket: bucket,
      Key: filename,
    };

    let inputData = await s3.getObject(params).promise();

    // Resize the file
    let buffer = await Sharp(inputData.Body)
      .resize(150)
      .toFormat('jpg')
      .toBuffer();

    // Upload the new file to s3
    let targetFilename =
      filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';
    var params = {
      Bucket: bucket + '-dest',
      Key: targetFilename,
      Body: buffer,
      ContentType: 'image/jpeg',
    };

    return await s3.putObject(params).promise();
  });

  await Promise.all(filesProcessed);
  console.log('done');
  return 'done';
};
