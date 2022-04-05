import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import pokemonLogo from "../images/pokemon-logo.png";
import pokedex from "../images/pokedex.png";
import pokeballWallpaper from '../images/pokeball-wallpaper.png';

const Header = () => (
  <Flex
    w="100%"
    h="130px"
    bg="#141313"
    boxShadow="dark-lg"
    justifyContent="space-between"
    bgImage={pokeballWallpaper}
    bgRepeat='no-repeat'         
    bgPosition="center"
    bgSize='cover'
  >
    <Box
      w="300px"
      h="130px"
      bgImage={pokemonLogo}
      bgSize={["100px","130px", "220px","220px"]}
      bgRepeat="no-repeat"
      bgPosition="20px"
      overflow="visible"
    />
    <Box
      w="100px"
      h="130px"
      bgSize={["65px","65px", "80px","80px"]}
      bgRepeat="no-repeat"
      bgPosition="0px"
      bgImage={pokedex}
    />
  </Flex>
);

export default Header;
