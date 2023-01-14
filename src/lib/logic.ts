// shuffle the people into 5 teams
const shuffled = false
let people = [
	{
		id: 1,
		name: 'Bob',
		team: -1,
		toBeDeleted: false,
	},
]

// shuffle the people into 5 teams
export function shuffle<T>(people: T[], teams = 5): T[] {
	// shuffle the people
	const shuffledPeople = people.sort(() => Math.random() - 0.5)
	// assign each person to a team
	return shuffledPeople.map((person, index) => ({
		...person,
		team: index % teams,
	}))
}

function confirmDelete(id: number) {
	people = people.map((p) => {
		if (p.id === id) {
			p.toBeDeleted = true
		}
		return p
	})
}

// delete a person from the list
function deletePerson(id: number) {
	people = people.filter((p) => p.id !== id)
}

let editing = false
function showInput() {
	editing = !editing
}

// add a person to the list
function addPerson(e: KeyboardEvent) {
	const name = (e.target as HTMLInputElement).value
	const newPerson = {
		id: people.length + 1,
		name: name,
		team: -1,
		toBeDeleted: false,
	}
	people = [...people, newPerson]
	editing = false
}
