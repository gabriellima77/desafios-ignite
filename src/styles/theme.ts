import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    yellow: {
      500: '#FFBA08',
    },
    gray: {
      50: '#F5F8FA',
      200: '#DADADA',
      300: '#999999',
      500: '#47585B',
    },
  },
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.500',
      },
      span: {
        fontFamily: "'Barlow', sans-serif",
      },
    },
  },
});
