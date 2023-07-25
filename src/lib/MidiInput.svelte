<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { Midi } from '@tonejs/midi'

	export const category: string = "Midi";

	let midi: Midi;

	export let inputs: Utils.Anchor[] = [];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "midi", val: midi }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {

	}

	function newFile(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		if (files.length > 0) {
			parseFile(files[0]);
		}
	}

	function parseFile(file: File) {
		const reader: FileReader = new FileReader();
		reader.onload = (e) => {
			const loadedMidi = new Midi(e.target.result as ArrayBuffer);
			// JSON.stringify(midi, undefined, 2);
			midi = loadedMidi;
			Utils.set(outputs, "out", midi);
			outputChanged("out");
		};
		reader.readAsArrayBuffer(file);
	}
</script>

<main class="main">
	<input type="file" on:change={newFile}  accept=".mid,.midi">
</main>

<style>
	.main {
		padding: 28px;
	}
</style>