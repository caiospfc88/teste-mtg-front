import Image from "next/image";
import IconeUsuario from "./IconeUsuario";
import { Box } from "@chakra-ui/react";
import MenuPrincipal from "./MenuPrincipal";

const TopBar = () => {
  return (
    <>
      <Box
        bgColor={"#0086FF"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        w={"100%"}
        h={"78px"}
        boxShadow={"1px 3px 10px 5px #002544"}
      >
        <Box w={"33%"} display={"flex"} justifyContent={"left"}>
          <MenuPrincipal />
        </Box>
        <Box w={"33%"} display={"flex"} justifyContent={"center"}>
          <Box
            h={"fit-content"}
            w={"350px"}
            display={"flex"}
            justifyContent={"center"}
            mt={"3px"}
          >
            <Image
              src={"/images/logoHorizontal.jpg"}
              height={15}
              width={100}
              alt="Teste"
              priority={true}
            />
          </Box>
        </Box>
        <Box w={"33%"} display={"flex"} justifyContent={"right"} m={"5px"}>
          <IconeUsuario />
        </Box>
      </Box>
    </>
  );
};
export default TopBar;
