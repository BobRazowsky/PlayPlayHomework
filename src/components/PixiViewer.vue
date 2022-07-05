<template>
	<div id="pixi-viewer">
		<div id="pixi-container"></div>
		<PlayerControls @play="play" @pause="pause" @seek="seek" />
	</div>
</template>

<script>
import PlayerControls from './PlayerControls.vue'
import PixiManager from '../lib/PixiManager'
import TimelineManager from '../lib/TimelineManager'

export default {
	name: 'PixiViewer',
	components: {
		PlayerControls
	},
	data () {
		return {}
	},
	mounted () {
		PixiManager.initializePixi()
	},
	methods: {
		play () {
			this.$store.state.playing = true
			TimelineManager.play()
		},

		pause () {
			this.$store.state.playing = false
			TimelineManager.pause()
		}, 

		seek (sliderValue) {
			TimelineManager.seek(sliderValue)
		}
	}
}
</script>

<style lang="less" scoped>
#pixi-viewer {
	.pixi-container {
		margin: 0;
	}
}
</style>
