import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';

interface ContinentProps {
  continent: string;
}

export default function Continent({ continent }: ContinentProps) {
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
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ['europa', 'americas', 'oceania', 'asia', 'africa'];
  return {
    paths: paths.map((path) => ({ params: { continent: path } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let continent = String(context.params?.continent);
  continent = continent[0].toUpperCase() + continent.substring(1);
  return {
    props: {
      continent,
    },
  };
};
