import { mergeQueryKeys, type inferQueryKeyStore } from '@lukemorales/query-key-factory';
import { user } from './user';

export const queries = mergeQueryKeys(user);

export type QueryKeys = inferQueryKeyStore<typeof queries>;
