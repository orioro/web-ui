import {PropTypes} from '@orioro/web-ui-core'
import YTPlayer from 'yt-player'
import getVideoId from 'get-video-id'

const COMPONENT_NAME = 'yt-player'

const createInstance = (system, componentRoot, {
	video
}) => {
	const placeholderElement = document.createElement('div')
	componentRoot.appendChild(placeholderElement)

	const player = new YTPlayer(placeholderElement)
	const {id, service} = getVideoId(video)

	if (!id || service !== 'youtube') {
		console.warn(`Invalid video identifier '${video}'`)
		return
	}

	player.load(id)

	const play = () => {
		player.play()
	}

	const pause = () => {
		player.pause()
	}

	const stop = () => {
		player.stop()
	}

	const togglePlayPlause = () => {
		switch (player.getState()) {
			case 'playing':
				pause()
				return
			case 'cued':
			case 'ended':
			case 'paused':
			case 'unstarted':
				play()
				return
		}
	}

	return {
		play,
		pause,
		stop,
		togglePlayPlause,
		defaultAction: play
	}
}

export const ytPlayer = () => {
	return {
		componentName: COMPONENT_NAME,
		instancePropTypes: {
			video: PropTypes.string.isRequired,
		},
		createInstance
	}
}
