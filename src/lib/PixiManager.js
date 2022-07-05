import * as PIXI from 'pixi.js'

import Store from '../store/store.js'

import BackgroundManager from './BackgroundManager'
import TextManager from './TextManager'
import TimelineManager from './TimelineManager'
import Utils from './Utils'

const PixiManager = function () {

	this.app = null
	this.container = null
	this.width = 512
	this.height = 512

	this.initializePixi = () => {
		this.app = new PIXI.Application({
			width: this.width,
			height: this.height,
			backgroundColor: Store.state.backgroundColor,
			antialias: true,
			resolution: window.devicePixelRatio
		})
		console.log('APP', this.app)
		this.container = this.app.stage
		document.querySelector('#pixi-container').appendChild(this.app.view)

		TimelineManager.createTimeline()
		BackgroundManager.createBackgroundSprinkles()
		TextManager.createText('Creative Developer at PlayPlay')
	}

	this.clearContainer = () => {
		for (const child in this.container.children) {
			this.container.removeChild(this.container.children[child])
		}
	}

	this.refresh = () => {
		TimelineManager.resetTimeStamp()
		TextManager.clearText()
		this.clearContainer()
		this.updateBackgroundColor()
		BackgroundManager.createBackgroundSprinkles()
		TextManager.createText(Store.state.text)
	}

	this.updateBackgroundColor = () => {
		this.app.renderer.backgroundColor = Utils.hexToBinary(Store.state.backgroundColor)
	}
}

export default new PixiManager()
