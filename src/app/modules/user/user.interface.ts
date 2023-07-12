import { IDonor } from '../donor/donor.interface';

export type IUser = {
   id: number;
   role: string;
   password: string;
   donorId?: IDonor['id'];
   adminId?: number;
};
