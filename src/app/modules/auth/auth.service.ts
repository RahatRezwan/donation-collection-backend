import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../../server';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
   const { email, password } = payload;

   try {
      //check if user exists
      const [userExist] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [
         email,
      ]);
      const existsUsers: ILoginUser[] | RowDataPacket[] = userExist.map(
         (row: RowDataPacket) => row,
      );
      if (existsUsers.length === 0) {
         throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found');
      }

      //check if password is correct
      const user = existsUsers[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
         throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect Password');
      }

      //generate access token
      const accessToken = jwtHelpers.createToken(
         { email: user.email, role: user.role },
         config.jwt.secret as Secret,
         config.jwt.access_expires_in as string,
      );

      //create refresh token
      const refreshToken = jwtHelpers.createToken(
         { email: user.email, role: user.role },
         config.jwt.refresh_secret as Secret,
         config.jwt.refresh_expires_in as string,
      );
      return { accessToken, refreshToken };
   } catch (error) {
      throw error;
   }
};

//refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
   //verify refresh token
   let verifiedToken = null;
   try {
      verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);
   } catch (err) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token !');
   }
   const { email, role } = verifiedToken;

   //check if user exists
   const [userExist] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [
      email,
   ]);
   const existsUsers: ILoginUser[] | RowDataPacket[] = userExist.map((row: RowDataPacket) => row);
   if (existsUsers.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
   }

   //generate access token
   const accessToken = jwtHelpers.createToken(
      { email: existsUsers[0].email, role: existsUsers[0].role },
      config.jwt.secret as Secret,
      config.jwt.access_expires_in as string,
   );

   return { accessToken };
};

export const AuthService = { loginUser, refreshToken };
