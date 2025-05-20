import GeneralConfiguration from "./configurations";

// TODO(titosilva): cache cases when the configuration is not found
// TODO(titosilva): implement thread safety

export class ConfigurationCache {
    private static instance: ConfigurationCache;
    private cache: Map<string, [string, Date]>;
    private cacheDuration: number = 1000 * 60 * 5; // 5 minutes

    private constructor() {
        this.cache = new Map();
    }

    public static getInstance(): ConfigurationCache {
        if (!ConfigurationCache.instance) {
            ConfigurationCache.instance = new ConfigurationCache();
        }
        return ConfigurationCache.instance;
    }

    public async get(key: string): Promise<string | null> {
        const cachedValue = this.getCachedValue(key);

        if (cachedValue) {
            console.log(`Cache hit for key: ${key}`);
            return cachedValue;
        }

        return await this.fetchAndCacheConfiguration(key);
    }

    private getCachedValue(key: string): string | null {
        const cachedValue = this.cache.get(key);

        if (!cachedValue) {
            return null;
        }

        const [value, timestamp] = cachedValue;
        if (new Date().getTime() - timestamp.getTime() > this.cacheDuration) {
            this.cache.delete(key);
            return null;
        }

        return value;
    }

    private async fetchAndCacheConfiguration(key: string): Promise<string | null> {
        const config = await GeneralConfiguration.findOne({ key });

        if (config) {
            this.cache.set(key, [config.value, new Date()]);
            return config.value;
        }

        return null;
    }
}