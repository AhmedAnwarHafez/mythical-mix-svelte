<script lang="ts">
	import { goto } from '$app/navigation'
	import type { Person } from '$lib/machine'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	type TeamHistory = {
		[date: string]: Person[][]
	}

	let history: TeamHistory = {}
	onMount(() => {
		const item = localStorage.getItem('history') || '{}'
		history = JSON.parse(item) as TeamHistory
	})
</script>

<section class="flex flex-col items-start container mx-auto" out:fade>
	<section class="flex items-center justify-center text-stone-100 p-10">
		<button on:click={() => goto('/')}>
			<i class="fa-solid fa-arrow-left text-3xl text-stone-100" />
		</button>
		<section class="flex flex-wrap justify-evenly gap-10">
			{#each Object.keys(history).sort((a, b) => a.localeCompare(b)) as date, week}
				{@const currentDate = date}
				{@const people = history[date]}
				<section class="flex flex-col items-center border border-stone-600 rounded-xl p-4">
					<div class=" p-2 text-center">
						<p>{currentDate}</p>
						<p>Week {week + 1}</p>
					</div>
					<ul class="flex justify-center gap-3">
						{#each history[date] as team, idx}
							<li class="p-2  flex flex-col items-center">
								<p class="text-center">Team {idx + 1}</p>
								{#each team as person}
									<li class="avatar mx-auto">
										{person.name}
									</li>
								{/each}
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</section>
	</section>
</section>
