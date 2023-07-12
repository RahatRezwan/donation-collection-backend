import { IAdmin } from '../admin/admin.interface';
import { IDonor } from '../donor/donor.interface';

export type IUser = {
   id: number;
   role: string;
   password?: string;
   donor?: number | IDonor;
   admin?: number | IAdmin;
};
