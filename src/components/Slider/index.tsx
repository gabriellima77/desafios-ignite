import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

const continents = [
  { continent: 'Europa', text: 'O continente mais antigo.' },
  { continent: 'Americas', text: 'Paisagens Lindas.' },
  { continent: 'Africa', text: 'O berço da humanidade.' },
  { continent: 'Asia', text: 'Um oriente há explorar.' },
  { continent: 'Oceania', text: 'Um novo mundo.' },
];

export function Slider() {
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
          <Flex align="center" justify="center" position="relative">
            <Image src="assets/Continent.png" alt={continent} />
            <Box textAlign="center" position="absolute" color="gray.50">
              <Heading fontSize={[20, 24, 48]}>{continent}</Heading>
              <Text fontWeight={700} fontSize={[14, 18, 24]}>
                {text}
              </Text>
            </Box>
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
