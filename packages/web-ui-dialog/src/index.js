import {PropTypes} from '@orioro/web-ui-core'
import createFocusTrap from 'focus-trap'
import 'classlist.js'

const DIALOG_COMPONENT_NAME = 'dialog'

const createInstance = (system, componentRoot, {
	activeClass = 'active',
	navigatable = false,
	preventMovingToBody = false,
	interactionTarget = null,
	onOpenAction = null,
	onCloseAction = null,
} = {}) => {
	const state = {
		active: false
	}

	if (!preventMovingToBody) {
		componentRoot.remove()
		document.querySelector('body').appendChild(componentRoot)
	}

	interactionTarget = interactionTarget ? componentRoot.querySelector(interactionTarget) : null

	const focusTrap = createFocusTrap(componentRoot)

	const open = () => {
		if (!state.active) {
			system.getComponentInstances(DIALOG_COMPONENT_NAME).forEach(instance => {
				instance.close()
			})

			componentRoot.classList.add(activeClass)

			focusTrap.activate(interactionTarget ? interactionTarget : '[autofocus]')
			state.active = true

			if (interactionTarget && onOpenAction) {
				system.invoke(interactionTarget, null, onOpenAction)
			}
		}
	}

	const close = () => {
		if (state.active) {
			if (navigatable) {
				system.navHistoryReplaceState('#')
			}
			
			focusTrap.deactivate()
			componentRoot.classList.remove(activeClass)
			state.active = false

			if (interactionTarget && onCloseAction) {
				system.invoke(interactionTarget, null, onCloseAction)
			}
		}
	}

	const dismiss = () => {
		close()
	}

	componentRoot.addEventListener('click', e => {
		if (e.target === componentRoot) {
			dismiss()
		}
	})

	document.addEventListener('keyup', e => {
		if (state.active && e.keyCode === 27) {
			dismiss()
		}
	})

	return {
		state,
		open,
		close,
		dismiss,
		defaultAction: open,
	}
}

export default () => {
	return {
		componentName: DIALOG_COMPONENT_NAME,
		instancePropTypes: {
			activeClass: PropTypes.string,
			navigatable: PropTypes.bool,
			preventMovingToBody: PropTypes.bool,
			interactionTarget: PropTypes.string,
			onOpenAction: PropTypes.string,
			onCloseAction: PropTypes.string
		},
		createInstance,
	}
}
