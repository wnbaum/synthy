<script lang="ts">
	import { Utils } from "nodestorm-svelte";
  	import { Signal } from "tone";

	export const category: string = "Input";

	export let inputs: Utils.Anchor[] = [];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "envelopeCommand", val: undefined }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {

	}

	let input: HTMLInputElement;

	function attack() {
		Utils.set(outputs, "out", { attack: true, note: input.value })
		outputChanged("out");
	}

	function release() {
		Utils.set(outputs, "out", { attack: false, note: input.value })
		outputChanged("out");
	}
</script>

<main class="main">
	<input bind:this={input}>
	<button on:mousedown={attack} on:mouseup={release}>Play</button>
</main>

<style>
	.main {
		padding: 28px;
	}

	input {
		width: calc(100% - 4px);
		padding: 0;
		margin: 0;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
		background: none;
		font-size: 18px;
		padding: 4px;
		color: inherit;
		margin: 10px;
		width: 100px;
	}
</style>