import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "bottom",
          isClosable: true,
          variant: "solid",
        },
      }}
    >
      {children}
    </ChakraProvider>
  );
}
