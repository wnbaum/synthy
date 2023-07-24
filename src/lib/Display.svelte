<script lang="ts">
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Basic";

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "any", val: undefined }];
	export const outputs: Utils.Anchor[] = [];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		Utils.set(inputs, id, val);
		display = val;
	}

	let display = undefined;
</script>

<main class="main">
	{display == undefined ? "" : display}
</main>

<style>
	.main {
		width: 20px;
		height: 20px;
		padding: 28px;
		text-align: center;
	}
</style>