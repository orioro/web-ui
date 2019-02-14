const path = require('path')

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')

/**
 * Modules that are embedded
 * @type {Array}
 */
const EMBEDDED_MODULES = ['prop-types']

const EXTERNAL_MODULES = Object.keys(require('../package.json').dependencies || {}).filter(moduleName => {
	return !EMBEDDED_MODULES.includes(moduleName)
})

module.exports = {
	input: 'src/index.js',
	output: {
		file: 'index.js',
		dir: 'dist',
		format: 'cjs',
		exports: 'named',
	},
	external: EXTERNAL_MODULES,
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		resolve(),
		commonjs(),
		builtins(),
		globals(),
	]
}
