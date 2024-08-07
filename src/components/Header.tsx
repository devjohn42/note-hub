import { Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Heading
      fontSize={{ base: '4xl' }}
      fontWeight="bold"
      textAlign="center"
      textColor="#32a1b9"
      mt={2}
    >
      Tasks Hub
    </Heading>
  );
};

export default Header;
