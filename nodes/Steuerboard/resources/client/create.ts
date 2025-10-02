import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientCreate = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.CLIENT],
};

export const clientCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the client',
		displayOptions: { show: showOnlyForClientCreate },
		routing: {
			request: {
				body: {
					name: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'legal_person',
		required: true,
		description: 'The type of the client',
		displayOptions: { show: showOnlyForClientCreate },
		options: [
			{
				name: 'Natural Person',
				value: 'natural_person',
				description: 'Individuals',
			},
			{
				name: 'Individual Enterprise',
				value: 'individual_enterprise',
				description: 'Sole proprietorships',
			},
			{
				name: 'Legal Person',
				value: 'legal_person',
				description: 'Companies like UG, GmbH, AG, Ltd., Inc., etc.',
			},
		],
		routing: {
			request: {
				body: {
					type: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Custom ID',
		name: 'customId',
		type: 'string',
		default: '',
		description: "The client's custom ID can be defined by the accountant",
		displayOptions: { show: showOnlyForClientCreate },
		routing: {
			request: {
				body: {
					customId: '={{ $value || undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'fixedCollection',
		default: {},
		description: 'The address of the client',
		displayOptions: { show: showOnlyForClientCreate },
		placeholder: 'Add Address',
		options: [
			{
				name: 'addressValues',
				displayName: 'Address',
				values: [
					{
						displayName: 'Address Line 1',
						name: 'line1',
						type: 'string',
						default: '',
						description: 'First line of the address',
					},
					{
						displayName: 'Address Line 2',
						name: 'line2',
						type: 'string',
						default: '',
						description: 'Second line of the address',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'City',
					},
					{
						displayName: 'Postal Code',
						name: 'postalCode',
						type: 'string',
						default: '',
						description: 'Postal code',
					},
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: 'DE',
						description: 'Two-letter country code (ISO 3166-1 alpha-2)',
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					address: '={{ $value.addressValues ? $value.addressValues : undefined }}',
				},
			},
		},
	},
];
