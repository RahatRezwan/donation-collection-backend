import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
   path: path.resolve(process.cwd(), '.env'),
});

export default {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   database_host: process.env.DB_HOST,
   database_user: process.env.DB_USER,
   database_password: process.env.DB_PASSWORD,
   database_name: process.env.DB_NAME,
};
