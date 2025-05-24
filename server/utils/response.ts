import { setResponseStatus } from 'h3';
import { ApiResponse } from '~/shared/apiResponse';

export const Ok = <T>(data: T, message = 'Request processed successfully.') =>
  makeResponse(200, message, data);

export const NoContent = (message = 'No content.') => makeResponseWithoutData(204, message);

export const Created = <T>(data: T, message = 'Resource created successfully.') =>
  makeResponse(201, message, data);

export const BadRequest = (message = 'Bad request.') => makeResponseWithoutData(400, message);

export const NotFound = (message = 'Resource not found.') => makeResponseWithoutData(404, message);

export const Unauthorized = (message = 'Unauthorized.') => makeResponseWithoutData(401, message);

export const InternalServerError = (message = 'Internal server error.') =>
  makeResponseWithoutData(500, message);

const makeResponse = <T>(statusCode: number, message: string, data: T): ApiResponse<T> => {
  setStatusCode(statusCode);

  return {
    data,
    status: statusCode,
    message,
  };
};

const makeResponseWithoutData = (statusCode: number, message: string): ApiResponse<any> => {
  setStatusCode(statusCode);

  return {
    data: {},
    status: statusCode,
    message,
  };
};

const setStatusCode = (statusCode: number) => {
  const event = useEvent();
  setResponseStatus(event, statusCode);
};
