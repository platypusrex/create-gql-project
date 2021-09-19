import React from 'react';
import { motion } from 'framer-motion';
import { Text, Flex, FlexProps } from '@chakra-ui/react';
import { card, cards, container } from './constants';

const MotionFlex = motion<FlexProps>(Flex);

export const CardStack: React.FC = () => (
  <MotionFlex
    justifyContent="center"
    backgroundImage="url('/svg/stacked-waves.svg')"
    backgroundSize="cover"
    h="100vh"
    initial="hidden"
    animate="visible"
    position="relative"
    overflow="hidden"
    variants={container}
  >
    {cards.map((c) => (
      <MotionFlex
        key={c.number}
        backgroundColor="#fff"
        alignItems="center"
        justifyContent="center"
        border="1px solid #d8d8d8"
        borderRadius="10px"
        boxShadow="0 0 20px -8px rgba(0, 0, 0, 0.25)"
        position="absolute"
        top={c.top}
        h={200}
        w={150}
        zIndex={c.zIndex}
        variants={card}
      >
        <Text fontSize="5xl">{c.number}</Text>
      </MotionFlex>
    ))}
  </MotionFlex>
);
