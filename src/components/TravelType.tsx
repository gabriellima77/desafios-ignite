import { Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

interface TravelTypeProps {
  imagePath: string;
  text: string;
}

export function TravelType({ imagePath, text }: TravelTypeProps) {
  const isWideScreen = useBreakpointValue({
    base: false,
    md: true,
  });

  const before = isWideScreen
    ? {}
    : {
        content: '""',
        w: '10px',
        h: '10px',
        borderRadius: '50%',
        bg: 'yellow.500',
        display: 'inline-block',
        mr: '4',
      };

  return (
    <Flex
      mr={[8, 8, 0]}
      minW={['0', '0', '150px']}
      direction="column"
      align="center"
    >
      <Image display={['none', 'none', 'block']} alt={text} src={imagePath} />
      <Text
        mt="4"
        fontWeight={600}
        fontSize={[14, 20, 20, 24]}
        _before={before}
      >
        {text}
      </Text>
    </Flex>
  );
}
