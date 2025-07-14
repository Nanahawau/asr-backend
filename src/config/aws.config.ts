import { registerAs } from '@nestjs/config';
export default registerAs('awsConfig', () => ({
    region: process.env.REGION || '',
    bucket: process.env.BUCKET_NAME || '',
    accessKeyID: process.env.ACCESSKEYID || '',
    secretKeyID: process.env.SECRETKEYID || '',
}));