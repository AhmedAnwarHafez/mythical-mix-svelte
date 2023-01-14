import { assign, createMachine } from 'xstate'
import { shuffle } from './logic'

export type Person = {
	toBeDeleted: boolean
	team: number
	id: number
	name: string
}

export const machine =
	/** @xstate-layout N4IgpgJg5mDOIC5QFsCeAXAFgSwMYEMAbAWmWwA8A6AVQDtZMBXAM2cMgGIBlACWoDF+AGQCiAbQAMAXUSgADgHtY2dNgW1ZIcogBMAdgmU9ADh0BWACw6AnMYBsx2xYA0IVLrM7KDq3rMBmAIsJYwkzAF9w1zQsPCJSChp6JlZ2CA4RABEASQAVSRkkEEVlVXVNbQR9QxNzK1sHJ1d3BAtrf287EPMunQBGCQtAyOiMHAISMio6BhY2TkyRUVyRAH0ABREAJS4AeQA5As0SlTUNIsqrSgkb27vbvubEKy89azNrPv9-MK+9CwiURAMXG8SmSVmqU46y2IgAatkRAB1VY8bJcXK7LYATSORROZXOoEq1SMpksNnsjmMLjciH8dj0lGMgUcBj8FjsHwsI2BYzik0SXBS83SXAAgnDxNJjkpTuULogPkyQoz7Hp-MZ2WYnlULEyBj9Av8vn0nLyQQKElRhXM0hxqPteAIhKI8fI5YSKvSdB0bNZrBI+vodPZNTq6VUJF5+sYzJ4HGY+n0PjoLfyJtbKFx8AA3aGwhHI1HozE493FT1nb0IYxmslx2yauz+YKPSM6fWUQ0SY0WU3moGWzPgnjYWDoBQAJ1QAAJMuO5IR8KhOCIABp5EsYrG4mX4qsK4mIONmbx9PRdTl9fWU3V1ygWON2T6BCTWF+OdOxEeJEQQU5aCgDhxUyTINm2PZDn3D1SmrRUEB+axKGsXwg0GTxbE7XULCGbt3gGGxvjrHQ015WgFAgOBNGHMEKFlOCjy0RBiDPAN2I4zj-F1ViUM4-iGm-UFBWmZI7UgBj5SJZiEAMShzE8CQX3Q-x9FpFp9WMeS7D6FtlVbGw7CEq1wVtKEIEkr0EP1FUuXfIYuXjKxdU7JlUwvUx-GsHQg3MYzfxtPMJIPRjpMqF9kMvZSulNexrBcrtUx8pTQifAxjH8uiqDHCdpznBdYCXFdgtgqSa0Iuxrj0ZM2kvNp3nijszEMd9SJuBxBi1EJMpEyh-0AqBLPg49Wj0WzmtQhl4wpHDjC0swHD8Gl3x0sjIiAA */
	createMachine(
		{
			id: 'mythical-mix',
			initial: 'Unshuffled',
			states: {
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
				events: {} as
					| { type: 'SHUFFLE' }
					| { type: 'SAVE' }
					| { type: 'UNSHUFFLE' }
					| { type: 'DELETE_PERSON' }
					| { type: 'PREVIEW_HISTORY' }
					| { type: 'EDIT' }
					| { type: 'CANCEL_EDIT' }
					| { type: 'ADD_PERSON'; payload: { name: string } }
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
				addPerson: assign({
					people: (context, event) => {
						const newPerson = {
							id: context.people.length + 1,
							name: event.payload.name,
							team: -1,
							toBeDeleted: false,
						}
						return [...context.people, newPerson]
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
			},
		},
	)
