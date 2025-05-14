import { defineNitroPlugin } from 'nitropack/runtime/plugin';
import runSeeds from './seed-all.js';

export default defineNitroPlugin(async (nitroApp) => {
    await runSeeds();
});