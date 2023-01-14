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
		const dates = Object.keys(history)

		const teams = dates.map((date) => history[date])
		console.log(teams)
	})
</script>

<section
	class="container mx-auto flex items-center justify-center h-screen bg-stone-800 text-white"
>
	<section class="grid grid-col-6">
		{#each Object.keys(history) as date, week}
			{@const currentDate = date}
			{@const people = history[date]}
			<section>
				<div class=" p-2">
					<p>{currentDate}</p>
					<p>Week {week + 1}</p>
				</div>
				{#each history[date] as team, idx}
					<div class="p-2">
						<p>Team {idx + 1}</p>
						<section class="flex flex-wrap">
							{#each team as person}
								<span>
									{person.name}
								</span>
							{/each}
						</section>
					</div>
				{/each}
			</section>
		{/each}
	</section>
</section>
