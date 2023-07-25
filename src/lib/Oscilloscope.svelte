<script lang="ts">
	import { Utils } from "nodestorm-svelte";
	import { ToneAudioNode, Waveform } from "tone";

	export const category: string = "Audio";

	export let inputs: Utils.Anchor[] = [{ id: "x", type: "audio", val: undefined }, { id: "y", type: "audio", val: undefined }];
	export const outputs: Utils.Anchor[] = [];

	export let outputChanged: (id: string) => void;

	export function inputChanged(id: string, val: any): void {
		if (!running) {
			running = true;
			run();
		}

		let prev: ToneAudioNode = Utils.get(inputs, id) as ToneAudioNode;
		if (prev != undefined) prev.disconnect(id === "x" ? waveX : waveY);

		Utils.set(inputs, id, val);

		if (val != undefined) (val as ToneAudioNode).connect(id === "x" ? waveX : waveY);

		if (Utils.get(inputs, "x") == undefined && Utils.get(inputs, "y") == undefined && running) {
			running = false;
		}
	}

	let canvas: HTMLCanvasElement;
	$: canvas, initCanvas() 
	let context: CanvasRenderingContext2D;

	let waveX: Waveform = new Waveform();
	let waveY: Waveform = new Waveform();

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

	function run() {
		let xBuffer: Float32Array;
		let yBuffer: Float32Array;

		if (waveX) xBuffer = waveX.getValue();
		if (waveY) yBuffer = waveY.getValue();

		let prevU: number;
		let prevV: number;

		for (let i = 0; i < xBuffer.length; i++) {
			let x: number = xBuffer ? xBuffer[i] : 0;
			let y: number = yBuffer ? yBuffer[i] : 0;

			let u: number = map(x, -1, 1, 0, 256);
			let v: number = map(y, -1, 1, 0, 256);
			u = Math.floor(u);
			v = Math.floor(v);

			if (prevU) {
				context.strokeStyle = "rgba(0,0,255,1)";
				context.beginPath();
				context.moveTo(prevU, prevV);
				context.lineTo(u, v);
				context.stroke();
			}

			prevU = u;
			prevV = v;
		}

		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(0, 0, canvas.width, canvas.height);

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