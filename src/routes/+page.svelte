<script lang="ts">
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { data } from './people'

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 900),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 900,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			}
		},
	})

	let people = data

	let shuffled = false

	// shuffle the people into 5 teams
	function shuffle() {
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
						animate:flip
						class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center mr-4 mb-4"
					>
						{#if person.toBeDeleted}
							<button on:click={() => deletePerson(person.id)}>
								<i class="fa-solid fa-trash" />
							</button>
						{:else}
							<button on:click={() => confirmDelete(person.id)}>
								<span>{person.name}</span>
							</button>
						{/if}
					</li>
				{/each}
				{#if editing}
					<li class="w-20 h-20 flex items-center justify-center   text-center mr-4 mb-4">
						<input
							type="text"
							class="bg-stone-900 text-3xl w-full text-stone-90true0"
							on:keydown={(e) => e.key === 'Enter' && addPerson(e)}
						/>
					</li>
				{:else}
					<li
						class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center mr-4 mb-4"
					>
						<button on:click={showInput}>
							<i class="fa-solid fa-plus" />
						</button>
					</li>
				{/if}
			</ul>
		</section>
		<section class="self-center place-self-center flex flex-col items-center gap-4">
			<p class="text-stone-100 text-xl tracking-widest">Mythical Mix</p>
			<!-- big button in the center of the screeen -->
			<button
				class="bg-stone-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:text-xl hover:bg-stone-500
				 hover:shadow-[0_0px_20px_1px_rgba(255,255,255,0.9)] hover:scale-110 transition-all duration-300"
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
								animate:flip
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
