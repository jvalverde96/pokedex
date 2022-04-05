import { Box, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import customTheme from "../theme/theme";
import { PokedexContext } from "./Pokedex";
import PokemonType from "./PokemonType";

const PokemonItem = ({ pokemon, onClick }) => {
  const { id, name, sprites, types } = pokemon;
  const { imageType } = useContext(PokedexContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      rounded="md"
      cursor="pointer"
      w={["280px","280px","350px","350px"]}
      key={pokemon.name}
      m="auto"
      onClick={onClick}
      _hover={{transform: 'matrix(1, 0, 0, 1, 0, -5)'}}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h={["150px", "200px", "250px","250px"]}
        rounded="md"
        roundedBottom='none'
        bgGradient={
          types.length === 2
            ? `linear(to-r, ${
                customTheme.colors[types[0].type.name][200] ||
                customTheme.colors[types[0].type.name][500]
              }, ${
                customTheme.colors[types[1].type.name][200] ||
                customTheme.colors[types[1].type.name][500]
              })`
            : ""
        }
        bg={
          types.length === 1
            ? customTheme.colors[types[0].type.name][200] ||
              customTheme.colors[types[0].type.name][500]
            : ""
        }
      >
        <Image
          boxSize={[150,  150, 200,200]}
          src={
            imageType !== "default"
              ? sprites.other[imageType].front_default
              : sprites.front_default
          }
        />
      </Box>
      <VStack
        h={["100px", "100px", "120px","120px"]}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="4px"
        spacing="1px"
        bg="white"
        rounded="md"
        borderTopRadius={0}
      >
        <Text color="black" fontSize={["md","md", "xl", "xl"]}>
          #{id}
        </Text>
        <Text color="black" fontSize={["md","md", "xl", "xl"]}>
          {" "}
          {name}
        </Text>
        <PokemonType pokemon={pokemon} displayRow={true} />
      </VStack>
    </Box>
  );
};

export default PokemonItem;
