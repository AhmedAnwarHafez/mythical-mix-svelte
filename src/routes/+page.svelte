<script>
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			}
		},
	})

	// a list of 25 people with random names
	let people = [
		{
			id: 1,
			name: 'Bob',
			team: -1,
		},
		{
			id: 2,
			name: 'Alice',
			team: -1,
		},
		{
			id: 3,
			name: 'Dave',
			team: -1,
		},
		{
			id: 4,
			name: 'Eve',
			team: -1,
		},
		{
			id: 5,
			name: 'Frank',
			team: -1,
		},
		{
			id: 6,
			name: 'Grace',
			team: -1,
		},
		{
			id: 7,
			name: 'Heidi',
			team: -1,
		},
		{
			id: 8,
			name: 'Ivan',
			team: -1,
		},
		{
			id: 9,
			name: 'Judy',
			team: -1,
		},
		{
			id: 10,
			name: 'Karl',
			team: -1,
		},
		{
			id: 11,
			name: 'Linda',
			team: -1,
		},
		{
			id: 12,
			name: 'Mike',
			team: -1,
		},
		{
			id: 13,
			name: 'Nancy',
			team: -1,
		},
		{
			id: 14,
			name: 'Oscar',
			team: -1,
		},
		{
			id: 15,
			name: 'Peggy',
			team: -1,
		},
		{
			id: 16,
			name: 'Quinn',
			team: -1,
		},
		{
			id: 17,
			name: 'Robert',
			team: -1,
		},
		{
			id: 18,
			name: 'Susan',
			team: -1,
		},
		{
			id: 19,
			name: 'Tom',
			team: -1,
		},
		{
			id: 20,
			name: 'Ursula',
			team: -1,
		},
		{
			id: 21,
			name: 'Victor',
			team: -1,
		},
		{
			id: 22,
			name: 'Wendy',
			team: -1,
		},
		{
			id: 23,
			name: 'Xavier',
			team: -1,
		},
		{
			id: 24,
			name: 'Yvonne',
			team: -1,
		},
		{
			id: 25,
			name: 'Zach',
			team: -1,
		},
	]

	// shuffle the people into 5 teams
	function shuffle() {
		// reset the teams
		people = people.map((person) => {
			person.team = 0
			return person
		})

		// shuffle the people
		people = people.sort(() => Math.random() - 0.5)

		// assign the people to teams
		people = people.map((person, index) => {
			person.team = Math.floor(index / 5)
			return person
		})
	}
</script>

<section
	class="container mx-auto flex items-center justify-center h-screen bg-stone-800 text-white"
>
	<section class="grid grid-cols-3">
		<!-- People -->
		<section class="self-center">
			<ul class="mt-4 w-96 flex flex-wrap">
				{#each people.filter((person) => person.team === -1) as person (person.id)}
					<li
						in:receive={{ key: person.id }}
						out:send={{ key: person.id }}
						class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center mr-4 mb-4"
					>
						<span>{person.name}</span>
					</li>
				{/each}
				<li
					class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center mr-4 mb-4"
				>
					<i class="fa-solid fa-plus" />
				</li>
				<input type="text" class="bg-stone-300 text-3xl w-full text-stone-900" />
			</ul>
		</section>
		<section class="self-center place-self-center flex flex-col gap-4">
			<!-- big button in the center of the screeen -->
			<button
				class="bg-stone-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:text-xl hover:bg-stone-700"
				on:click={shuffle}
			>
				<i class="fa-solid fa-shuffle" />
			</button>
			<button
				class="bg-stone-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:text-xl hover:bg-stone-700"
				on:click={shuffle}
			>
				<i class="fa-solid fa-save" />
			</button>
		</section>
		<!-- Teams -->
		<section class="col-start-3 col-end-4 flex flex-wrap justify-start">
			{#each Array.from({ length: 5 }).map((_, i) => i) as team, idx}
				<section class="rounded-lg m-4 basis-1/3 border border-stone-600 p-4">
					<h1 class="text-2xl font-bold text-stone-300">Team {team + 1}</h1>
					<ul class="mt-4 flex">
						<!-- take five people -->
						{#each people.filter((person) => person.team === idx) as person (person.id)}
							<li
								in:receive={{ key: person.id }}
								out:send={{ key: person.id }}
								class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center m-2"
							>
								<span>{person.name}</span>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</section>
	</section>
</section>
