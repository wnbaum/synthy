<script lang="ts">
	import { FeedbackDelay, ToneAudioNode } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Effects";

	let feedback: FeedbackDelay = new FeedbackDelay(0);

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }, { id: "delay", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: feedback }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined) prev.disconnect(id === "delay" ? feedback.delayTime : feedback);

		Utils.set(inputs, id, val);

		if (val != undefined) (val as ToneAudioNode).connect(id === "delay" ? feedback.delayTime : feedback);
	}
</script>

<main class="main">
	FeedbackDelay
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