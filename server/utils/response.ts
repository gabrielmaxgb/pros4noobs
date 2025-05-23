import { H3Event, EventHandlerRequest, setResponseStatus } from 'h3';
import { ApiResponse } from '~/shared/apiResponse';

export const OkWithoutData = (
  event: H3Event<EventHandlerRequest>,
  message = 'Request processed successfully.'
): ApiResponse<any> => {
  setResponseStatus(event, 200);
  return {
    data: {},
    status: 200,
    message,
  };
};

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

export const NotFound = (
  event: H3Event<EventHandlerRequest>,
  message = 'Resource not found.'
): ApiResponse<any> => {
  setResponseStatus(event, 404);
  return {
    data: {},
    status: 404,
    message,
  };
};

export const BadRequest = (
  event: H3Event<EventHandlerRequest>,
  message = 'Bad request.'
): ApiResponse<any> => {
  setResponseStatus(event, 400);
  return {
    data: {},
    status: 400,
    message,
  };
};

export const Unauthorized = (
  event: H3Event<EventHandlerRequest>,
  message = 'Unauthorized.'
): ApiResponse<any> => {
  setResponseStatus(event, 401);
  return {
    data: {},
    status: 401,
    message,
  };
};

export const InternalServerError = (
  event: H3Event<EventHandlerRequest>,
  message = 'Internal server error.'
): ApiResponse<any> => {
  setResponseStatus(event, 500);
  return {
    data: {},
    status: 500,
    message,
  };
};
