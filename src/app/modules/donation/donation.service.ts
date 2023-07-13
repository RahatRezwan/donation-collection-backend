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
      const [donations] = await pool.query('SELECT * FROM donations');
      return donations;
   } catch (error) {
      throw error;
   }
};

//get single donation
const getSingleDonation = async (donationId: string) => {
   try {
      const [donation] = await pool.query<RowDataPacket[]>(
         'SELECT * FROM donations WHERE id = ?',
         Number(donationId),
      );
      const donationsData: IDonation[] | RowDataPacket[] = donation.map(
         (row: RowDataPacket) => row,
      );
      return donationsData[0];
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
      const [donations] = await pool.query<RowDataPacket[]>(
         'SELECT * FROM donations WHERE donor = ?',
         Number(donorId),
      );
      const donationsData: IDonation[] | RowDataPacket[] = donations.map(
         (row: RowDataPacket) => row,
      );
      return donationsData;
   } catch (error) {
      throw error;
   }
};

export const DonationService = {
   createDonation,
   getAllDonations,
   getSingleDonation,
   updateSingleDonation,
   deleteSingleDonation,
   getDonationsByDonor,
};
