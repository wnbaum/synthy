<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { ToneAudioNode, Waveform } from "tone";
  import Slider from "./Controls/Slider.svelte";

	export const category: string = "Audio";

	export let inputs: Utils.Anchor[] = [{ id: "in", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		if (!running) {
			running = true;
			run();
		}

		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined) prev.disconnect(wave);

		Utils.set(inputs, id, val);

		if (val != undefined) (val as ToneAudioNode).connect(wave);

		if (Utils.get(inputs, "in") == undefined && running) {
			running = false;
		}
	}

	let canvas: HTMLCanvasElement;
	$: canvas, initCanvas() 
	let context: CanvasRenderingContext2D;

	let wave: Waveform = new Waveform();

	let running: boolean = false;

	function initCanvas() {
		if (canvas) {
			context = canvas.getContext("2d")
			context.fillStyle = "rgba(0,0,0,1)";
			context.fillRect(0, 0, canvas.width, canvas.height);
		}
	}

	function map(v: number, a: number, b: number, c: number, d: number): number {
		return (v - a)*(d - c)/(b - a) + c;
	}

	let sliderVal = 10;

	let pos: number = 0;
	function run() {
		let buffer: Float32Array;

		if (wave) buffer = wave.getValue();

		let getV = (i) => {
			return Math.floor(256-map(buffer[i], -1, 1, 0, 256));
		}

		let prev = getV(0);
		let avg = 0;

		context.fillStyle = "rgba(0,0,0,1)";
		context.fillRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < buffer.length-1; i++) {
			context.beginPath();
			context.moveTo(i, prev);

			let v = getV(i);
			prev = v;

			context.strokeStyle = "rgba(0,0,255,1)";

			context.lineTo(i+1, v);
			context.stroke();

			if (pos > 256) pos -= 256;
		}

		if (running) setTimeout(run, sliderVal);
	}
</script>

<main class="main">
	<canvas bind:this={canvas} width=256 height=256></canvas>
	<div>
		Update frequency:
		<Slider min={10} step={1} max={100} defaultValue={100} bind:val={sliderVal}></Slider>
		{sliderVal}ms
	</div>
	
</main>

<style>
	.main {
		padding: 28px;
	}
</style>