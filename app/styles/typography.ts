import { TextStyle } from 'react-native';
import { paletts } from './paletts';

export const typography: Record<string, TextStyle> = {
  // display
  d1: {
    fontSize: 57,
    letterSpacing: -0.25,
    lineHeight: 57,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  d2: {
    fontSize: 45,
    letterSpacing: 0,
    lineHeight: 52,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  d3: {
    fontSize: 36,
    letterSpacing: 0,
    lineHeight: 44,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },

  // headline
  h1: {
    fontSize: 32,
    letterSpacing: 0,
    lineHeight: 40,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  h2: {
    fontSize: 28,
    letterSpacing: 0,
    lineHeight: 36,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  h3: {
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 32,
    color: paletts.BLACK000,
    fontWeight: 'bold',
  },

  // title
  t1: {
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: 28,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  t2: {
    fontSize: 16,
    letterSpacing: 0.15,
    lineHeight: 24,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  t3: {
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },

  // label
  l1: {
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
    color: paletts.BLACK000,
    fontWeight: 'medium',
  },
  l2: {
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 16,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  l3: {
    fontSize: 11,
    letterSpacing: 0.1,
    lineHeight: 16,
    color: paletts.BLACK000,
    fontWeight: 'medium',
  },

  // body
  b1: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
    color: paletts.BLACK000,
    fontWeight: 'medium',
  },
  b2: {
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  },
  b3: {
    fontSize: 12,
    letterSpacing: 0.1,
    lineHeight: 16,
    color: paletts.BLACK000,
    fontWeight: 'medium',
  },

  // pop-up
  p1: {
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 24,
    color: paletts.BLACK000,
    fontWeight: 'medium',
  },
  p2: {
    fontSize: 13,
    letterSpacing: 0.2,
    lineHeight: 20,
    color: paletts.BLACK000,
    fontWeight: 'regular',
  }
};
