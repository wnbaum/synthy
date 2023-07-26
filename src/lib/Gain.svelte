<script lang="ts">
	import { Gain, ToneAudioNode } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Effects";

	let gain: Gain = new Gain(1);

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }, { id: "gain", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: gain }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined) prev.disconnect(id === "gain" ? gain.gain : gain);

		Utils.set(inputs, id, val);

		if (val != undefined) (val as ToneAudioNode).connect(id === "gain" ? gain.gain : gain);
	}
</script>

<main class="main">
	Gain
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