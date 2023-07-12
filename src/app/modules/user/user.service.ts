import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { pool } from '../../../server';
import { IUser } from './user.interface';
import { RowDataPacket } from 'mysql2/promise';

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
   getAllUsers,
};
