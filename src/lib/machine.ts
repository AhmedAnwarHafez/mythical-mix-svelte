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
						actions: ['deletePerson'],
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
						actions: ['unshuffle'],
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
				| { type: 'DELETE_PERSON'; payload: { id: number } }
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
			deletePerson: assign({
				people: (context, event) => {
					const people = context.people.filter((person) => person.id !== event.payload.id)
					localStorage.setItem('people', JSON.stringify(people))
					return people
				},
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
					return shuffle(context.people)
				},
			}),
			unshuffle: assign({
				people: (context) => {
					return context.people.map((person) => {
						return {
							...person,
							team: -1,
						}
					})
				},
			}),
			saveToLocalStorage: (context) => {
				const today = new Date().toISOString().split('T')[0]
				const history = JSON.parse(localStorage.getItem('history') || '[]')
				// extract the teams from the people
				// in this format [[person1, person2], [person3, person4]]
				const teams = context.people.reduce((acc, person) => {
					if (person.team === -1) {
						return acc
					}
					if (!acc[person.team]) {
						acc[person.team] = []
					}
					acc[person.team].push(person)
					return acc
				}, [] as Person[][])
				const newHistory = {
					...history,
					[today]: teams,
				}
				localStorage.setItem('history', JSON.stringify(newHistory))
			},
		},
	},
)
