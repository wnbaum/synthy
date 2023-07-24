<script lang="ts">
	import { FMOscillator, Signal } from "tone"
	import { Utils } from "nodestorm-svelte";

	export const category: string = "Audio";

	let osc: FMOscillator = new FMOscillator({
		frequency: 200,
		type: "sine",
		modulationType: "sine",
		harmonicity: 0.5,
		modulationIndex: 1,
	}).start();

	export let inputs: Utils.Anchor[] = [{ id: "frequency", type: "signal", val: undefined }, { id: "harmonicity", type: "number", val: 0.5 }, { id: "modulationIndex", type: "number", val: 1 }];
	export const outputs: Utils.Anchor[] = [{ id: "out", type: "audio", val: osc }];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		switch(id) {
			case "frequency":
				let prev: Signal = Utils.get(inputs, id) as Signal;
				if (prev != undefined) prev.disconnect();
				break;
		}

		Utils.set(inputs, id, val);

		if (val != undefined) {
			switch (id) {
				case "frequency":
					(val as Signal).connect(osc.frequency);
					break;
				case "harmonicity":
					osc.harmonicity.value = val;
					break;
				case "modulationIndex":
					osc.modulationIndex.value = val;
					break;
			}
		}
	}
</script>

<main class="main">
	FMOscillator
</main>

<style>
	.main {
		padding: 28px;
		width: 100px;
		height: 50px;
	}
</style>