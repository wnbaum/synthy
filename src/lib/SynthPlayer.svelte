<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { Midi } from "@tonejs/midi"
  	import type { Note } from "@tonejs/midi/dist/Note";
  	import { Gain, Synth, ToneAudioNode, now } from "tone";

	export const category: string = "Midi";

	let gain: Gain = new Gain(1);

	export let inputs: Utils.Anchor[] = [{ id: "synth", type: "audio", val: undefined }, { id: "notes", type: "noteSequence", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: gain }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		switch (id) {
			case "synth":
				let synth: ToneAudioNode = Utils.get(inputs, id);
				if (synth) synth.disconnect(gain);
				break;
		}

		Utils.set(inputs, id, val)
		
		if (val) {
			switch (id) {
				case "synth":
					(val as ToneAudioNode).connect(gain);
					break;
			}
		}
	}

	function play() {
		let notes: Note[] = Utils.get(inputs, "notes");
		let synth: Synth = Utils.get(inputs, "synth");
		if (notes && synth) {
			const time = now() + 0.5;

			notes.forEach(note => {
				synth.triggerAttackRelease(
					note.name,
					note.duration,
					note.time + time,
					note.velocity
				);
			})
		}
	}
</script>

<main class="main">
	<button on:click={play}>Play</button>
</main>

<style>
	.main {
		padding: 28px;
		width: 120px;
	}
</style>