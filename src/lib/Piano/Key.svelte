<script lang="ts">
	export let natural: boolean;
	export let width: number;
	export let offset: number;
	export let note: string;

	export let playNote: (note: string, played: boolean, justDown: boolean) => boolean;

	let playing: boolean = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main 
	on:mouseenter={() => { playing =  playNote(note, true,  false) }}
	on:mouseleave={() => { if (playing) playNote(note, false, false); playing = false;}}
	on:mousedown={() => { playing =  playNote(note, true,  true)  }}
	on:mouseup={() => { playing = !playNote(note, false, true)  }}
	class={"key " + (natural ? "natural" : "accidental")}
	style={`left: ${offset}px; width: ${width}px; height: ${(natural ? "100" : "60") + "px"}; ${playing ? "transform: translateY(4px);" : ""}`}
>

</main>

<style>
	.natural {
		background: white;
	}
	
	.accidental {
		background: black;
	}

	.key {
		position: absolute;
		border: 1px solid #ccc;
		transition: transform .1s ease-out;
		user-select: none;
		cursor: pointer;
	}

	.key:hover {
		transform: translateY(1px);
	}
</style>