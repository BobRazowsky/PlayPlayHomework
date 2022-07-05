<template>
	<div id="Home">
		<PixiViewer />
		<CustomizationUI />
	</div>
</template>

<script>

import PixiViewer from './PixiViewer.vue'
import CustomizationUI from './CustomizationUI.vue'

export default {
	name: 'HomeView',
	components: {
		PixiViewer,
		CustomizationUI
	},
	data () {
		return {}
	},
	methods: {}
}
</script>

<style lang="less" scoped>
#Home {
	display: flex;
	gap: 10px;
	padding: 10px;
	height: 100vh;

	.separator {
		height: 100%;
		width: 1px;
		background-color: black;
	}
}
</style>
