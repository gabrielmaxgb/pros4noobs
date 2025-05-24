import {
  Unauthorized,
  OkWithoutData,
} from '~/server/utils/response';
import { getCookie, deleteCookie } from 'h3';
import { verifyToken } from '~/server/core/auth/tokens';

export default defineSafeHandler(async (event) => {
  const token = getCookie(event, 'token');
  if (!token) {
    return Unauthorized('No token provided.');
  }

  try {
    verifyToken(token);
  } catch (error) {
    return Unauthorized('Invalid token.');
  }

  deleteCookie(event, 'token');    

  return OkWithoutData('Logged out successfully.');
});
