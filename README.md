# aws-resize-images

## AWS Services

- AWS Lambda
- AWS S3

## AWS Lambda Layers

- nodejs-sharp-lambda-layer
  https://serverlessrepo.aws.amazon.com/applications/us-east-1/987481058235/nodejs-sharp-lambda-layer

## Configuration Extra

AWS Lambda Function Timeout: 2 min 0 sec

AWS Lambda Trigger

- Event type: ObjectCreatedByPut
- Notification name: resizeImageNotification
- Prefix: None
- Suffix: .jpg
