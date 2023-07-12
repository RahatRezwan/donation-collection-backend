import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../../server';
import { IDonor } from './donor.interface';

/* get all donors */
const getAllDonors = async () => {
   try {
      const [donors] = await pool.query('SELECT * FROM donors');
      return donors;
   } catch (error) {
      throw error;
   }
};

/* get single donor */
const getSingleDonor = async (donorId: string) => {
   try {
      const [donor] = await pool.query<RowDataPacket[]>(
         'SELECT * FROM donors WHERE id = ?',
         Number(donorId),
      );
      const donorsData: IDonor[] | RowDataPacket[] = donor.map((row: RowDataPacket) => row);
      return donorsData[0];
   } catch (error) {
      throw error;
   }
};

/* update single donor */
const updateSingleDonor = async (donorId: string, updateData: any) => {
   try {
      //update user email if donor email is updated
      if (updateData.email) {
         const [user] = await pool.query('UPDATE users SET email = ? WHERE donor = ?', [
            updateData.email,
            Number(donorId),
         ]);
      }
      const [donor] = await pool.query('UPDATE donors SET ? WHERE id = ?', [
         updateData,
         Number(donorId),
      ]);
      return donor;
   } catch (error) {
      throw error;
   }
};

/* delete single donor */
const deleteSingleDonor = async (donorId: string) => {
   try {
      // delete user
      const [deleteUser] = await pool.query('DELETE FROM users WHERE donor = ?', [Number(donorId)]);

      //delete donor
      const [deleteDonor] = await pool.query('DELETE FROM donors WHERE id = ?', [Number(donorId)]);

      return deleteDonor;
   } catch (error) {
      throw error;
   }
};

export const DonorService = {
   getAllDonors,
   getSingleDonor,
   updateSingleDonor,
   deleteSingleDonor,
};
