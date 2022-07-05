<template>
	<div id="FontSelect">
		<select @change="$emit('fontChanged', $event.target.value)" :value="font">
			<option v-for="font, idx in fontList" :key="idx">{{ font }}</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'FontSelect',
	emits: ['fontChanged'],
	data () {
		return {
			fontList: [
				'Verdana',
				'Helvetica',
				'Impact',
				'Tahoma',
				'Courier New'
			],
			font: this.$store.state.font
		}
	}
}
</script>

<style lang="less" scoped>
#FontSelect {

}
</style>
