import app from './app';
import { Server, createServer } from 'http';
import mysql from 'mysql2/promise'; // Import the promise version of the mysql2 library
import config from './config';

process.on('uncaughtException', (error) => {
   console.error(error);
   process.exit(1);
});

let server: Server;

export const pool = mysql.createPool({
   host: config.database_host,
   user: config.database_user,
   password: config.database_password,
   database: config.database_name,
});

async function cowHutDatabase() {
   try {
      const connection = await pool.getConnection(); // Use `await` to make the connection asynchronously
      console.log('Database connected successfully');
      connection.release();

      server = createServer(app).listen(config.port, () => {
         console.log(`Application listening on port ${config.port}`);
      });
   } catch (error) {
      console.error('Failed to connect to database:', error);
      process.exit(1);
   }

   process.on('unhandledRejection', (error) => {
      if (server) {
         server.close(() => {
            console.error(error);
            process.exit(1);
         });
      } else {
         process.exit(1);
      }
   });
}

cowHutDatabase();
