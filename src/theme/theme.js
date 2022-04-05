import { theme } from "@chakra-ui/react";
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const customTheme = {
  ...theme,
  breakpoints,
  colors: {
    ...theme.colors,
    primary: {
      500: "#5B00C3",
    },
    secondary: {
      500: "#b30000",
    },
    tertiary: {
      500: "#141313",
    },
    quaternary: {
      500: "#0047b3"
    },
    quinary: {
      500: "#4dd2ff"
    },
    normal: {
      500: "#ecd8c6",
      200: "#eae1c8",
    },
    fire: {
      500: "#ff8533",
      200: "#ead0c8"
    },
    water: {
      500: "#3385ff",
      200: "#c8e1ea"
    },
    grass: {
      500: "#2aa22a",
      200: "#d0eac8"
    },
    electric: {
      500: "#CBBF09",
      200: "#eaeac8",
    },
    ice: {
      500: "#b3f0ff",
      200: "#c8eaea"
    },
    fighting: {
      500: "#992600",
      200: "#eac8c8",
    },
    poison: {
      500: "#993399",
      200: "#c6c6ec",
    },
    ground: {
      500: "#dfbe9f",
      200: "#eae1c8",
    },
    flying: {
      500: "#b3ccff",
      200: "#c8d9ea",
    },
    psychic: {
      500: "#ff4da6",
      200: "#eac8ea",
    },
    bug: {
      500: "#86b300",
      200: "#e1eac8",
    },
    rock: {
      500: "#806000",
      200: "#e3d7b5",
    },
    ghost: {
      500: "#5c0099",
      200: "#bebef4",
    },
    dark: {
      500: "#0d0d0d",
      200: "#404040",
    },
    dragon: {
      500: "#751aff",
      200: "#96A1FF",
    },
    steel: {
      500: "#b3b3cc",
      200: "#bfbfbf",
    },
    fairy: {
      500: "#ffb3da",
      200: "#e2cfcf",
    },
  },
  fonts: {
    heading: "Open Sans, sans-serif",
    body: `'Luckiest Guy', 'Lato'`,
  },
};

export default customTheme;
