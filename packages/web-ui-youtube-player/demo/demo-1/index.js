import { componentSystem, trigger } from '@orioro/web-ui-core'
import ytPlayer from '../../src'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		trigger(),
		ytPlayer(),
	])

	system.initialize()
})
