<script lang="ts">
	import { Graph, GraphConfig } from "nodestorm-svelte";

	// node imports
	import Display from "./lib/Display.svelte";
	import Output from "./lib/Output.svelte";
	import Oscillator from "./lib/Oscillator.svelte";
	import InputSignal from "./lib/InputSignal.svelte";
	import FMOscillator from "./lib/FMOscillator.svelte";
	import Gain from "./lib/Gain.svelte";
	import PolySynth from "./lib/PolySynth.svelte";
  	import TestCommand from "./lib/TestCommand.svelte";
  import Oscilloscope from "./lib/Oscilloscope.svelte";
  import Mic from "./lib/Mic.svelte";
  	import MidiInput from "./lib/MidiInput.svelte";
  import TrackReader from "./lib/TrackReader.svelte";
  import SynthPlayer from "./lib/SynthPlayer.svelte";
  import Add from "./lib/Add.svelte";
  import WaveformViewer from "./lib/WaveformViewer.svelte";
  import Multiply from "./lib/Multiply.svelte";
  import InputNumber from "./lib/InputNumber.svelte";
  import PitchShift from "./lib/PitchShift.svelte";
  import Reverb from "./lib/Reverb.svelte";

	let config: GraphConfig = new GraphConfig();
	config.width = "100%";
	config.height = "100%";
	config.anchorColor = (type: string) => {
		let hash = 0;
		type.split("").forEach(char => {
			hash = char.charCodeAt(0) + ((hash << 5) - hash)
		})
		let colour = "#"
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xff
			colour += value.toString(16).padStart(2, "0")
		}
		return colour
	};
	config.nodeTypes = {
		"Display": Display,
		"InputSignal": InputSignal,
		"InputNumber": InputNumber,
		"Output": Output,
		"Oscillator": Oscillator,
		"FMOscillator": FMOscillator,
		"Gain": Gain,
		"PitchShift": PitchShift,
		"PolySynth": PolySynth,
		"TestCommand": TestCommand,
		"Oscilloscope": Oscilloscope,
		"WaveformViewer": WaveformViewer,
		"Mic": Mic,
		"MidiInput": MidiInput,
		"TrackReader": TrackReader,
		"SynthPlayer": SynthPlayer,
		"Add": Add,
		"Multiply": Multiply,
		"Reverb": Reverb,
	}
</script>

<main style="width: 100vw; height: 100vh;">
	<Graph config={config}/>
</main>

<style>

</style>