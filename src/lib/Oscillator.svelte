<script lang="ts">
	import { Oscillator, Signal, type ToneOscillatorType } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Audio";

	let osc: Oscillator = new Oscillator(440, "sine").start();

	export let inputs: Utils.Anchor[] = [{ id: "frequency", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: osc }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		let prev = Utils.get(inputs, id);
		if (prev != undefined) prev.disconnect();

		Utils.set(inputs, id, val);

		if (val != undefined) val.connect(osc.frequency);
	}

	function setType(e: Event) {
		let val: string = (e.target as HTMLInputElement).value;
		osc.type = (val as ToneOscillatorType);
	}
</script>

<main class="main">
	Oscillator
	<select placeholder="type" on:change={setType}>
		<option value="sine" selected>Sine</option>
		<option value="sawtooth">Sawtooth</option>
		<option value="triangle">Triangle</option>
		<option value="square">Square</option>
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