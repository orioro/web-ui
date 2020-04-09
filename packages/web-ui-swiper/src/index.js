import {PropTypes} from '@orioro/web-ui-core'
import Swiper from 'swiper'
import SwiperCSS from 'swiper/css/swiper.min.css'
import insertCss from 'insert-css'

insertCss(SwiperCSS)

const COMPONENT_NAME = 'swiper'

const SWIPER_OPTION_DEFAULTS = {
  direction: 'horizontal',
  loop: true,
  lazy: true,
  autoplay: true,
}

const createInstance = (system, componentRoot, {
	options
}) => {
	options = options ? JSON.parse(options) : {}

	const swiperRoot = componentRoot.querySelector('.swiper-container') || componentRoot

	const swiperInstance = new Swiper(swiperRoot, {
		...SWIPER_OPTION_DEFAULTS,
		...options
	})

	const ELEMENTS = {
		slideIndicators: Array.from(componentRoot.querySelectorAll('[data-swiper-slide-indicator]'))
	}

	const slideTo = slideIndex => {
		swiperInstance.slideTo(slideIndex + 1)
	}

	const previousSlide = () => {
		swiperInstance.slidePrev()
	}

	const nextSlide = () => {
		swiperInstance.slideNext()
	}

	const updateSlideIndicators = () => {
		ELEMENTS.slideIndicators.forEach(indicator => {
			if (parseInt(indicator.getAttribute('data-swiper-slide-indicator')) === swiperInstance.realIndex) {
				indicator.classList.add('active')
			} else {
				indicator.classList.remove('active')
			}
		})
	}

	swiperInstance.on('slideChangeTransitionEnd', updateSlideIndicators)

	/**
	 * Initialize
	 */
	updateSlideIndicators()

	return {
		defaultAction: () => {},
		previousSlide,
		nextSlide,
		slideTo,
	}
}

export const swiper = () => {
	return {
		componentName: COMPONENT_NAME,
		instancePropTypes: {
			options: PropTypes.string,
		},
		createInstance,
	}
}
