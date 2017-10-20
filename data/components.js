import loaders from './item-loaders.js'
import notifications from './item-notifications.js'
import overlays from './item-overlays.js'
import progressBars from './item-progress-bars.js'
import tables from './item-tables.js'
import tooltips from './item-tooltips.js'
import parallaxs from './item-parallaxs.js'
import icons from './item-icons.js'
import menus from './item-menus.js'
import carousels from './item-carousels.js'

export default {
  items: loaders['items']
          .concat(notifications['items'])
          .concat(overlays['items'])
          .concat(progressBars['items'])
          .concat(tables['items'])
          .concat(tooltips['items'])
          .concat(parallaxs['items'])
          .concat(icons['items'])
          .concat(menus['items'])
          .concat(carousels['items'])

}
