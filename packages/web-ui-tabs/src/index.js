import { PropTypes } from '@orioro/web-ui-core'

import {
	getElementsArray,
	attributeSelector
} from '@orioro/web-ui-util'

const TABS_COMPONENT_NAME = 'tabs'

const createInstance = (system, componentRoot, {
	tabSelector = '[data-tab]',
	tabContainerActiveClass = 'active',

	tabTriggerSelector = 'a[href^="#"],[data-trigger-component="tabs"]',
	tabTriggerActiveClass = 'active',
}) => {
	const tabContainers = getElementsArray(tabSelector, componentRoot)
	const tabTriggers = getElementsArray(tabTriggerSelector, componentRoot)

	const activateTab = (tabId) => {
		tabContainers.forEach(element => {
			element.classList.toggle(
				tabContainerActiveClass,
				element.getAttribute('id') === tabId
			)
		})

		const targetTabHash = `#${tabId}`

		tabTriggers.forEach(element => {
			element.classList.toggle(
				tabTriggerActiveClass,
				element.getAttribute('href') === targetTabHash ||
				element.getAttribute('data-trigger-target') === targetTabHash
			)
		})
	}

	// Activate the first tab by default
	activateTab(tabContainers[0].getAttribute('id'))

	return {
		defaultAction: (targetElement) => {
			activateTab(targetElement.getAttribute('id'))
		}
	}
}

export const tabs = () => {
	return {
		componentName: TABS_COMPONENT_NAME,
		instancePropTypes: {
			tabContainerActiveClass: PropTypes.string,
			tabTriggerActiveClass: PropTypes.string,
		},
		createInstance,
	}
}
