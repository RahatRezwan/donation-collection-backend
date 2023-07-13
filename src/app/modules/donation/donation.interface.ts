import { IDonor } from '../donor/donor.interface';

export type IDonation = {
   // donationType: number | IDonationType; //donation type id as foreign key
   amount: number;
   currency: string;
   paymentMethod: string;
   donor: number | IDonor; //donor id as foreign key
   createdAt: string;
   updatedAt?: string;
};
