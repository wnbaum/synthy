<script lang="ts">
	import { Filter, ToneAudioNode } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Effects";

	let filter: Filter = new Filter();

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }, { id: "frequency", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: filter }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined) prev.disconnect(id === "frequency" ? filter.frequency : filter);

		Utils.set(inputs, id, val);

		if (val != undefined) (val as ToneAudioNode).connect(id === "frequency" ? filter.frequency : filter);
	}

	function setType(e: Event) {
		let val: string = (e.target as HTMLInputElement).value;
		filter.type = (val as BiquadFilterType);
	}
</script>

<main class="main">
	Filter
	<select placeholder="type" on:change={setType}>
		{#each ["allpass", "bandpass", "highpass", "highshelf", "lowpass", "lowshelf", "notch", "peaking"] as type}
			<option value={type}>{type}</option>
		{/each}
	</select>
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