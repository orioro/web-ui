import componentSystem from '../../src/system'
import dialog from '../../components/dialog'
import trigger from '../../components/trigger'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		dialog(),
		trigger()
	])

	system.initialize()
})
