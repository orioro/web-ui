import { componentSystem, trigger } from '@orioro/web-ui-core'
import dialog from '../../src'

document.addEventListener('DOMContentLoaded', e => {
  const system = componentSystem('component', [
    trigger(),
    dialog(),
    {
      componentName: 'inner-form-control',
      createInstance: () => {
        const activate = () => {
          console.log('inner-form-control activate')
        }

        const deactivate = () => {
          console.log('inner-form-control deactivate')
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
