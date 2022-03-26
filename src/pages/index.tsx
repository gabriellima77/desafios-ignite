import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Slider } from '../components/Slider';
import { TravelType } from '../components/TravelType';

interface HomeProps {
  continents: {
    id: number;
    name: string;
    text: string;
    cities: {
      id: number;
      name: string;
      country: string;
      flag: string;
      img: string;
    }[];
  }[];
}

const Home: NextPage<HomeProps> = ({ continents }) => {
  const getSlideContent = () =>
    continents.map((continent) => {
      let { name } = continent;
      if (name.includes('america')) name = name.replaceAll('_', ' ');
      name = name[0].toUpperCase() + name.substring(1);
      return { continent: name, text: continent.text };
    });

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
            px={['18', '24', '36']}
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
        <Flex
          wrap="wrap"
          as="section"
          align="center"
          justify="center"
          p={['18', '24']}
        >
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
        <Flex direction="column" align="center">
          <Heading fontSize={[20, 20, 28, 32, 48]} textAlign="center" my="10">
            Vamos nessa?
            <br />
            Então escolha seu continente
          </Heading>
          <Box px={[0, 0, 24]} w="100%">
            <Slider continents={getSlideContent()} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await axios.get('http://localhost:3000/continents');
  return {
    props: {
      continents: data.data,
    },
  };
};

export default Home;
