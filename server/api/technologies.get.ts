import { Ok } from '~/server/utils/response';
import { useConfigurationAsync } from '~/server/core/configuration/useConfiguration';
import { defineSafeHandler } from '../utils/handlers';

export default defineSafeHandler(async (_event) => {
  const techsConfig = await useConfigurationAsync('technologies');

  if (techsConfig) {
    const techs = techsConfig.split(',').map((tech: string) => tech.trim());
    return Ok(techs, 'Technologies listed successfully.');
  }

  return Ok([], 'No technologies found.');
});
