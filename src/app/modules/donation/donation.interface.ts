import { IDonor } from '../donor/donor.interface';

export type IDonation = {
   donation_plan: string;
   amount: number;
   currency: string;
   paymentMethod: string;
   donor: number | IDonor; //donor id as foreign key
   createdAt: string;
   updatedAt?: string;
};
