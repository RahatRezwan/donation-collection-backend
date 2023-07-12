import { pool } from '../../../server';
import { IUser } from './user.interface';
import { RowDataPacket } from 'mysql2/promise';
import { IDonor } from '../donor/donor.interface';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

/* create donor */
const createDonor = async (donor: IDonor, userData: IUser) => {
   userData.role = 'donor';
   userData.password = userData.password && (await bcrypt.hash(userData.password, 12));
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

const getAllUsers = async (): Promise<IUser[] | RowDataPacket[]> => {
   try {
      const [results] = await pool.query<RowDataPacket[]>('SELECT * FROM users0');
      const users: IUser[] | RowDataPacket[] = results.map((row: RowDataPacket) => row);
      return users;
   } catch (error) {
      throw error;
   }
};

export const UserService = {
   createDonor,
   getAllUsers,
};
