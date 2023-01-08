import borders from './borders'
import breakpoints from './breakpoints'
import colors from './colors'
import radii from './radius'
import shadows from './shadows'
import sizes from './sizes'
import spacing from './spacing'
import transition from './transition'
import zIndices from './z-index'
import blur from './blur'
import { typography } from '@chakra-ui/react'

const foundations = {
  breakpoints,
  zIndices,
  radii,
  blur,
  colors,
  ...typography,
  sizes,
  shadows,
  space: spacing,
  borders,
  transition,
}

export default foundations
