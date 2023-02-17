import { isEmpty } from "lodash";
import logger from "pino";
import dotenv from "dotenv";

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  COOKIE_KEY: process.env.COOKIE_KEY,
  JWT_KEY: process.env.JWT_KEY,
  APP_NAME: process.env.APP_NAME,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_REGION: process.env.AWS_REGION,
  AWS_FILE_URL: process.env.AWS_FILE_URL,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
   ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

export default config;
