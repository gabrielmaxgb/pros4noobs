import GeneralConfiguration from '~/server/models/configurations';
import { defineEventHandler, setResponseStatus } from 'h3';

export default defineEventHandler(async (_event) => {
  try {
    const techsConfig = await GeneralConfiguration.findOne({
      key: 'technologies',
    });

    if (techsConfig) {
      setResponseStatus(_event, 201);
    }

    const techs = techsConfig?.value?.split(',').map((tech: string) => tech.trim()) || [];

    return {
      status: 201,
      message: 'Technologies listed successfully.',
      data: techs,
    };
  } catch (error: any) {
    setResponseStatus(_event, 500);
    return {
      status: 500,
      message: 'Internal server error.',
      error: error.message,
    };
  }
});
