import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#23232f' : '#E3EDF7',
      },
    }),
  },
});

export default theme;
