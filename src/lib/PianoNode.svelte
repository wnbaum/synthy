<script lang="ts">
	import { Utils } from "nodestorm-svelte";
  	import { Signal, Frequency } from "tone";
	import { TriggerType, type EnvelopeCommand } from "./NodeUtils";
	import Piano from "./Piano/Piano.svelte";

  	export const category: string = "Input";

	let signal: Signal = new Signal({
		value: 0,
	});

	export let inputs: Utils.Anchor[] = [];
	export const outputs: Utils.Anchor[] = [{ id: "frequency", type: "audio", val: signal }, { id: "command", type: "EnvelopeCommand", val: undefined }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {

	}

	function triggerNote(note: string, played: boolean) {
		signal.value = Frequency(note).toFrequency();
		Utils.set(outputs, "command", { trigger: played ? TriggerType.Attack : TriggerType.Release } as EnvelopeCommand)
		outputChanged("command");
	}

	let width: number;
</script>

<main class="main">
	<div style={`width: ${width}px; height: 100px; position: relative;`}>
		<Piano octaves={7} triggerNote={triggerNote} bind:width={width} />
	</div>
</main>

<style>
	.main {
		padding: 28px;
	}
</style>