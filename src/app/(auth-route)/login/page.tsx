"use client"

import FormularioLogin from '@/components/FormularioLogin';
import { Box } from '@chakra-ui/react'
import React from 'react';



const Login = () => {

  return (
    <>
      <Box 
      backgroundSize={"cover"}
      width={"100vw"}
      height={"100vh"}
      position={"absolute"}
      backgroundImage={"/images/background-login2.jpg"}
      >
      </Box>      
      <Box
      position={"relative"}
      >
        <FormularioLogin />
      </Box>
    </>
  )  
};
export default Login;
