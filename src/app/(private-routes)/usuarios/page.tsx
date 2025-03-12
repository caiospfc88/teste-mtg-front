"use client";

import ListaUsuarios from "@/components/ListaUsuarios";
import TopBar from "@/components/TopBar";
import { Box } from "@chakra-ui/react";

const page = () => {
  return (
    <Box>
      <TopBar />
      <ListaUsuarios />
    </Box>
  );
};

export default page;
