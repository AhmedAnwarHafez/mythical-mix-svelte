// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	'@@xstate/typegen': true
	internalEvents: {
		'xstate.init': { type: 'xstate.init' }
	}
	invokeSrcNameMap: {}
	missingImplementations: {
		actions: never
		delays: never
		guards: never
		services: never
	}
	eventsCausingActions: {
		addPerson: 'ADD_PERSON'
		shuffle: 'SHUFFLE'
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {}
	matchesStates: 'Editing' | 'History Displayed' | 'Saved' | 'Shuffled' | 'Unshuffled'
	tags: never
}
