import {PropTypes} from '@orioro/web-ui-core'
import defaults from 'lodash.defaults'
import Swiper from 'swiper'
import SwiperCSS from 'swiper/dist/css/swiper.min.css'
import delegate from 'delegate'
import insertCss from 'insert-css'

insertCss(SwiperCSS)

const COMPONENT_NAME = 'swiper'

const SWIPER_OPTION_PROP_TYPES = {
	direction: PropTypes.string,
	speed: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	autoHeight: PropTypes.bool,
	roundLengths: PropTypes.bool,
	nested: PropTypes.bool,
	uniqueNavElements: PropTypes.bool,
	effect: PropTypes.string,
	spaceBetween: PropTypes.number,
	slidesPerView: PropTypes.number,
	grabCursor: PropTypes.bool,
	preloadImages: PropTypes.bool,
	updateOnImagesReady: PropTypes.bool,
	loop: PropTypes.bool,
	breakpoints: PropTypes.object,
	breakpointsInverse: PropTypes.bool,
	autoplay: PropTypes.object,

	// Lazy component
	lazy: PropTypes.bool,
}

const SWIPER_OPTION_DEFAULTS = {
	direction: 'horizontal',
}

const createInstance = (system, componentRoot, {
	...props
}) => {
	console.log(defaults({}, props, SWIPER_OPTION_DEFAULTS))
	const swiperInstance = new Swiper(componentRoot, defaults({}, props, SWIPER_OPTION_DEFAULTS))

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

export default () => {
	return {
		componentName: COMPONENT_NAME,
		instancePropTypes: {
			...SWIPER_OPTION_PROP_TYPES
		},
		createInstance,
	}
}
