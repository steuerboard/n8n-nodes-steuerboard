export const STEUERBOARD_API_URL = 'http://localhost:5200';

export const RESOURCE = {
	CLIENT: 'client',
	WORKSPACE: 'workspace',
	TASK: 'task',
} as const;

export const OPERATION = {
	GET: 'get',
	LIST: 'list',
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
} as const;
