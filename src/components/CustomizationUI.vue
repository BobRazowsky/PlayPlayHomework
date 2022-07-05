<template>
	<div id="CustomizationUI">
		<div class="wrapper">
			<label>TEXTE</label>
			<input type="text" name="message" v-model="$store.state.text" @change="textChanged">
			<FontSelect @fontChanged="fontChanged" />
			<ColorPicker :color="hexToBinary($store.state.textBackground)" label="Background" @colorChanged="backgroundTextColorChanged"/>
			<ColorPicker :color="hexToBinary($store.state.textColor)" label="Main" @colorChanged="textColorChanged"/>
		</div>
		<div class="separator"></div>
		<div class="wrapper">
			<label>BACKGROUND</label>
			<ColorPicker :color="hexToBinary($store.state.backgroundColor)" label="Background" @colorChanged="backgroundChanged"/>
			<ColorPicker :color="hexToBinary($store.state.backgroundDecorationsColor)" label="Decorations" @colorChanged="backgroundDecorationsChanged"/>
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
			console.log('REFRESHING')
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
	}

	.separator {
		width: 100%;
		height: 1px;
		background: black;
	}
}
</style>
