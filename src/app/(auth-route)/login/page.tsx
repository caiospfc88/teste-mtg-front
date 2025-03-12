"use client";

import LoginForm from "@/components/LoginForm";
import { Box } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <>
      <Box
        backgroundSize={"cover"}
        width={"100vw"}
        height={"100vh"}
        backgroundColor={"#0086FF"}
      >
        <LoginForm />
      </Box>
    </>
  );
};
export default Login;
