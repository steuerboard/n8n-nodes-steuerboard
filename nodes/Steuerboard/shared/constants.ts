export const RESOURCE = {
	CLIENT: 'client',
	WORKSPACE: 'workspace',
	WORKSPACE_MEMBER: 'workspaceMember',
	FILE: 'file',
	TASK: 'task',
} as const;

export const OPERATION = {
	GET: 'get',
	LIST: 'list',
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
} as const;
