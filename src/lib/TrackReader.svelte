<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { Midi } from "@tonejs/midi"
  	import type { Note } from "@tonejs/midi/dist/Note";

	export const category: string = "Midi";

	let midi: Midi;
	let tracks: string[] = [];

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "midi", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "notes", type: "noteSequence", val: undefined }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		Utils.set(inputs, id, val)

		if (id === "in" && val != undefined) {
			midi = (val as Midi);
			tracks = [];
		} 
	}

	function select(e: Event, name: string) {
		if ((e.target as HTMLInputElement).checked) {
			if (!(tracks.includes(name))) {
				tracks.push(name)
			}
		} else {
			if (tracks.includes(name)) {
				tracks = tracks.filter(x => x != name);
			}
		}
		
		let notes: Note[] = [];

		midi.tracks.forEach(track => {
			if (tracks.includes(track.name)) {
				notes = notes.concat(track.notes);
			}
		});

		Utils.set(outputs, "notes", notes);
		outputChanged("notes");
	}
</script>

<main class="main">
	{#if midi}
		Tracks:
		<br>
		{#each midi.tracks as track}
			<input type="checkbox" name={track.name} on:change={(e) => select(e, track.name)}>
			<label for={track.name}>{track.name}</label>
			<br>
		{/each}
	{/if}
</main>

<style>
	.main {
		padding: 28px;
		width: 120px;
	}
</style>