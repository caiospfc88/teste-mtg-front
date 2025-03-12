"use client";
import { RiGroup2Fill, RiMenuUnfold3Line } from "react-icons/ri";
import { Link } from "@chakra-ui/next-js";
import { TfiHome } from "react-icons/tfi";
import { HiUsers } from "react-icons/hi2";

export type ItemMenu = {
  id: number;
  page: string;
  icon: ReactElement;
  path: string;
  target: string;
  home: boolean;
  title: string;
  description: string;
};

import React, { ReactElement } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Text,
  DrawerHeader,
  DrawerOverlay,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

export const pagesList: Array<ItemMenu> = [
  {
    id: 1,
    page: " - Home",
    icon: <TfiHome />,
    path: "/",
    target: "_self",
    home: false,
    title: "HOME",
    description: "Tela inicial do sistema",
  },
  {
    id: 2,
    page: " - Usuários",
    icon: <HiUsers />,
    path: "/usuarios",
    target: "_self",
    home: true,
    title: "Usuários",
    description: "Função para gestão de usuarios.",
  },
  {
    id: 3,
    page: " - Grupos",
    icon: <RiGroup2Fill />,
    path: "/grupos",
    target: "_self",
    home: true,
    title: "Grupos",
    description: "Função para gestão de grupos.",
  },
];

const MenuPrincipal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      mb={"4px"}
    >
      <Box
        backgroundColor={"#0086FF"}
        cursor={"pointer"}
        ml={"15px"}
        onClick={onOpen}
        fontSize={"50px"}
        color={"snow"}
        _hover={{ transform: "scale(1.2)", transition: "0.8s" }}
      >
        <RiMenuUnfold3Line />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={"sm"}
        key={"md"}
      >
        <DrawerOverlay />
        <DrawerContent
          boxShadow={"0px 0px 8px 10px #002544"}
          sx={{
            width: "400px !important",
            maxWidth: "400px !important",
          }}
        >
          <DrawerHeader
            backgroundColor={"#0086FF"}
            color={"snow"}
            fontSize={"35px"}
            h={"75px"}
            borderBottom={"1px #fff solid"}
            boxShadow={""}
            display={"flex"}
            mt={"5px"}
            justifyContent={"center"}
          >
            <Text textShadow={"3px 6px 7px black"} letterSpacing={"3px"}>
              TESTE MTG
            </Text>
          </DrawerHeader>

          <DrawerBody
            backgroundColor={"#0086FF"}
            fontSize={"22px"}
            fontWeight={"500"}
            paddingTop={"15px"}
            h={"100vh"}
            pl={"15px"}
          >
            <UnorderedList styleType="none" mt={"20px"} ml={"0px"}>
              {pagesList.map((item) => (
                <ListItem key={item.id} marginBottom={"12px"}>
                  <Link
                    href={item.path}
                    color="snow"
                    target={item.target}
                    _hover={{
                      color: "white.500",
                      fontSize: "25px",
                      transition: "0.2s",
                    }}
                  >
                    <Box
                      display={"flex"}
                      w={"100%"}
                      flexDirection={"row"}
                      gap={"4px"}
                      textShadow={"1px 3px 4px black"}
                      letterSpacing={"1px"}
                    >
                      <Text pt={"3px"}>{item.icon}</Text>
                      {item.page}
                    </Box>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default MenuPrincipal;
