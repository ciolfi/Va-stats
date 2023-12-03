module.exports = {
	globDirectory: 'pages/',
	globPatterns: [
		'**/*.{jsx,js,pdf,xlsx,html}'
	],
	swDest: 'pages/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};