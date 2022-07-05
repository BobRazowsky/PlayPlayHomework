import anime from 'animejs/lib/anime.es.js'
import Store from '../store/store'

const TimelineManager = function () {
	this.animationDuration = 4000
	this.timeline = null

	this.createTimeline = () => {
		this.timeline = anime.timeline({
			easing: 'linear',
			loop: false,
			autoplay: false,
			update: (anim) => {
				document.querySelector('#seek-slider').value = anim.progress
				Store.commit('setElapsed', anim.progress)
				this.updateTimestamp()
			},
			complete: () => {
				Store.commit('setPlaying', false)
				this.resetTimeStamp()
			}
		})
		console.log(this.timeline)
	}

	this.play = () => {
		this.timeline.play()
	}

	this.pause = () => {
		this.timeline.pause()
		this.timeline.seek(this.timeline.currentTime)
	}

	this.seek = (head) => {
		this.timeline.seek((head * this.timeline.duration) / 100);
	}

	this.updateTimestamp = () => {
		const timestamp = document.querySelector('#current-time')
		const min = this.timeline.currentTime % 60000 - this.timeline.currentTime
		let sec = Math.trunc(this.timeline.currentTime / 1000)
		sec = sec < 10 ? `0${sec}`: sec
		const time = `${min}:${sec}`
		timestamp.innerHTML = time
	}

	this.resetTimeStamp = () => {
		const timestamp = document.querySelector('#current-time')
		timestamp.innerHTML = '0:00'
		this.timeline.seek(0)
	}
}

export default new TimelineManager()
