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
	import PolySynth from "./lib/PolySynth.svelte";
  	import TestCommand from "./lib/TestCommand.svelte";
  import Oscilloscope from "./lib/Oscilloscope.svelte";
  import Mic from "./lib/Mic.svelte";
  	import MidiInput from "./lib/MidiInput.svelte";
  import TrackReader from "./lib/TrackReader.svelte";
  import SynthPlayer from "./lib/SynthPlayer.svelte";

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
		"PolySynth": PolySynth,
		"TestCommand": TestCommand,
		"Oscilloscope": Oscilloscope,
		"Mic": Mic,
		"MidiInput": MidiInput,
		"TrackReader": TrackReader,
		"SynthPlayer": SynthPlayer
	}
</script>

<main style="width: 100vw; height: 100vh;">
	<Graph config={config}/>
</main>

<style>

</style>