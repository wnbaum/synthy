<script lang="ts">
  import { onMount } from "svelte";

	let inputElement: HTMLInputElement;

	export let val: number = 0;
	export let defaultValue: number;

	export let min = 0;
	export let max = 10;
	export let step = 1;

	export let display: boolean = false;

	function input(e: Event) {
		val = parseFloat((e.target as HTMLInputElement).value)
	}

	onMount(() => {
		if (defaultValue) {
			inputElement.value = defaultValue;
			val = defaultValue;
		}
	});
</script>

<main>
	<input bind:this={inputElement} on:input={input} type="range" min={min} max={max} step={step}>
	{#if display}
		{val}
	{/if}
</main>

<style>

</style>