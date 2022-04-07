import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = () => (
  <Box m="auto" mt="80px" w="400px" h="100px" textAlign="center">
    <Spinner
      m="auto"
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="black"
      size="xl"
    />
    <Text fontWeight="normal" color="black" mt="10px" fontSize="xl">
      Fetching pokemons...
    </Text>
  </Box>
);

export default LoadingSpinner;
