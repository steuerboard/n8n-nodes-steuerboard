export const RESOURCE = {
	ADMIN_USER: 'adminUser',
	CLIENT: 'client',
	USER: 'user',
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
