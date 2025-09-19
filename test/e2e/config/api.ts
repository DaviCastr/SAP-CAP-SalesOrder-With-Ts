import cds from '@sap/cds';

import { resolve } from 'path';

const rootDir = resolve(__dirname, '..', '..', '..');
const api = cds.test(rootDir);

api.axios.defaults.auth = { username: 'davi', password: '123456' };

export { api };
