<script lang="ts">
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { useMachine } from '@xstate/svelte'
	import { machine, type Person } from '$lib/machine'

	const { state, send } = useMachine(machine, {
		services: {
			loadFromLocalStorage: async () => {
				const item = localStorage.getItem('people') || '[]'
				const people = JSON.parse(item) || ([] as Person[])
				return people
			},
		},
	})

	const [sendAnimation, receive] = crossfade({
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

	let shuffled = false

	function handleEdit(e: KeyboardEvent) {
		send('EDIT')
		if (e.key === 'Enter') {
			const target = e.target as HTMLInputElement
			send('ADD_PERSON', { payload: { name: target.value } })
		}
		if (e.key === 'Escape') {
			send('CANCEL_EDIT')
		}
	}
</script>

<pre class="text-white text-5xl">{$state.value}</pre>
<!-- <pre class="text-white text-2xl">{JSON.stringify($state.context)}</pre> -->
<section
	class="container mx-auto flex items-center justify-center h-screen bg-stone-800 text-white"
>
	<section class="grid grid-cols-3">
		<!-- People -->
		<section class="self-center">
			<ul class="mt-4 w-96 flex flex-wrap">
				{#each $state.context.people.filter((person) => person.team === -1) as person (person.id)}
					<li
						in:receive={{ key: person.id }}
						out:sendAnimation={{ key: person.id }}
						animate:flip
						class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center mr-4 mb-4"
					>
						{#if person.toBeDeleted}
							<button>
								<i class="fa-solid fa-trash" />
							</button>
						{:else}
							<button>
								<span>{person.name}</span>
							</button>
						{/if}
					</li>
				{/each}

				{#if $state.matches('Unshuffled')}
					<li
						class="w-20 h-20 flex items-center justify-center bg-stone-700 rounded-full text-center mr-4 mb-4"
					>
						<button on:click={() => send('EDIT')}>
							<i class="fa-solid fa-plus" />
						</button>
					</li>
				{/if}
				{#if $state.matches('Editing')}
					<li class="w-20 h-20 flex items-center justify-center   text-center mr-4 mb-4">
						<input
							type="text"
							class="bg-stone-900 text-3xl w-full text-stone-100"
							on:keydown={handleEdit}
							autofocus={true}
						/>
					</li>
				{/if}
			</ul>
		</section>

		<!-- Shuffle and Save -->
		<section class="self-center place-self-center flex flex-col items-center gap-6">
			<p class="text-stone-100 text-xl tracking-widest">Mythical Mix</p>

			<!-- big button in the center of the screeen -->
			{#if $state.matches('Unshuffled') || $state.matches('Shuffled')}
				<button
					class="bg-stone-600 text-stone-100 rounded-full w-32 h-32 text-4xl flex items-center justify-center hover:text-xl hover:bg-stone-500
				 hover:shadow-[0_0px_20px_1px_rgba(255,255,255,0.9)] hover:scale-110 transition-all duration-300"
					on:click={() => {
						shuffled ? send('UNSHUFFLE') : send('SHUFFLE')
						shuffled = !shuffled
					}}
				>
					<i class="fa-solid fa-shuffle" />
				</button>
			{/if}

			{#if $state.matches('Shuffled')}
				<button
					class="bg-stone-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:text-xl hover:bg-stone-700"
					on:click={() => send('SAVE')}
				>
					<i class="fa-solid fa-save" />
				</button>
			{/if}
		</section>

		<!-- Teams -->
		<section class="col-start-3 col-end-4 flex flex-wrap justify-start">
			{#each Array.from({ length: 5 }).map((_, i) => i) as team, idx}
				<section class="rounded-lg m-4 basis-1/3 border border-stone-600 p-4">
					<h1 class="text-lg font-bold text-stone-300">Team {team + 1}</h1>
					<ul class="mt-4 flex">
						<!-- take five people -->
						{#each $state.context.people.filter((person) => person.team === idx) as person (person.id)}
							<li
								in:receive={{ key: person.id }}
								out:sendAnimation={{ key: person.id }}
								animate:flip
								class="w-20 h-20 text-2xl flex items-center justify-center bg-stone-700 rounded-full text-center m-2"
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
