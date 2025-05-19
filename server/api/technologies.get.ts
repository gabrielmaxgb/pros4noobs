import GeneralConfiguration from '~/server/models/configurations';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (_event) => {
  try {
    const techsConfig = await GeneralConfiguration.findOne({
      key: 'technologies',
    });

    const techs = techsConfig?.value?.split(',').map((tech: string) => tech.trim()) || [];

    return {
      status: 201,
      message: 'Technologies listed successfully.',
      technologies: techs,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Internal server error.',
      error: error.message,
    };
  }
});
