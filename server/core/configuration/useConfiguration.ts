import { ConfigurationCache } from "./configurationCache"

export const useConfigurationAsync = (key: string): Promise<string | null> => {
    const cache = ConfigurationCache.getInstance();
    return cache.get(key);
}


