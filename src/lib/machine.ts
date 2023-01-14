import { createMachine } from 'xstate'

export const machine = createMachine({
	id: 'mythical-mix',
	initial: 'Unshuffled',
	states: {
		Unshuffled: {
			on: {
				SHUFFLE: {
					target: 'Shuffled',
				},
				EDIT: {
					target: 'Editing',
				},
				DELETE_PERSON: {
					target: 'Unshuffled',
				},
				PREVIEW_HISTORY: {
					target: 'History Displayed',
				},
			},
		},
		Shuffled: {
			on: {
				SAVE: {
					target: 'Saved',
				},
				UNSHUFLLE: {
					target: 'Unshuffled',
				},
			},
		},
		Saved: {
			on: {
				PREVIEW_HISTORY: {
					target: 'History Displayed',
				},
			},
		},
		'History Displayed': {
			on: {
				EXIT_HISTORY: {
					target: 'Unshuffled',
				},
			},
		},
		Editing: {
			on: {
				ADD_PERSON: {
					target: 'Unshuffled',
				},
			},
		},
	},
	schema: {
		events: {} as
			| { type: 'SHUFFLE' }
			| { type: 'SAVE' }
			| { type: 'UNSHUFLLE' }
			| { type: 'DELETE_PERSON' }
			| { type: 'PREVIEW_HISTORY' }
			| { type: 'EDIT' }
			| { type: 'ADD_PERSON' }
			| { type: 'EXIT_HISTORY' },
	},
	context: {},
	predictableActionArguments: true,
	preserveActionOrder: true,
})
