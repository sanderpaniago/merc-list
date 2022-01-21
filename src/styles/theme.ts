import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#161719',
      '800': '#212325',
      '700': '#353646',
      '600': '#4b4d63',
      '500': '#555C6A',
      '400': '#797d9a',
      '300': '#9699b0',
      '200': '#B3b5c6',
      '100': '#d1d2dc',
      '50': '#FCFCFF'
    },
    green: {
      '500': '#7DC579'
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
})
