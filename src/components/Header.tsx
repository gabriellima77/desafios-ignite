import { Flex, Image, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export function Header() {
  return (
    <Flex align="center" justify="center" w="100%" py="6" px="48">
      <Link href="/" passHref>
        <ChakraLink as="a">
          <Image src="assets/Logo.png" alt="Logo" />
        </ChakraLink>
      </Link>
    </Flex>
  );
}
