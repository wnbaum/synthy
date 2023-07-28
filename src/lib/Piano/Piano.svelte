<script lang="ts">
	import Key from "./Key.svelte";

	export let octaves: number = 5;
	export let triggerNote: (note: string, played: boolean) => void;
	export let width: number = octaves*164;

	interface Key {
		natural: boolean;
		width: number;
		offset: number;
		note: string;
	}

	let keys: Key[] = [];

	$: octaves, makeKeyArray()

	function makeKeyArray() {
		let naturalOffset: number = 0;
		let accidentalOffset: number = 0;

		let center: number = Math.ceil(octaves/2) - 1;

		for (let o = 0; o < octaves; o++) {
			let notes: string[] = ["c", "d", "e", "f", "g", "a", "b"];
			let octave: number = (o + 4 - center);

			let naturals: number[] = [23, 24, 23, 24, 23, 23, 24];
			for (let i = 0; i < naturals.length; i++) {
				keys.push({ natural: true, width: naturals[i], offset: naturalOffset, note: notes[i] + octave })
				naturalOffset += naturals[i];
			}

			let accidentals: number[] = [14, 14, 14, 14, 27, 14, 13, 14, 13, 14, 13];
			for (let i = 0; i < accidentals.length; i++) {
				if (i % 2 == 1) {
					let noteIndex: number = i < 5 ? (i-1)/2 : (i+1)/2;
					keys.push({ natural: false, width: accidentals[i], offset: accidentalOffset, note: notes[noteIndex] + "#" + octave })
				}

				accidentalOffset += accidentals[i]
			}
		}
	}

	function playNote(note: string, played: boolean, justDown: boolean): boolean {
		if (pressing || justDown) {
			triggerNote(note, played)
			return true;
		}
		return false;
	}

	let pressing: boolean = false;

	function mouseDown() { pressing = true }
	function mouseUp()   { pressing = false }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main on:mousedown={mouseDown} on:mouseup={mouseUp}>
	{#each keys as key}
		<Key natural={key.natural} width={key.width} offset={key.offset} note={key.note} playNote={playNote} />
	{/each}
</main>

<style>
</style>