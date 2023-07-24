<script lang="ts">
	import { Graph, GraphConfig } from "nodestorm-svelte";

	// node imports
	import Display from "./lib/Display.svelte";
  	import InputHertz from "./lib/InputHertz.svelte";
	import Output from "./lib/Output.svelte";
	import Oscillator from "./lib/Oscillator.svelte";
	import InputNumber from "./lib/InputNumber.svelte";
	import FMOscillator from "./lib/FMOscillator.svelte";
  import GainDecibels from "./lib/GainDecibels.svelte";

	let config: GraphConfig = new GraphConfig();
	config.width = "100%";
	config.height = "100%";
	config.nodeTypes = {
		"Display": Display,
		"InputHertz": InputHertz,
		"InputNumber": InputNumber,
		"Output": Output,
		"Oscillator": Oscillator,
		"FMOscillator": FMOscillator,
		"GainDecibels": GainDecibels,
	}
</script>

<main style="width: 100vw; height: 100vh;">
	<Graph config={config}/>
</main>

<style>

</style>