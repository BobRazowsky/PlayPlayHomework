<template>
	<div id="CustomizationUI">
		<div class="wrapper">
			<!-- TEXT CUSTOMIZATION -->
			<label for="message">TEXTE</label>

			<input
				name="message"
				type="text"
				v-model="$store.state.text"
				@change="textChanged"
				@focus="$event.target.select()">

			<FontSelect @fontChanged="fontChanged" />

			<ColorPicker
				label="Background"
				:color="hexToBinary($store.state.textBackground)"
				@colorChanged="backgroundTextColorChanged"/>

			<ColorPicker
				label="Main"
				:color="hexToBinary($store.state.textColor)"
				@colorChanged="textColorChanged"/>
		</div>
		<div class="separator"></div>
		<div class="wrapper">
			<!-- BACKGROUND CUSTOMIZATION -->
			<label>BACKGROUND</label>

			<ColorPicker
				label="Background"
				:color="hexToBinary($store.state.backgroundColor)"
				@colorChanged="backgroundChanged"/>

			<ColorPicker
				label="Decorations"
				:color="hexToBinary($store.state.backgroundDecorationsColor)"
				@colorChanged="backgroundDecorationsChanged"/>
		</div>
	</div>
</template>

<script>
import PixiManager from '../lib/PixiManager'
import ColorPicker from './ColorPicker.vue'
import FontSelect from './FontSelect.vue'

export default {
	name: 'CustomizationUI',
	components: {
		ColorPicker,
		FontSelect
	},
	data () {
		return {}
	},
	methods: {
		refreshPreview () {
			PixiManager.refresh()
		},

		backgroundChanged (color) {
			this.$store.state.backgroundColor = this.hexToBinary(color)
			this.refreshPreview()
		},

		backgroundDecorationsChanged (color) {
			this.$store.state.backgroundDecorationsColor = this.hexToBinary(color)
			this.refreshPreview()
		},

		backgroundTextColorChanged (color) {
			this.$store.state.textBackground = this.hexToBinary(color)
			this.refreshPreview()
		},

		textColorChanged (color) {
			this.$store.state.textColor = this.hexToBinary(color)
			this.refreshPreview()
		},

		fontChanged (font) {
			this.$store.state.font = font
			this.refreshPreview()
		},

		textChanged () {
			this.refreshPreview()
		},

		hexToBinary (str) {
			return str.replace('0x', '#')
		}
	}
}
</script>

<style lang="less" scoped>
#CustomizationUI {

	display: flex;
	flex-direction: column;
	gap: 20px;

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px;

		label {
			font-size: 22px;
		}

		input {
			border-radius: 3px;
			outline: none;
			border: 1px solid black;
			height: 30px;
		}
	}

	.separator {
		width: 100%;
		height: 1px;
		background: black;
	}
}
</style>
