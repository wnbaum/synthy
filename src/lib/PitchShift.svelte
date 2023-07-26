<script lang="ts">
	import { PitchShift, ToneAudioNode, Signal } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Effects";

	let pitchShift: PitchShift = new PitchShift();

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }, { id: "shift", type: "number", val: 0 }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: pitchShift }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		if (id === "in") {
			let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
			if (prev != undefined) prev.disconnect(pitchShift);
		}

		Utils.set(inputs, id, val);

		if (val != undefined) {
			if (id === "in") (val as ToneAudioNode).connect(pitchShift);
			if (id === "shift") pitchShift.pitch = val;
		}

	}


</script>

<main class="main">
	PitchShift
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