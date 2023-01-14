<script lang="ts">
	import type { Person } from '$lib/machine'
	import { onMount } from 'svelte'

	type TeamHistory = {
		[date: string]: Person[][]
	}

	let history: TeamHistory = {}
	onMount(() => {
		const item = localStorage.getItem('history') || '{}'
		history = JSON.parse(item) as TeamHistory
	})
</script>

<section class="mx-auto flex items-center justify-center bg-stone-800 text-white p-10">
	<section class="flex flex-wrap gap-10">
		{#each Object.keys(history) as date, week}
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
