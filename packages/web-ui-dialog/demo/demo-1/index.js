import { componentSystem, trigger } from '@orioro/web-ui-core'
import dialog from '../../src'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		trigger(),
		dialog(),
	])

	system.initialize()
})