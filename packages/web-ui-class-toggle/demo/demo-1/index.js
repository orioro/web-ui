import {componentSystem, trigger} from '@orioro/web-ui-core'
import classToggle from '../../src'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		trigger(),
		classToggle(),
	])

	system.initialize()
})
