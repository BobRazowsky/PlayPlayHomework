<template>
	<div id="ColorPicker">
		<label>{{ label }}</label>
		<input type="color" :value="color" @change="$emit('colorChanged', $event.target.value)">	
	</div>
</template>

<script>
export default {
	name: 'ColorPicker',
	props: {
		label: {
			type: String,
			default: 'Color Picker'
		},
		color: {
			type: String,
			default: '#ffffff'
		}
	},
	emits: ['colorChanged'],
	data () {
		return {}
	}
}
</script>

<style lang="less" scoped>
#ColorPicker {
	display: flex;
	gap: 10px;

	label {
		width: 150px;
		font-size: 20px;
	}
}
</style>
