<script lang="ts">
	import { Signal } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Signal";

	let signal: Signal = new Signal(0);

	export let inputs: Utils.Anchor[] = [{ id: "in1", type: "audio", val: undefined }, { id: "in2", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: signal }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev = Utils.get(inputs, id);
		if (prev != undefined) prev.disconnect(signal);

		Utils.set(inputs, id, val);

		if (val != undefined) val.connect(signal);
	}
</script>

<main class="main">
	Add
</main>

<style>
	.main {
		padding: 28px;
	}
</style>