import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface SliderProps {
  continents: {
    continent: string;
    text: string;
  }[];
}

export function Slider({ continents }: SliderProps) {
  const getContinentPath = (continent: string) => {
    const path = continent.includes('America')
      ? continent.replaceAll(' ', '_')
      : continent;
    return '/' + path.toLowerCase();
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      loop
      navigation
      style={{ paddingInlineStart: 0, display: 'flex', marginBottom: '24px' }}
    >
      {continents.map(({ continent, text }) => (
        <SwiperSlide key={continent} style={{ listStyle: 'none' }}>
          <Link href={getContinentPath(continent)} passHref>
            <a>
              <Flex align="center" justify="center" position="relative">
                <Image src="assets/Continent.png" alt={continent} />
                <Box textAlign="center" position="absolute" color="gray.50">
                  <Heading fontSize={[20, 24, 48]}>{continent}</Heading>
                  <Text fontWeight={700} fontSize={[14, 18, 24]}>
                    {text}
                  </Text>
                </Box>
              </Flex>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
