import { pool } from '../../../server';
import { IUser } from './user.interface';
import { RowDataPacket } from 'mysql2/promise';
import { IDonor } from '../donor/donor.interface';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IAdmin } from '../admin/admin.interface';

/* create donor */
const createDonor = async (donor: IDonor, userData: IUser) => {
   userData.role = 'donor';
   userData.email = donor.email;

   /* password hashing */
   userData.password = userData.password && (await bcrypt.hash(userData.password, 12));

   //check if donor already exists
   const [donorExists] = await pool.query<RowDataPacket[]>('SELECT * FROM donors WHERE email = ?', [
      donor.email,
   ]);
   const existsDonors: IDonor[] | RowDataPacket[] = donorExists.map((row: RowDataPacket) => row);
   if (existsDonors.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Donor already exists');
      return;
   }

   try {
      //add donor do donors table and get donor id
      const [donorResult] = await pool.query('INSERT INTO donors SET ?', donor);
      const donorId = donorResult ? (donorResult as RowDataPacket).insertId : undefined;

      if (donorId) {
         userData.donor = donorId;
         //add user to users table
         const [userResult] = await pool.query('INSERT INTO users SET ?', userData);

         const userId = userResult ? (userResult as RowDataPacket).insertId : undefined;

         const createdDonor = {
            id: userId,
            role: userData.role,
            donor: { ...donor },
         };
         return createdDonor;
      } else {
         throw new ApiError(httpStatus.BAD_GATEWAY, 'Failed to create donor');
      }
   } catch (error) {
      throw error;
   }
};

/* create admin */
const createAdmin = async (admin: IAdmin, userData: IUser) => {
   userData.role = 'admin';
   userData.email = admin.email;

   /* password hashing */
   userData.password = userData.password && (await bcrypt.hash(userData.password, 12));

   //check if admin already exists
   const [adminExists] = await pool.query<RowDataPacket[]>('SELECT * FROM admin WHERE email = ?', [
      admin.email,
   ]);
   const existsAdmin: IAdmin[] | RowDataPacket[] = adminExists.map((row: RowDataPacket) => row);
   if (existsAdmin.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Admin already exists');
      return;
   }

   try {
      //add admin to admin table and get admin id
      const [adminResult] = await pool.query('INSERT INTO admin SET ?', admin);
      const adminId = adminResult ? (adminResult as RowDataPacket).insertId : undefined;

      if (adminId) {
         userData.admin = adminId;
         //add user to users table
         const [userResult] = await pool.query('INSERT INTO users SET ?', userData);

         const userId = userResult ? (userResult as RowDataPacket).insertId : undefined;

         const createdAdmin = {
            id: userId,
            role: userData.role,
            donor: { ...admin },
         };
         return createdAdmin;
      } else {
         throw new ApiError(httpStatus.BAD_GATEWAY, 'Failed to create admin');
      }
   } catch (error) {
      throw error;
   }
};

/* get all users */
const getAllUsers = async (): Promise<IUser[] | RowDataPacket[]> => {
   try {
      const [results] = await pool.query<RowDataPacket[]>('SELECT * FROM users');
      const users: IUser[] | RowDataPacket[] = results.map((row: RowDataPacket) => row);

      for (let user of users) {
         if (user.password) {
            delete user.password;
         }
         user.donor =
            user.donor !== null &&
            (
               (
                  await pool.query('SELECT * FROM donors WHERE id = ?', [user.donor])
               )[0] as RowDataPacket[]
            )[0];

         user.admin =
            user.admin !== null &&
            (
               (
                  await pool.query('SELECT * FROM admins WHERE id = ?', [user.admin])
               )[0] as RowDataPacket[]
            )[0];
      }

      return users;
   } catch (error) {
      throw error;
   }
};

export const UserService = {
   createDonor,
   createAdmin,
   getAllUsers,
};
