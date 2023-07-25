<script lang="ts">
	import { UserMedia } from "tone"
	import { Utils } from "nodestorm-svelte";
  	import Slider from "./Controls/Slider.svelte";
  	import type { EnvelopeCommand } from "./NodeUtils";

	export const category: string = "Audio";

	let mic: UserMedia = new UserMedia();
	mic.open();

	export let inputs: Utils.Anchor[] = [];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: mic }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		
	}
</script>

<main class="main">
	Mic
</main>

<style>
	.main {
		padding: 28px;
	}
</style>