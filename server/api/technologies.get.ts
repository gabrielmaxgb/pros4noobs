import { Ok, InternalServerError } from '~/server/utils/response';
import { defineEventHandler } from 'h3';
import { useConfigurationAsync } from '~/server/core/configuration/useConfiguration';

export default defineEventHandler(async (_event) => {
  try {
    const techsConfig = await useConfigurationAsync('technologies');

    if (techsConfig) {
      const techs = techsConfig.value.split(',').map((tech: string) => tech.trim());
      return Ok(_event, techs, 'Technologies listed successfully.');
    }

    return Ok(_event, [], 'No technologies found.');
  } catch (error: any) {
    return InternalServerError(_event, 'Internal server error.');
  }
});
