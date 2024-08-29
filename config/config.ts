import dotenv from 'dotenv';

dotenv.config();

export default {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
  server: {
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000,
    node_env: process.env.NODE_ENV || "production",
  }
}