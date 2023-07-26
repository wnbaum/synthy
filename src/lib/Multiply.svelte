<script lang="ts">
	import { Multiply } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Signal";

	let signal: Multiply = new Multiply(1);

	export let inputs: Utils.Anchor[] = [{ id: "in1", type: "audio", val: undefined }, { id: "in2", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: signal }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev = Utils.get(inputs, id);
		if (prev != undefined) prev.disconnect(id === "in1" ? signal : signal.factor);

		Utils.set(inputs, id, val);

		if (val != undefined) val.connect(id === "in1" ? signal : signal.factor);
	}
</script>

<main class="main">
	Multiply
</main>

<style>
	.main {
		padding: 28px;
	}
</style>