import { createMachine } from 'xstate'

export default createMachine({
	id: 'mythical-mix',
	initial: 'Unshuffled',
	states: {
		Unshuffled: {
			on: {
				SHUFFLE: {
					target: 'Shuffled',
				},
				ADD_PERSON: {
					target: 'Unshuffled',
					internal: false,
				},
				DELETE_PERSON: {
					target: 'Unshuffled',
					internal: false,
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
	},
	schema: {
		// context: {} as {},
		events: {} as
			| { type: 'SHUFFLE' }
			| { type: 'SAVE' }
			| { type: 'UNSHUFLLE' }
			| { type: 'ADD_PERSON' }
			| { type: 'DELETE_PERSON' }
			| { type: 'PREVIEW_HISTORY' }
			| { type: 'EXIT_HISTORY' },
	},
	context: {},
	predictableActionArguments: true,
	preserveActionOrder: true,
})
