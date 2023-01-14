import { assign, createMachine } from 'xstate'
import { shuffle } from './logic'

export type Person = {
	toBeDeleted: boolean
	team: number
	id: number
	name: string
}

export const machine = createMachine(
	{
		id: 'mythical-mix',
		initial: 'Loading',
		states: {
			Loading: {
				invoke: {
					id: 'loadFromLocalStorage',
					src: 'loadFromLocalStorage',
					onDone: [
						{
							target: 'Unshuffled',
							actions: ['setPeople'],
						},
					],
					onError: [
						{
							target: 'Unshuffled',
						},
					],
				},
			},
			Unshuffled: {
				on: {
					SHUFFLE: {
						target: 'Shuffled',
						actions: ['shuffle'],
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
						actions: ['saveToLocalStorage'],
					},
					UNSHUFFLE: {
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
						actions: ['addPerson'],
					},
					CANCEL_EDIT: {
						target: 'Unshuffled',
					},
				},
			},
		},
		tsTypes: {} as import('./machine.typegen').Typegen0,
		schema: {
			services: {} as {
				loadFromLocalStorage: {
					data: Person[]
				}
			},
			events: {} as
				| { type: 'SHUFFLE' }
				| { type: 'SAVE' }
				| { type: 'UNSHUFFLE' }
				| { type: 'DELETE_PERSON' }
				| { type: 'PREVIEW_HISTORY' }
				| { type: 'EDIT' }
				| { type: 'CANCEL_EDIT' }
				| { type: 'ADD_PERSON'; payload: { name: string } }
				| { type: 'GO_TO_SAVED' }
				| { type: 'EXIT_HISTORY' },
		},
		context: {
			people: [] as Person[],
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
	},
	{
		actions: {
			setPeople: assign((_, event) => {
				console.log('setPeople', event)

				return {
					people: event.data,
				}
			}),
			addPerson: assign({
				people: (context, event) => {
					const newPerson = {
						id: context.people.length + 1,
						name: event.payload.name,
						team: -1,
						toBeDeleted: false,
					}

					const people = [...context.people, newPerson]
					localStorage.setItem('people', JSON.stringify(people))
					return people
				},
			}),
			shuffle: assign({
				people: (context) => {
					const shuffledPeople = shuffle(context.people)
					return shuffledPeople.map((person, index) => ({
						...person,
						team: index % 2,
					}))
				},
			}),
			saveToLocalStorage: (context) => {
				const today = new Date().toISOString().split('T')[0]
				const history = JSON.parse(localStorage.getItem('history') || '[]')
				const newHistory = [
					...history,
					{
						date: today,
						people: context.people,
					},
				]
				localStorage.setItem('history', JSON.stringify(newHistory))
			},
		},
	},
)
