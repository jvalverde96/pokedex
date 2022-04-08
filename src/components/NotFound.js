import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import error from "../images/error-404.png";

const NotFound = () => (
  <VStack
    spacing="15px"
    mt={["30px", "30px", "50px", "50px"]}
    w={["300px", "350px", "580px", "580px"]}
    textAlign="center"
  >
    <Image boxSize="50px" src={error} />
    <Text mt="15px" fontWeight="normal" color="black" fontSize="lg">
      Ooops! No pokemons found with your searching criteria... 😞
    </Text>
  </VStack>
);

export default NotFound;