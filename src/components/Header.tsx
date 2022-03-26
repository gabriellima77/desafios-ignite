import { Flex, Image, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();

  const isHomePage = router.asPath === '/';

  return (
    <Flex
      align="center"
      justify="center"
      w="100%"
      py="6"
      px={['18', '20', '20', '24', '48']}
    >
      {!isHomePage ? (
        <Link href="/" passHref>
          <ChakraLink mr="auto" as="a">
            <Image src="assets/icons/back.svg" alt="Botão de voltar" />
          </ChakraLink>
        </Link>
      ) : null}
      <Flex justify="center" flex="1">
        <Link href="/" passHref>
          <ChakraLink as="a">
            <Image
              h={['20px', '28px', '28px', 'auto']}
              src="assets/Logo.png"
              alt="Logo"
            />
          </ChakraLink>
        </Link>
      </Flex>
    </Flex>
  );
}
