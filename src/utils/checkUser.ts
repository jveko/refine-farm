// import {ICheckUser, IUser} from '@/interfaces';
// import axios, {AxiosError} from 'axios';
// import {axiosApp} from "@/axios";

// export const checkUser = async (): Promise<ICheckUser> => {
//   try {
//     const resp = await axiosApp.get<IUser>('user/check');
//     return {
//       status: 'authorized',
//       user: resp.data
//     };
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       if ((error as AxiosError).response?.status === 401) {
//         return {
//           status: 'unauthorized',
//           message: 'You are not authorized to access this app.'
//         };
//       }
//       return {
//         status: 'error',
//         message: (error as AxiosError).message
//       };
//     } else {
//       return {
//         status: 'error',
//         message: (error as { message: string }).message
//       };
//     }
//   }
// };
