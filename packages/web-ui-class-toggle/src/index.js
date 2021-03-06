import {PropTypes} from '@orioro/web-ui-core'
import 'classlist.js'

const COMPONENT_NAME = 'class-toggle'

const createInstance = (system, componentRoot, {
	target = null,
	targetClass = 'active'
}) => {
	target = target
		? componentRoot.querySelector(target) || document.querySelector(target)
		: componentRoot

	const activate = () => {
		target.classList.add(targetClass)
	}

	const deactivate = () => {
		target.classList.remove(targetClass)
	}

	const toggle = () => {
		if (target.classList.contains(targetClass)) {
			deactivate()
		} else {
			activate()
		}
	}

	componentRoot.addEventListener('click', e => toggle())

	return {
		activate,
		deactivate,
		toggle,
		defaultAction: toggle
	}
}

export const classToggle = () => {
	return {
		componentName: COMPONENT_NAME,
		instancePropTypes: {
			target: PropTypes.string,
			targetClass: PropTypes.string
		},
		createInstance
	}
}
