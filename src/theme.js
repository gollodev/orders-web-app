import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  colors: {
    dark: {
      100: '#1A202C',
      200: '#edf2f7',
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
})

export default theme
