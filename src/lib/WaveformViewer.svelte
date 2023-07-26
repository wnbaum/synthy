<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { ToneAudioNode, Waveform } from "tone";

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

	let pos: number = 0;
	let scale: number = 1;
	function run() {
		let buffer: Float32Array;

		if (wave) buffer = wave.getValue();

		let prev: number;

		for (let i = 0; i < buffer.length; i++) {
			let v: number = buffer ? buffer[i] : 0;
			let scaled: number = map(v, -1, 1, 0, 256);

			v = Math.floor(256-scaled);

			if (prev) {
				context.fillStyle = "rgba(0,0,0,1)";
				context.fillRect(Math.floor(pos), 0, 1, canvas.height);
				context.fillStyle = "rgba(0,255,255,1)";
				context.fillRect(Math.floor(pos)+1, 0, 1, canvas.height);

				context.strokeStyle = "rgba(0,0,255,1)";
				context.beginPath();
				context.moveTo(Math.floor(pos), prev);
				context.lineTo(Math.floor(pos + 1/scale), v);
				context.stroke();

				pos += 1/scale;

				if (pos > 256) pos -= 256;
			}

			prev = v;
		}

		if (running) window.requestAnimationFrame(run);
	}
</script>

<main class="main">
	<canvas bind:this={canvas} width=256 height=256></canvas>
</main>

<style>
	.main {
		padding: 28px;
	}
</style>