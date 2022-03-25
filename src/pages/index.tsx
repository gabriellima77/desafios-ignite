import { Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>worldtrip | Home</title>
      </Head>
      <Header />
      <Flex w="100%" minH="100vh"></Flex>
    </>
  );
};

export default Home;
