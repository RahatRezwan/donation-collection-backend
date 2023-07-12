import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../../server';
import { IAdmin } from './admin.interface';

/* get all admins */
const getAllAdmins = async () => {
   try {
      const [admins] = await pool.query('SELECT * FROM admins');
      return admins;
   } catch (error) {
      throw error;
   }
};

/* get single admin */
const getSingleAdmin = async (adminId: string) => {
   try {
      const [admin] = await pool.query<RowDataPacket[]>(
         'SELECT * FROM admins WHERE id = ?',
         Number(adminId),
      );
      const adminsData: IAdmin[] | RowDataPacket[] = admin.map((row: RowDataPacket) => row);
      return adminsData[0];
   } catch (error) {
      throw error;
   }
};

/* update single admin */
const updateSingleAdmin = async (adminId: string, updateData: any) => {
   try {
      const [admin] = await pool.query('UPDATE admins SET ? WHERE id = ?', [
         updateData,
         Number(adminId),
      ]);
      return admin;
   } catch (error) {
      throw error;
   }
};

/* delete single admin */
const deleteSingleAdmin = async (adminId: string) => {
   try {
      // delete user
      const [deleteUser] = await pool.query('DELETE FROM users WHERE admin = ?', [Number(adminId)]);

      //delete admin
      const [deleteAdmin] = await pool.query('DELETE FROM admins WHERE id = ?', [Number(adminId)]);

      return deleteAdmin;
   } catch (error) {
      throw error;
   }
};

export const AdminService = {
   getAllAdmins,
   getSingleAdmin,
   updateSingleAdmin,
   deleteSingleAdmin,
};
