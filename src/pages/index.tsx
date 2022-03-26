import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { TravelType } from '../components/TravelType';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>worldtrip | Home</title>
      </Head>
      <Header />
      <Box as="main">
        <Flex as="section" w="100%" bgImage="url(assets/Background.png)">
          <Box
            color="gray.50"
            py="16"
            px={['18', '24','36']}
            w={['100%', '100%', '100%', '100%', '58%']}
          >
            <Heading fontSize={['18', '24', '36']}>
              5 Continentes,
              <br /> infinitas possibilidades.
            </Heading>
            <Text mt="8" fontSize="20" fontWeight="normal">
              Chegou a hora de tirar do papel a viagem que você sempre sonhou.{' '}
            </Text>
          </Box>
          <Image
            display={['none', 'none', 'none', 'none', 'block']}
            position="relative"
            top="12"
            src="assets/Airplane.svg"
            alt="Avião"
          />
        </Flex>
        <Flex wrap="wrap" as="section" align="center" justify="center" p="24">
          <TravelType
            text="vida noturna"
            imagePath="assets/icons/cocktail.svg"
          />
          <TravelType text="praia" imagePath="assets/icons/surf.svg" />
          <TravelType text="moderno" imagePath="assets/icons/building.svg" />
          <TravelType text="clássico" imagePath="assets/icons/museum.svg" />
          <TravelType text="e mais..." imagePath="assets/icons/earth.svg" />
        </Flex>
        <Box m="0 auto" w={90} h={1} bg="gray.500" />
      </Box>
    </>
  );
};

export default Home;
