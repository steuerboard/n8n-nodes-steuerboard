import { type INodeType, type INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { clientDescription } from './resources/client';
import { fileDescription } from './resources/file';
import { workspaceDescription } from './resources/workspace';
import { STEUERBOARD_API_URL } from './shared/constants';

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
			baseURL: STEUERBOARD_API_URL,
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
						name: 'Client',
						value: 'client',
					},
					{
						name: 'Workspace',
						value: 'workspace',
					},
					{
						name: 'File',
						value: 'file',
					},
				],
				default: 'client',
			},
			...clientDescription,
			...workspaceDescription,
			...fileDescription,
		],
	};
}
