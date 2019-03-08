import {componentSystem, trigger} from '@orioro/web-ui-core'
import swiper from '../../src'

document.addEventListener('DOMContentLoaded', () => {
	const system = componentSystem('component', [
		swiper(),
		trigger()
	])

	system.initialize()
})
