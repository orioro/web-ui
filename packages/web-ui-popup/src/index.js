import {PropTypes} from '@orioro/web-ui-core'
import createFocusTrap from 'focus-trap'
import 'classlist.js'

const COMPONENT_NAME = 'popup'

const createInstance = (system, componentRoot, {
	activeClass = 'active',
	noFocusTrap = false,
}) => {
	const state = {
		active: false
	}

	const focusTrap = !noFocusTrap ?
		createFocusTrap(componentRoot) : null

	const open = () => {
		if (!state.active) {
			componentRoot.classList.add(activeClass)

			if (focusTrap) {
				focusTrap.activate('[autofocus]')
			}

			state.active = true
		}
	}

	const close = () => {
		if (state.active) {
			componentRoot.classList.remove(activeClass)

			if (focusTrap) {
				focusTrap.deactivate()
			}

			state.active = false
		}
	}

	const toggle = () => {
		if (state.active) {
			close()
		} else {
			open()
		}
	}

	document.addEventListener('keyup', e => {
		if (state.active && e.keyCode === 27) {
			close()
		}
	})

	document.addEventListener('click', e => {
		if (state.active) {
			if (!componentRoot.contains(e.target)) {
				// If close was called immediately,
				// toggle triggers outside the pop-up
				// would re-open the popup immediately,
				// as they are outside the popup (thus closing them)
				// and then immediately toggling their state (to open)
				setTimeout(close, 0)
			}
		}
	}, true)

	return {
		state,
		open,
		close,
		toggle,
		defaultAction: toggle,
	}
}

export default () => {
	return {
		componentName: COMPONENT_NAME,
		instancePropTypes: {
			activeClass: PropTypes.string,
			noFocusTrap: PropTypes.bool,
		},
		createInstance
	}
}
