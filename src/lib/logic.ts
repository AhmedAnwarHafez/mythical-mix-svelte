// shuffle the people into 5 teams
let shuffled = false
let people = [
	{
		id: 1,
		name: 'Bob',
		team: -1,
		toBeDeleted: false,
	},
]

export function shuffle() {
	if (shuffled) {
		people = people.map((person) => {
			person.team = -1
			return person
		})
		shuffled = !shuffled
		return
	}
	// reset the teams
	people = people.map((person) => {
		person.team = -1
		return person
	})

	// shuffle the people
	people = people.sort(() => Math.random() - 0.5)

	// assign the people to teams
	people = people.map((person, index) => {
		person.team = Math.floor(index / 5)
		return person
	})
	shuffled = !shuffled
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
