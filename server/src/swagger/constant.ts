import * as packageJson from 'package.json';

const { name, description, version } = packageJson;
const getVersion = Math.floor(Number.parseInt(version, 10));

export const SWAGGER_API_ROOT = `api/v${getVersion}/docs`;
export const SWAGGER_API_NAME = name;
export const SWAGGER_API_DESCRIPTION = description;
export const SWAGGER_API_CURRENT_VERSION = version;
