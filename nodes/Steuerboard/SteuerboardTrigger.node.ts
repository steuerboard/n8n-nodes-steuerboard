import {
	NodeConnectionType,
	type IDataObject,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

export class SteuerboardTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Steuerboard Trigger',
		name: 'steuerboardTrigger',
		icon: {
			light: 'file:../../icons/steuerboard.svg',
			dark: 'file:../../icons/steuerboard.svg',
		},
		group: ['trigger'],
		version: 1,
		description: 'Triggers on Steuerboard webhooks',
		defaults: {
			name: 'Steuerboard Webhooks',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '={{ "steuerboard/" + ($parameter.event === "clientChanges" ? "client-changes" : $parameter.event === "workspaceChanges" ? "workspace-changes" : $parameter.event === "fileChanges" ? "file-changes" : $parameter.event === "taskChanges" ? "task-changes" : $parameter.event === "fileCommentCreated" ? "file-comment-created" : "task-comment-created") }}',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Client Webhook',
						value: 'clientChanges',
						action: 'Client webhook',
						description: 'Triggers on Client changes webhook',
					},
					{
						name: 'File Comment Created',
						value: 'fileCommentCreated',
						action: 'File comment created',
						description: 'Triggers when a file comment is created',
					},
					{
						name: 'File Webhook',
						value: 'fileChanges',
						action: 'File webhook',
						description: 'Triggers on File changes webhook',
					},
					{
						name: 'Task Comment Created',
						value: 'taskCommentCreated',
						action: 'Task comment created',
						description: 'Triggers when a task comment is created',
					},
					{
						name: 'Task Webhook',
						value: 'taskChanges',
						action: 'Task webhook',
						description: 'Triggers on Task changes webhook',
					},
					{
						name: 'Workspace Webhook',
						value: 'workspaceChanges',
						action: 'Workspace webhook',
						description: 'Triggers on Workspace changes webhook',
					},
				],
				default: 'clientChanges',
			},
			{
				displayName: 'Client Actions',
				name: 'actionsClient',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['clientChanges'],
					},
				},
				options: [
					{ name: 'CREATED', value: 'CREATED' },
					{ name: 'UPDATED', value: 'UPDATED' },
					{ name: 'ARCHIVED', value: 'ARCHIVED' },
				],
				default: [],
				description: 'If set, only emit when action matches one of these (client)',
			},
			{
				displayName: 'Workspace Actions',
				name: 'actionsWorkspace',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['workspaceChanges'],
					},
				},
				options: [
					{ name: 'CREATED', value: 'CREATED' },
					{ name: 'UPDATED', value: 'UPDATED' },
					{ name: 'ARCHIVED', value: 'ARCHIVED' },
				],
				default: [],
				description: 'If set, only emit when action matches one of these (workspace)',
			},
			{
				displayName: 'File Actions',
				name: 'actionsFile',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['fileChanges'],
					},
				},
				options: [
					{ name: 'CREATED', value: 'CREATED' },
					{ name: 'UPDATED', value: 'UPDATED' },
					{ name: 'DELETED', value: 'DELETED' },
				],
				default: [],
				description: 'If set, only emit when action matches one of these (file)',
			},
			{
				displayName: 'Task Actions',
				name: 'actionsTask',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['taskChanges'],
					},
				},
				options: [
					{ name: 'CREATED', value: 'CREATED' },
					{ name: 'UPDATED', value: 'UPDATED' },
					{ name: 'DELETED', value: 'DELETED' },
				],
				default: [],
				description: 'If set, only emit when action matches one of these (task)',
			},
			{
				displayName: 'File Comment Actions',
				name: 'actionsFileComment',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['fileCommentCreated'],
					},
				},
				options: [{ name: 'CREATED', value: 'CREATED' }],
				default: [],
				description: 'If set, only emit when action matches one of these (file comment)',
			},
			{
				displayName: 'Task Comment Actions',
				name: 'actionsTaskComment',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['taskCommentCreated'],
					},
				},
				options: [{ name: 'CREATED', value: 'CREATED' }],
				default: [],
				description: 'If set, only emit when action matches one of these (task comment)',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const res = this.getResponseObject();

		const payload = (req as { body?: IDataObject }).body ?? {};
		const selectedEvent = this.getNodeParameter('event', 0) as string;
		const eventToResourceMap: Record<string, string> = {
			clientChanges: 'CLIENT',
			workspaceChanges: 'WORKSPACE',
			fileChanges: 'FILE',
			taskChanges: 'TASK',
			fileCommentCreated: 'FILE_COMMENT',
			taskCommentCreated: 'TASK_COMMENT',
		};
		const eventToActionsParamMap: Record<string, string> = {
			clientChanges: 'actionsClient',
			workspaceChanges: 'actionsWorkspace',
			fileChanges: 'actionsFile',
			taskChanges: 'actionsTask',
			fileCommentCreated: 'actionsFileComment',
			taskCommentCreated: 'actionsTaskComment',
		};

		const expectedResource = eventToResourceMap[selectedEvent];
		if (expectedResource && payload?.resource && payload.resource !== expectedResource) {
			res.status(200).json({ received: true, filtered: true });
			return {
				workflowData: [],
			};
		}

		const actionsParamName = eventToActionsParamMap[selectedEvent];
		const allowedActions =
			(actionsParamName ? (this.getNodeParameter(actionsParamName, 0) as string[]) : []) || [];

		// (Removed duplicated resource checks – generalized above)
		if (Array.isArray(allowedActions) && allowedActions.length > 0) {
			if (!allowedActions.includes(payload?.action as string)) {
				res.status(200).json({ received: true, filtered: true });
				return {
					workflowData: [],
				};
			}
		}

		const item: INodeExecutionData = {
			json: payload,
		};

		res.status(200).json({ received: true });

		return {
			workflowData: [[item]],
		};
	}
}
