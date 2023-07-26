<script lang="ts">
	import { PolySynth } from "tone"
	import { Utils } from "nodestorm-svelte";
  	import Slider from "./Controls/Slider.svelte";
  	import type { EnvelopeCommand } from "./NodeUtils";

	export const category: string = "Audio";

	let synth: PolySynth = new PolySynth();

	export let inputs: Utils.Anchor[] = [{ id: "synth", type: "synth", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: synth }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		if (id === "synth") Utils.get(inputs, "synth").disconnect(synth)

		Utils.set(inputs, id, val);

		switch (id) {
			case "command":
				let command: EnvelopeCommand = (val as EnvelopeCommand);
				if (command.attack) {
					synth.triggerAttack(command.note);
				} else {
					synth.triggerRelease(command.note);
				}
			}
	}
</script>

<main class="main">
	PolySynth
	<Slider display={true} />
</main>

<style>
	.main {
		padding: 32px;
	}
</style>