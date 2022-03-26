import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

interface CityProps {
  name: string;
  country: string;
  flag: string;
  img: string;
}

export function City({ name, country, flag, img }: CityProps) {
  return (
    <Box
      as="article"
      borderRadius="4px"
      border="1px solid"
      borderColor="yellow.500"
      bg="white"
    >
      <Image alt="name" src={img} />
      <Flex align="center" py="6" px="4">
        <Box>
          <Text as="span" display="block" fontSize={20} fontWeight={600}>
            {name}
          </Text>
          <Text as="span" display="block" fontSize={16} fontWeight={500}>
            {country}
          </Text>
        </Box>
        <Image
          alt={`Bandeira ${country}`}
          src={flag}
          w="30px"
          h="30px"
          borderRadius="50%"
          ml="auto"
        />
      </Flex>
    </Box>
  );
}
