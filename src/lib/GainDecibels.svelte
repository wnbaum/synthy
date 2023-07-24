<script lang="ts">
	import { Gain, ToneAudioNode } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Effects";

	let gain: Gain = new Gain(0);

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }, { id: "gain", type: "number", val: 0 }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: gain }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		switch (id) {
			case "in":
				let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
				if (prev != undefined) prev.disconnect();
				break;
		}

		Utils.set(inputs, id, val);

		if (val != undefined) {
			switch (id) {
				case "gain":
					gain.gain.value = val;
					break;
				case "in":
					(val as ToneAudioNode).connect(gain);
					break;
			}
		}
	}
</script>

<main class="main">
	Gain dB
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