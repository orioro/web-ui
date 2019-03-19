import {componentSystem, trigger} from '@orioro/web-ui-core'
import popup from '../../src'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		trigger(),
		popup()
	])

	system.initialize()
})
