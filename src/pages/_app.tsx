import { ChakraProvider } from "@chakra-ui/react"
import { ShopListProvider } from "../context/ShopListContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ShopListProvider>
        <Component {...pageProps} />
      </ShopListProvider>
    </ChakraProvider>
  )
}

export default MyApp
