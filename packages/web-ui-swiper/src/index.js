import {PropTypes} from '@orioro/web-ui-core'
import Swiper from 'swiper'
import SwiperCSS from 'swiper/dist/css/swiper.min.css'
import delegate from 'delegate'
import insertCss from 'insert-css'

insertCss(SwiperCSS)

const COMPONENT_NAME = 'swiper'

const createInstance = (system, componentRoot, {

}) => {
	const swiperInstance = new Swiper(componentRoot, {
    direction: 'horizontal',
    loop: true,
	})

	const ELEMENTS = {
		slideIndicators: Array.from(componentRoot.querySelectorAll('[data-swiper-slide-indicator]'))
	}

	const slideTo = slideIndex => {
		swiperInstance.slideTo(slideIndex)
	}

	const previousSlide = () => {
		swiperInstance.slidePrev()
	}

	const nextSlide = () => {
		swiperInstance.slideNext()
	}

	const updateSlideIndicators = () => {
		ELEMENTS.slideIndicators.forEach(indicator => {
			console.log(indicator)

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
		defaultAction: () => {
			console.log('defaultAction')
		},
		previousSlide,
		nextSlide,
		slideTo,
	}
}

export default () => {
	return {
		componentName: COMPONENT_NAME,
		createInstance,
	}
}
