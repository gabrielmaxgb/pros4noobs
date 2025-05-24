import { useScope } from "../container";
import { ConfigurationCache } from "./configurationCache"

export const useConfigurationAsync = (key: string): Promise<string | null> => {
    const scope = useScope();
    const cache = scope.get(ConfigurationCache);
    return cache.get(key);
}


