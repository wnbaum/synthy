<script lang="ts">
	import { Utils } from "nodestorm-svelte";

  	export const category: string = "Input";

	export let inputs: Utils.Anchor[] = [];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "number", val: 0 }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {

	}

	function changedInput(e: Event) {
		let n: number = Number((e.currentTarget as HTMLInputElement).value);
		Utils.set(outputs, "out", n);
		outputChanged("out");
	}
</script>

<main class="main">
	<input on:change={changedInput} value=0>
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