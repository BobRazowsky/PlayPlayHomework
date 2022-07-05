<template>
	<div id="PlayerControls">
		<div class="play btn" v-if="!$store.state.playing" @click="$emit('play')">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>
		</div>
		<div class="pause btn" v-else @click="$emit('pause')">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>
		</div>
		<div id="current-time" class="time">0:00</div>
		<input type="range" id="seek-slider" max="100" v-model="sliderValue" @input="$emit('seek', sliderValue)">
	</div>
</template>

<script>
export default {
	name: 'PlayerControls',
	emits: ['play', 'pause', 'seek'],
	data () {
		return {
			sliderValue: this.$store.state.elapsed
		}
	}
}
</script>

<style lang="less" scoped>
#PlayerControls {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	user-select: none;

	.time {
		font-size: 20px;
		width: 50px;
		display: flex;
		justify-content: center;
	}

	.btn {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;

		svg {
			height: 20px;
			fill: black;
		}
	}

	#seek-slider {
		width: 100%;
	}
}
</style>
