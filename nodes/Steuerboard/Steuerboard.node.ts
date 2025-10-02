import { type INodeType, type INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { adminUserDescription } from './resources/admin-users';
import { clientDescription } from './resources/client';
import { fileDescription } from './resources/file';
import { taskDescription } from './resources/task';
import { clientUserDescription } from './resources/users';
import { workspaceDescription } from './resources/workspace';
import { workspaceMemberDescription } from './resources/workspace-members';

export class Steuerboard implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Steuerboard',
		name: 'steuerboard',
		icon: {
			light: 'file:../../icons/steuerboard.svg',
			dark: 'file:../../icons/steuerboard.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Steuerboard API',
		defaults: {
			name: 'Steuerboard',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'steuerboardApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Admin User',
						value: 'adminUser',
					},
					{
						name: 'Client',
						value: 'client',
					},
					{
						name: 'File',
						value: 'file',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Workspace',
						value: 'workspace',
					},
					{
						name: 'Workspace Member',
						value: 'workspaceMember',
					},
				],
				default: 'client',
			},
			...adminUserDescription,
			...clientDescription,
			...clientUserDescription,
			...workspaceDescription,
			...workspaceMemberDescription,
			...fileDescription,
			...taskDescription,
		],
	};
}
