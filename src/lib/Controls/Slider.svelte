<script lang="ts">
	export let val: number = 0;

	export let min = 0;
	export let max = 10;
	export let step = 1;

	export let display: boolean = false;

	function input(e: Event) {
		val = parseFloat((e.target as HTMLInputElement).value)
	}
</script>

<main>
	<input on:input={input} type="range" min={min} max={max} step={step}>
	{#if display}
		{val}
	{/if}
</main>

<style>

</style>