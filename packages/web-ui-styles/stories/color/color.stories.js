import './color.scss'

export default {
  title: 'Color',
}

const Bg = colorName => `<div class="bg-${colorName}">bg-${colorName}</div>`
const Color = colorName => `<div class="color-${colorName}">color-${colorName}</div>`

export const BgColors = () => ([
  'red',
  'blue',
  'green',
  'yellow',
  'yellow-with-skyblue',
].map(Bg).join('\n'))

export const ColorColors = () => ([
  'red',
  'blue',
  'green',
  'yellow',
  'yellow-with-skyblue',
].map(Color).join('\n'))
