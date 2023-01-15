// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	'@@xstate/typegen': true
	internalEvents: {
		'done.invoke.loadFromLocalStorage': {
			type: 'done.invoke.loadFromLocalStorage'
			data: unknown
			__tip: 'See the XState TS docs to learn how to strongly type this.'
		}
		'error.platform.loadFromLocalStorage': {
			type: 'error.platform.loadFromLocalStorage'
			data: unknown
		}
		'xstate.init': { type: 'xstate.init' }
	}
	invokeSrcNameMap: {
		loadFromLocalStorage: 'done.invoke.loadFromLocalStorage'
	}
	missingImplementations: {
		actions: never
		delays: never
		guards: never
		services: 'loadFromLocalStorage'
	}
	eventsCausingActions: {
		addPerson: 'ADD_PERSON'
		deletePerson: 'DELETE_PERSON'
		saveToLocalStorage: 'SAVE'
		setPeople: 'done.invoke.loadFromLocalStorage'
		shuffle: 'SHUFFLE'
		unshuffle: 'UNSHUFFLE'
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {
		loadFromLocalStorage: 'xstate.init'
	}
	matchesStates: 'Editing' | 'History Displayed' | 'Loading' | 'Saved' | 'Shuffled' | 'Unshuffled'
	tags: never
}
