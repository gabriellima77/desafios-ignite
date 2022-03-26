import { Box, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { City } from '../components/City';
import { Header } from '../components/Header';

interface ContinentProps {
  continent: string;
  cities: {
    id: number;
    name: string;
    country: string;
    flag: string;
    img: string;
  }[];
}

export default function Continent({ continent, cities }: ContinentProps) {
  return (
    <>
      <Head>
        <title>worldtrip | {continent}</title>
      </Head>
      <Header />
      <Box as="main">
        <Flex
          as="section"
          align={['center', 'center', 'flex-end']}
          justify={['center', 'center', 'flex-start']}
          w="100%"
          position="relative"
        >
          <Image src="assets/europa.png" alt={continent} />
          <Heading
            color="gray.50"
            px={[0, 0, '100px', '140px']}
            pb={[0, 0, '48px', '78px']}
            fontWeight={600}
            position="absolute"
          >
            {continent}
          </Heading>
        </Flex>
        <Flex
          as="section"
          p={[4, 18, 20, 24]}
          direction={['column', 'column', 'column', 'row']}
        >
          <Text w={['100%', '100%', '100%', '50%']}>
            A Europa é, por convenção, um dos seis continentes do mundo.
            Compreendendo a península ocidental da Eurásia, a Europa geralmente
            divide-se da Ásia a leste pela divisória de águas dos montes Urais,
            o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste
          </Text>
          <Flex
            flex="1"
            justify="space-around"
            align="center"
            mt={[8, 8, 8, 0]}
          >
            <Box textAlign="center">
              <Heading color="yellow.500">50</Heading>
              <Text>países</Text>
            </Box>
            <Box textAlign="center">
              <Heading color="yellow.500">60</Heading>
              <Text>línguas</Text>
            </Box>
            <Box textAlign="center">
              <Heading color="yellow.500">27</Heading>
              <Text display="flex" alignItems="center">
                cidades + 100
                <Tooltip label="Cidades mais visitadas do mundo">
                  <Image
                    display="inline-flex"
                    src="assets/icons/Info.svg"
                    alt="Informações"
                    ml="1"
                  />
                </Tooltip>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box as="section" px="24" pb="8">
          <Heading fontSize={[24, 24, 24, 36]} fontWeight={500}>
            Cidades +100
          </Heading>
          <Flex mt="8" wrap="wrap" gap="14">
            {cities.map(({ id, name, country, img, flag }) => (
              <City
                key={id}
                name={name}
                country={country}
                img={img}
                flag={flag}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get('http://localhost:3000/continents');
  const paths = data.map((continent: any) => ({
    params: { continent: continent.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await axios.get('http://localhost:3000/continents');
  let continent = String(context.params?.continent);

  const { cities } = data.find((cont: any) => cont.name === continent);
  continent = continent.replaceAll('_', ' ');
  continent = continent[0].toUpperCase() + continent.substring(1);

  return {
    props: {
      continent,
      cities,
    },
  };
};
