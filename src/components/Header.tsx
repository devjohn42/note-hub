import { Heading } from '@chakra-ui/react';
import ThemeButton from './ThemeButton';

const Header = () => {
  return (
    <>
      <Heading
        fontSize={{ base: '4xl' }}
        fontWeight="bold"
        textAlign="center"
        textColor="#32a1b9"
        mt={2}
      >
        Tasks Hub
      </Heading>
      <ThemeButton position={'absolute'} top={0} right={2} />
    </>
  );
};

export default Header;
