import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

type IconButtonProps = Omit<ComponentPropsWithoutRef<typeof IconButton>, 'aria-label'>;

const ThemeButton = ({ ...props }: IconButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      aria-label={'dark-mode-label'}
      {...props}
    />
  );
};

export default ThemeButton;
