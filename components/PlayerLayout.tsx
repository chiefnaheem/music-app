import React from 'react'
import { Box } from '@chakra-ui/layout'
import SideBar  from './SideBar'

const PlayerLayout = ({children}) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width="250px">
        <SideBar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh-100px)">{children}</Box>
      </Box>
      <Box position="absolute" bottom="0" left="0">
        Player
      </Box>
    </Box>
  )
}

export default PlayerLayout
