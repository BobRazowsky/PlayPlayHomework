import * as PIXI from 'pixi.js'

import Store from '../store/store.js'
import PixiManager from './PixiManager'
import TimelineManager from './TimelineManager'
import Utils from './Utils'

import BackgroundPositions from '../assets/background-positions.json'

const BackgroundManager = function () {

	this.backgroundSecondColor = 0x6dd8bc

	this.createBackgroundSprinkles = () => {
		// Creating background sprinkles at precise positions with precice rotations
		for (const pos in BackgroundPositions.positions) {
			const rect = this.createRect(18, 3) // width and height of a sprinkle
			rect.x = BackgroundPositions.positions[pos].x
			rect.y = BackgroundPositions.positions[pos].y
			rect.rotation = BackgroundPositions.positions[pos].rotation * (Math.PI / 180)
			PixiManager.container.addChild(rect);

			const startRotation = rect.rotation
			const nextRotation = rect.rotation + Math.PI / 14

			// Rotates the sprinkles back and forth 3 times
			for (let i = 1; i < 7; i++) {
				if (i % 2 !== 0) {
					TimelineManager.timeline.add({
						targets: rect,
						rotation: nextRotation,
						duration: 50
					}, i * 600)
				} else {
					TimelineManager.timeline.add({
						targets: rect,
						rotation: startRotation,
						duration: 50
					}, i * 600)
				}
			}
		}
	}

	/**
	* Creates a rectangle
	* @param    {Number} width
	* @param    {Number} height
	* @return   {PIXI.Graphics} rect
	*/
	this.createRect = (width, height) => {
		let rect = new PIXI.Graphics()
		rect.beginFill(Utils.hexToBinary(Store.state.backgroundDecorationsColor))
		rect.drawRect(0, 0, width, height)
		rect.pivot.x = rect.pivot.x + width / 2
		rect.pivot.y = rect.pivot.y + height / 2

		return rect
	}
}

export default new BackgroundManager()
