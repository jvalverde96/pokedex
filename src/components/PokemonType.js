import { Badge, Stack } from "@chakra-ui/react";
import React from "react";

const PokemonType = ({ pokemon, displayRow = false }) => (
  <Stack direction={displayRow ? 'row' : ["column", "column", "row", "row"]}>
    {pokemon?.types.map((type) => (
      <Badge
        key={type.type.name}
        fontWeight="normal"
        fontSize={["sm", "sm","md", "md"]}
        rounded="md"
        p={["1px 10px", "2px 15px", "4px 20px", "4px 20px"]}
        w="fit-content"
        variant="solid"
        colorScheme={type.type.name}
      >
        {type.type.name}
      </Badge>
    ))}
  </Stack>
);

export default PokemonType;
