import React from "react";
import { ItemMenu } from "../components/MenuPrincipal";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Link,
  Stack,
  Tooltip,
} from "@chakra-ui/react";

type CardT = {
  item: ItemMenu;
};

const CardPaginas = ({ item }: CardT) => {
  return (
    <Box
      key={item.title}
      itemID={item.title}
      cursor={"pointer"}
      borderRadius={"25px"}
      boxShadow={"1px 2px 5px 3px #002544"}
      _hover={{
        boxShadow: "2px 2px 6px 6px #002544",
        transform: "scale(1.1)",
        transition: "0.5s",
      }}
    >
      <Tooltip
        hasArrow
        textShadow={"1px 2px 3px black"}
        label={item.title + " - " + item.description}
        bg="#0086FF"
        borderRadius={"10px"}
        p={"8px"}
        mt={"15px"}
        color={"snow"}
      >
        <Link
          href={item.path}
          target={item.target}
          style={{ textDecoration: "none" }}
        >
          <Card
            w={"148px"}
            h={"130px"}
            borderRadius={"25px"}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <CardBody
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Box color={"#0086FF"} fontSize={"60px"}>
                {item.icon}
              </Box>
              <Stack mt="2" spacing="1">
                <Heading
                  w={"100%"}
                  textColor={"#0086FF"}
                  fontSize={"10px"}
                  display={"flex"}
                  fontWeight={500}
                  justifyContent={"center"}
                  textDecoration={"none"}
                  textShadow={"0.5px 0.5px 1px #0086FF"}
                >
                  {item.title}
                </Heading>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default CardPaginas;
