import * as PIXI from 'pixi.js'
// import { PixelateFilter } from '@pixi/filter-pixelate';
// import { RadialBlurFilter } from '@pixi/filter-radial-blur';
// import { BlurFilter } from '@pixi/filter-blur';

import Store from '../store/store.js'

import PixiManager from './PixiManager'
import TimelineManager from './TimelineManager'
import Utils from './Utils'

const TextManager = function () {

	this.padding = 10
	this.fadeInDuration = 500 // 0.5 secondes
	this.lettersContainer = null

	this.createText = (message) => {
		this.lettersContainer = new PIXI.Container()
		const backgroundLetters = this.divideByLetters(message, Utils.hexToBinary(Store.state.textBackground))
		const letters = this.divideByLetters(message, Utils.hexToBinary(Store.state.textColor))
		const unitedLetters = []
		for (let l = 0; l < letters.length; l++) {
			unitedLetters.push({
				backgroundLetter: backgroundLetters[l],
				letter: letters[l]
			})
		}
		const shuffledLetters = this.shuffle(unitedLetters)
		for (let i = 0; i < shuffledLetters.length; i++) {
			this.animateLetter(shuffledLetters[i].backgroundLetter, i, 0, message.length, false)
			this.animateLetter(shuffledLetters[i].letter, i, 200, message.length, true)
		}
	}

	this.divideByLetters = (message, color) => {
		let letters = []
		let spaceWidth = 16
		this.style = new PIXI.TextStyle({
			fontFamily: Store.state.font,
			fontWeight: "bold",
			fontSize: 45,
			fill : color,
			letterSpacing: 0
		})
		let text = new PIXI.Text(message, this.style)
		text.updateText()
		PixiManager.container.addChild(this.lettersContainer)

		let lineLengthes = this.getTextLinesLengthes(message)
		const words = message.split(' ')

		let currentPos = 0
		let line = 0
		for (let i = 0; i < words.length; i++) {

			const wd = words[i]
			const wordSize = this.textSize(wd, this.style)
			console.log(wordSize, this.textSize(`${wd} `, this.style))
			if (currentPos + wordSize > PixiManager.width - this.padding * 2) {
				line ++
				currentPos = 245 - lineLengthes[line] / 2
				console.log(currentPos)
			} else if (i !== 0 && i < words.length) {
				currentPos += spaceWidth
			}

			for (let j = 0; j < words[i].length; j++) {
				let letter = new PIXI.Text(words[i][j], this.style);
				let bounds = letter.getLocalBounds()
				letter.x = currentPos
				letter.y = line * bounds.height

				currentPos += bounds.width

				this.lettersContainer.addChild(letter)
				letter.alpha = 0
				letters.push(letter)
			}
		}

		const containerBounds = this.lettersContainer.getLocalBounds()
		this.lettersContainer.pivot.set(containerBounds.width / 2, containerBounds.height / 2)
		this.lettersContainer.position.set(PixiManager.width / 2, PixiManager.height / 2)

		// let pixelate = new PixelateFilter(1)
		// this.lettersContainer.filters = [pixelate]

		return letters
	}

	this.shuffle = (letters) => {
		return letters.sort(() => Math.random() - 0.5)
	}

	/**
	* Shuffles letters array and creates animation on letters alpha property
	* @param    {Array} letters   Array of Pixi.Sprite
	*/
	this.animateLetter = (letter, index, offset, totalTextLength, animateY) => {
		// LETTERS APPARITION
		TimelineManager.timeline.add({
			targets: letter,
			alpha: 1,
			duration: 50,
		}, index * (this.fadeInDuration / totalTextLength) + offset)

		// LETTERS WAVING
		if (animateY) {

			let spreadY = 3;
			let spreadX = 0.8;

			TimelineManager.timeline.add({
				targets: letter,
				keyframes: [
					{ y: letter.y + spreadY },
					{ y: letter.y },
					{ y: letter.y - spreadY },
					{ y: letter.y },
					{ y: letter.y + spreadY },
					{ y: letter.y },
					{ y: letter.y - spreadY },
					{ y: letter.y },
					{ y: letter.y + spreadY },
					{ y: letter.y },
					{ y: letter.y - spreadY },
					{ y: letter.y }
				],
				duration: 4000,
				delay: index * 10,
				easing: 'steps(4)',
			}, 0)

			TimelineManager.timeline.add({
				targets: letter,
				keyframes: [
					{ x: letter.x + spreadX },
					{ x: letter.x },
					{ x: letter.x - spreadX },
					{ x: letter.x },
					{ x: letter.x + spreadX },
					{ x: letter.x },
					{ x: letter.x - spreadX },
					{ x: letter.x },
					{ x: letter.x + spreadX },
					{ x: letter.x },
					{ x: letter.x - spreadX },
					{ x: letter.x }
				],
				duration: 4000,
				delay: index * 10,
				easing: 'steps(4)',
			}, 0)
		}
	}

	this.textSize = (text, style) => {
		let size = 0
		for (let i = 0; i < text.length; i++) {
			let sample = new PIXI.Text(text[i], style);
			let bounds = sample.getLocalBounds()
			size += bounds.width
		}

		return size
	}

	this.getTextLinesLengthes = (message) => {
		let lineLength = []
		let letterBounds = []
		let lines = 0
		for (let i = 0; i < message.length; i++) {
			let sample = new PIXI.Text(message[i], this.style);
			let bounds = sample.getLocalBounds()
			if (i !== 0) {
				bounds.x += letterBounds[i - 1].bounds.x + letterBounds[i - 1].bounds.width
				if (bounds.x + bounds.width > PixiManager.width - this.padding * 2) {
					bounds.x = 0
					lines ++
					lineLength.push(letterBounds[i - 1].bounds.x + letterBounds[i - 1].bounds.width)
				}
			}

			letterBounds.push({
				bounds: bounds,
				line: lines
			})

			if (i === message.length - 1) {
				lineLength.push(bounds.x + bounds.width)
			}
		}

		return lineLength
	}

	this.clearText = () => {
		if (this.lettersContainer) {
			for (let i = 0; i < this.lettersContainer.children.length; i++) {
				this.lettersContainer.removeChild(this.lettersContainer.children[i])
			}
		}
	}
}

export default new TextManager()
