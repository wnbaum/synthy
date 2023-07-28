<script lang="ts">
	import { Envelope, ToneAudioNode } from "tone"
	import { Utils } from "nodestorm-svelte";
	import { type EnvelopeCommand, TriggerType } from "./NodeUtils";

	export const category: string = "Envelope";

	let envelope: Envelope = new Envelope();

	export let inputs: Utils.Anchor[] = [{ id: "command", type: "EnvelopeCommand", val: undefined }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: envelope }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		switch ((val as EnvelopeCommand).trigger) {
			case TriggerType.Attack:
				envelope.triggerAttack();
				break;
			case TriggerType.Release:
				envelope.triggerRelease();
				break;
			case TriggerType.AttackRelease:
				envelope.triggerAttackRelease((val as EnvelopeCommand).sustain)
				break;
		}
	}
</script>

<main class="main">
	Envelope
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