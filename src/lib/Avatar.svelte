<script lang="ts">
	import type { Person } from './machine'

	export let person: Person
	export let mode: 'avatar' | 'delete' = 'avatar'
	export let handleDelete: (id: number) => void

	function changeMode() {
		mode = mode === 'avatar' ? 'delete' : 'avatar'
	}
</script>

{#if mode === 'delete'}
	<button class="avatar" on:click={() => handleDelete(person.id)}>
		<i class="fa-solid fa-trash" />
	</button>
{:else}
	<button class="avatar" on:click={changeMode}>
		<span>{person.name}</span>
	</button>
{/if}
