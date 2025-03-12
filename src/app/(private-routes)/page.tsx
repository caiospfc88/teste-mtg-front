"use client";
import CardPaginas from "@/components/CardPaginas";
import { ItemMenu, pagesList } from "@/components/MenuPrincipal";
import TopBar from "@/components/TopBar";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

export default function Home() {
  const cards: ItemMenu[] = pagesList.filter(
    (cardItem) => cardItem.home !== false
  );

  return (
    <Box>
      <TopBar />
      <Box
        id="Title"
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="20px"
      >
        <Text
          color="#0086FF"
          fontWeight="bolder"
          fontSize="50px"
          textShadow="2px 4px 3px black"
          letterSpacing="8px"
        >
          TESTE MTG
        </Text>
      </Box>
      <Box mt="30px" w="100%" display="flex" justifyContent="center">
        <SimpleGrid columns={2} spacing="25px" maxWidth="1200px">
          {cards.map((card) => (
            <Box key={card.id.toString()}>
              <CardPaginas item={card} />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
