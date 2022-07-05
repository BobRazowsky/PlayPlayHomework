import Vuex from 'vuex'

const store = new Vuex.Store({
	state () {
		return {
			playing: false,
			elapsed: 0,
			text: 'Creative Developer at PlayPlay',
			font: 'Verdana',
			textColor: '0xffffff',
			textBackground: '0x3f9496',
			backgroundColor: '0x002761',
			backgroundDecorationsColor: '0x6dd8bc'
		}
	},
	mutations: {
		setPlaying (state, playStatus) {
			state.playing = playStatus
		},

		setElapsed (state, elapsed) {
			state.elapsed = elapsed
		}
	}
})

export default store