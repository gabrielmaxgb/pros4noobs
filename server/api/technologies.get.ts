import { defineEventHandler } from 'h3';
import { useConfigurationAsync } from '~/server/core/configuration/useConfiguration';

export default defineEventHandler(async (_event) => {
  try {
    const techsConfig = await useConfigurationAsync('technologies');

    const techs = techsConfig?.split(',').map((tech: string) => tech.trim()) || [];

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
