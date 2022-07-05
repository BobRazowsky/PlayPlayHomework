const Utils = function () {

	this.hexToBinary = (hex) => {
		return hex.replace('#', '0x')
	}

}

export default new Utils()
