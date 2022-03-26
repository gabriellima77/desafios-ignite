import { Box, Flex, Image, Text } from '@chakra-ui/react';

interface TravelTypeProps {
  imagePath: string;
  text: string;
}

export function TravelType({ imagePath, text }: TravelTypeProps) {
  return (
    <Flex minW={150} direction="column" align="center">
      <Image display={['none', 'none', 'block']} alt={text} src={imagePath} />
      <Text mt="4" fontWeight={600} fontSize={24}>
        {text}
      </Text>
    </Flex>
  );
}
