import { Variants } from 'framer-motion';

export const container: Variants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

export const card: Variants = {
  hidden: {
    opacity: 1,
    y: '-500%',
    skew: ['25deg', '15deg'],
    rotate: '-40deg',
  },
  visible: {
    opacity: 1,
    y: ['-500%', '-50%', '-60%', '-50%', '-55%', '-50%', '500%'],
    transition: {
      duration: 2.5,
      type: 'spring',
      damping: 3,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

export const cards = [
  { top: '52.5%', number: 1, zIndex: 1 },
  { top: '50%', number: 3, zIndex: 2 },
  { top: '47.5%', number: 5, zIndex: 3 },
];
