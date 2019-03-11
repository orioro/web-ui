import { componentSystem, trigger } from '@orioro/web-ui-core'
import dialog from '../../src'

document.addEventListener('DOMContentLoaded', e => {
	const system = componentSystem('component', [
		trigger(),
		dialog(),
		{
			componentName: 'some-component',
			createInstance: () => {
				const activate = () => {
					console.log('some-component activate')
				}

				const deactivate = () => {
					console.log('some-component deactivate')
				}

				return {
					activate,
					deactivate,
					defaultAction: activate
				}
			}
		}
	])

	system.initialize()
})
