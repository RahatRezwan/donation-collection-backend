import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../../server';
import { IDonationType } from './donationType.interface';

//create donationType
const createDonationType = async (payload: IDonationType) => {
   try {
      const [donationTypeCreation] = await pool.query('INSERT INTO donation_type SET ?', payload);
      const donationTypeId = donationTypeCreation
         ? (donationTypeCreation as RowDataPacket).insertId
         : undefined;
      const createData = {
         id: donationTypeId,
         ...payload,
      };
      return createData;
   } catch (error) {
      throw error;
   }
};

//get all donationTypes
const getAllDonationTypes = async () => {
   try {
      const [donationTypes] = await pool.query('SELECT * FROM donation_type');
      return donationTypes;
   } catch (error) {
      throw error;
   }
};

//get single donationType
const getSingleDonationType = async (donationTypeId: string) => {
   try {
      const [donationType] = await pool.query<RowDataPacket[]>(
         'SELECT * FROM donation_type WHERE id = ?',
         Number(donationTypeId),
      );
      const donationTypesData: IDonationType[] | RowDataPacket[] = donationType.map(
         (row: RowDataPacket) => row,
      );
      return donationTypesData[0];
   } catch (error) {
      throw error;
   }
};

//update single donationType
const updateSingleDonationType = async (donationTypeId: string, updateData: any) => {
   try {
      const [donationType] = await pool.query('UPDATE donation_type SET ? WHERE id = ?', [
         updateData,
         Number(donationTypeId),
      ]);
      return donationType;
   } catch (error) {
      throw error;
   }
};

//delete single donationType
const deleteSingleDonationType = async (donationTypeId: string) => {
   try {
      const [deleteDonationType] = await pool.query('DELETE FROM donation_type WHERE id = ?', [
         Number(donationTypeId),
      ]);
      return deleteDonationType;
   } catch (error) {
      throw error;
   }
};

export const DonationTypeService = {
   createDonationType,
   getAllDonationTypes,
   getSingleDonationType,
   updateSingleDonationType,
   deleteSingleDonationType,
};
