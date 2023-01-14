<script>
	let people = Array.from({ length: 25 }, (_, i) => ({
		name: `Person`,
	}))
</script>

<section class="container mx-auto h-screen bg-stone-800 text-white">
	<section class=" grid grid-cols-3 ">
		<!-- People -->
		<section class="self-center">
			<ul class="mt-4 w-96 flex flex-wrap">
				{#each people as person}
					<li
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
		<section class="self-center place-self-center">
			<!-- big button in the center of the screeen -->
			<button
				class="bg-stone-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:text-xl hover:bg-stone-700"
			>
				<i class="fa-solid fa-shuffle" />
			</button>
		</section>
		<!-- Teams -->
		<section class="col-start-3 col-end-4 flex flex-wrap justify-end">
			{#each Array.from({ length: 5 }).map((_, i) => i) as team, idx}
				<section class="rounded-lg m-4 basis-1/3 border border-stone-600 p-4">
					<h1 class="text-2xl font-bold text-stone-300">Team {team + 1}</h1>
					<ul class="mt-4 flex">
						<!-- take five people -->
						{#each people.slice(0, 5) as person}
							<li
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
