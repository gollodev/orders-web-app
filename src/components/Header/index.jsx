import React from "react"
import { Box, Heading, Flex, Button, useColorMode } from "@chakra-ui/react"

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#1A202C"
      color="white"
    >
      <Flex
        align="center"
        mr={{ md: "5" }}
        width={{ base: "100%", md: "auto" }}
        justifyContent={{ base: "space-between", md: "flex-start" }}
      >
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Orders Panel
        </Heading>

        <Box
          display={{ sm: "block", md: "none" }}
          onClick={handleToggle}
        >
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
      </Flex>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </Button>
      </Box>
    </Flex>
  )
}