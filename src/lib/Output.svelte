<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { ToneAudioNode } from "tone";

	export const category: string = "Audio";

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined) prev.disconnect();

		Utils.set(inputs, id, val);

		if (val != undefined) (val as ToneAudioNode).toDestination();
	}
</script>

<main class="main">
	Output
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