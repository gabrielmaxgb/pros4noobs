import {
  Unauthorized,
  InternalServerError,
  OkWithoutData,
} from '~/server/utils/response';
import { verifyToken } from '~/server/auth/tokens';
import { getCookie, deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'token');
    if (!token) {
      return Unauthorized(event, 'No token provided.');
    }

    try {
      verifyToken(token);
    } catch (error) {
      return Unauthorized(event, 'Invalid token.');
    }

    deleteCookie(event, 'token');    

    return OkWithoutData(event, 'Logged out successfully.');
  } catch (error: any) {
    return InternalServerError(event, 'Internal server error.');
  }
});
