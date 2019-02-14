import { componentSystem, trigger } from '@orioro/web-ui-core'
import tabs from '../../src'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		trigger(),
		tabs()
	])

	system.initialize()
})
