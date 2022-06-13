import 'reset-css'
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import PlayerLayout from '../components/PlayerLayout';
// import {PlayerLayout}

const theme = extendTheme({
  colors: {
    grey: {
      100: '#fafafa',
      200: '#f5f5f5',
      300: '#eeeeee',
      400: '#e0e0e0',
      500: '#bdbdbd',
      600: '#9e9e9e',
      700: '#757575',
      800: '#616161',
      900: '#424242',
    }
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: 'none',
            boxShadow: 'none',
        }
      }
    }
  }
}
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </ChakraProvider>
  )
}

export default MyApp
