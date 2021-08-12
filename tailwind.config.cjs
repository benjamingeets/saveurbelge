const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			colors:{
				orange:"#E7A977",
				salmon:"#EBBE9B",
				brown:{
					light: "#B27B56",
					DEFAULT:"#502419"
				},
				green:{
					light:"#C7CB85",
					DEFAULT:"#7EA172"
				},
				grey:{
					light:"#F5F5F5",
					DEFAULT:"#D8D8D8",
					dark:"#686565"
				},
				red:"#FF2E00"
			},
			fontFamily: {
				'bebas': ['Bebas Neue']
			  }
		},
	},
	plugins: [],
};

module.exports = config;
