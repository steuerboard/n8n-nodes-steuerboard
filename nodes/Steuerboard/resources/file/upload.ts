import FormData from 'form-data';
import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

interface AdditionalFields {
	labelIds?: string;
	name?: string;
	folderId?: string;
	taskId?: string;
}

const showOnlyForFileUpload = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.FILE],
};

export const fileUploadDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForFileUpload },
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace',
		displayOptions: { show: showOnlyForFileUpload },
		routing: { request: { body: { workspaceId: '={{ $value }}' } } },
	},
	{
		displayName: 'File',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary property to upload',
		displayOptions: { show: showOnlyForFileUpload },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		typeOptions: { multipleValueButtonText: 'Add Field' },
		displayOptions: { show: showOnlyForFileUpload },
		default: {},
		options: [
			{
				displayName: 'Label IDs (JSON)',
				name: 'labelIds',
				type: 'string',
				default: '',
				description: 'JSON array of label IDs, e.g. ["id1","id2"]',
				routing: { request: { body: { labelIds: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { request: { body: { name: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				routing: { request: { body: { folderId: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
				routing: { request: { body: { taskId: '={{ $value || undefined }}' } } },
			},
		],
	},
	{
		displayName: 'Upload',
		name: 'upload',
		type: 'hidden',
		default: '',
		displayOptions: { show: showOnlyForFileUpload },
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						// Convert to multipart/form-data with binary file
						const form = new FormData();
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', 0) as string;
						const workspaceId = this.getNodeParameter('workspaceId', 0) as string;
						const additionalFields =
							(this.getNodeParameter('additionalFields', 0, {}) as AdditionalFields) || {};
						const buffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName, 0);
						const binaryData = this.helpers.assertBinaryData(binaryPropertyName, 0);
						const fileName = binaryData.fileName || 'file';
						const mimeType = binaryData.mimeType || 'application/octet-stream';

						form.append('workspaceId', workspaceId);
						if (additionalFields.name) form.append('name', additionalFields.name);
						if (additionalFields.folderId) form.append('folderId', additionalFields.folderId);
						if (additionalFields.taskId) form.append('taskId', additionalFields.taskId);
						if (additionalFields.labelIds) form.append('labelIds', additionalFields.labelIds);
						form.append('file', buffer, { filename: fileName, contentType: mimeType });

						type ReqWithBody = { body?: unknown };
						(requestOptions as ReqWithBody).body = form;
						const formHeaders = form.getHeaders();
						requestOptions.headers = {
							...(requestOptions.headers || {}),
							'Content-Type': formHeaders['content-type'],
							'content-type': formHeaders['content-type'],
							'x-client-id': (this.getNodeParameter('clientId', 0) as string) || '',
						};
						requestOptions.json = false;
						return requestOptions;
					},
				],
			},
		},
	},
];
