import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../../server';
import { IDonation } from './donation.interface';

/* create donation */
const createDonation = async (payload: IDonation) => {
   try {
      const [donationCreation] = await pool.query('INSERT INTO donations SET ?', payload);
      const donationId = donationCreation
         ? (donationCreation as RowDataPacket).insertId
         : undefined;
      const createData = {
         id: donationId,
         ...payload,
      };
      return createData;
   } catch (error) {
      throw error;
   }
};

//get all donations
const getAllDonations = async () => {
   try {
      const [results] = await pool.query<RowDataPacket[]>('SELECT * FROM donations');
      const donations: IDonation[] | RowDataPacket[] = results.map((row: RowDataPacket) => row);

      for (let donation of donations) {
         donation.donor =
            donation.donor !== null &&
            (
               (
                  await pool.query('SELECT * FROM donors WHERE id = ?', [donation.donor])
               )[0] as RowDataPacket[]
            )[0];
      }

      return donations;
   } catch (error) {
      throw error;
   }
};

//update single donation
const updateSingleDonation = async (donationId: string, updateData: any) => {
   try {
      const [donation] = await pool.query('UPDATE donations SET ? WHERE id = ?', [
         updateData,
         Number(donationId),
      ]);
      return donation;
   } catch (error) {
      throw error;
   }
};

//delete single donation
const deleteSingleDonation = async (donationId: string) => {
   try {
      const [deleteDonation] = await pool.query('DELETE FROM donations WHERE id = ?', [
         Number(donationId),
      ]);
      return deleteDonation;
   } catch (error) {
      throw error;
   }
};

//get donations by donor
const getDonationsByDonor = async (donorId: string) => {
   try {
      const [result] = await pool.query<RowDataPacket[]>(
         'SELECT * FROM donations WHERE donor = ?',
         Number(donorId),
      );
      const donations: IDonation[] | RowDataPacket[] = result.map((row: RowDataPacket) => row);
      for (let donation of donations) {
         donation.donor =
            donation.donor !== null &&
            (
               (
                  await pool.query('SELECT * FROM donors WHERE id = ?', [donation.donor])
               )[0] as RowDataPacket[]
            )[0];
      }
      return donations;
   } catch (error) {
      throw error;
   }
};

export const DonationService = {
   createDonation,
   getAllDonations,
   updateSingleDonation,
   deleteSingleDonation,
   getDonationsByDonor,
};
