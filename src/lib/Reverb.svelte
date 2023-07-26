<script lang="ts">
	import { Reverb, ToneAudioNode } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Effects";

	let reverb: Reverb = new Reverb();

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: reverb }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined && id === "in") prev.disconnect(reverb);

		Utils.set(inputs, id, val);

		if (val != undefined && id === "in") (val as ToneAudioNode).connect(reverb);
	}
</script>

<main class="main">
	Reverb
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