import { H3Event, EventHandlerRequest, setResponseStatus } from 'h3';
import { ApiResponse } from '~/shared/apiResponse';

export const Ok = <T>(
  event: H3Event<EventHandlerRequest>,
  data: T,
  message = 'Request processed successfully.'
): ApiResponse<T> => {
  setResponseStatus(event, 200);
  return {
    data,
    status: 200,
    message,
  };
};

export const Created = <T>(
  event: H3Event<EventHandlerRequest>,
  data: T,
  message = 'Resource created successfully.'
): ApiResponse<T> => {
  setResponseStatus(event, 201);
  return {
    data,
    status: 201,
    message,
  };
};

export const NotFound = <T>(
  event: H3Event<EventHandlerRequest>,
  message = 'Resource not found.'
): ApiResponse<T> => {
  setResponseStatus(event, 404);
  return {
    status: 404,
    message,
  };
};

export const BadRequest = <T>(
  event: H3Event<EventHandlerRequest>,
  message = 'Bad request.'
): ApiResponse<T> => {
  setResponseStatus(event, 400);
  return {
    status: 400,
    message,
  };
};

export const Unauthorized = <T>(
  event: H3Event<EventHandlerRequest>,
  message = 'Unauthorized.'
): ApiResponse<T> => {
  setResponseStatus(event, 401);
  return {
    status: 401,
    message,
  };
};

export const InternalServerError = <T>(
  event: H3Event<EventHandlerRequest>,
  message = 'Internal server error.'
): ApiResponse<T> => {
  setResponseStatus(event, 500);
  return {
    status: 500,
    message,
  };
};
