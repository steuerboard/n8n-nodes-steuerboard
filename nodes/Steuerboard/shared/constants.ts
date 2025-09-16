export const STEUERBOARD_API_URL =
	process.env.STEUERBOARD_API_URL || 'https://api.steuerboard.com/v1';

export const RESOURCE = {
	CLIENT: 'client',
	WORKSPACE: 'workspace',
} as const;

export const OPERATION = {
	GET: 'get',
	LIST: 'list',
	CREATE: 'create',
	UPDATE: 'update',
} as const;
