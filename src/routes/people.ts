export const data = [
	{
		id: 1,
		name: 'Bob',
	},
	{
		id: 2,
		name: 'Alice',
	},
	{
		id: 3,
		name: 'Dave',
	},
	{
		id: 4,
		name: 'Eve',
	},
	{
		id: 5,
		name: 'Frank',
	},
	{
		id: 6,
		name: 'Grace',
	},
	{
		id: 7,
		name: 'Heidi',
	},
	{
		id: 8,
		name: 'Ivan',
	},
	{
		id: 9,
		name: 'Judy',
	},
	{
		id: 10,
		name: 'Karl',
	},
	{
		id: 11,
		name: 'Linda',
	},
	{
		id: 12,
		name: 'Mike',
	},
	{
		id: 13,
		name: 'Nancy',
	},
	{
		id: 14,
		name: 'Oscar',
	},
	{
		id: 15,
		name: 'Peggy',
	},
	{
		id: 16,
		name: 'Quinn',
	},
	{
		id: 17,
		name: 'Robert',
	},
	{
		id: 18,
		name: 'Susan',
	},
	{
		id: 19,
		name: 'Tom',
	},
	{
		id: 20,
		name: 'Ursula',
	},
	{
		id: 21,
		name: 'Victor',
	},
	{
		id: 22,
		name: 'Wendy',
	},
	{
		id: 23,
		name: 'Xavier',
	},
	{
		id: 24,
		name: 'Yvonne',
	},
	{
		id: 25,
		name: 'Zach',
	},
].map((person) => ({ ...person, toBeDeleted: false, team: -1 }))

export const storeInLocalStorage = () => {
	localStorage.setItem('people', JSON.stringify(data))
}
