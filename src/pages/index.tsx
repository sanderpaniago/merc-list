import { Box, Button, Flex, Icon, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import CartItem from "../components/CartItem"
import { IoIosAdd } from 'react-icons/io'
import { FormItem } from "../components/FormItem"
import { useMemo, useState } from "react"
import { useShopList } from "../context/ShopListContext"
import Head from "next/head"

export default function Home() {
  const { shopList } = useShopList()
  const [modalOpen, setModalOpen] = useState(false)

  const isWideVersion = useBreakpointValue({
    lg: true,
    base: false,
  });

  const totalShop = shopList?.reduce((acc, item) => {
    return acc + item.total
  }, 0)

  function handleClose() {
    setModalOpen(false)
  }

  const month = new Intl.DateTimeFormat('pt-br', {
    dateStyle: "medium",

  }).format(new Date())

  function formatMoney() {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: "BRL"
    })
  }

  const shopListFormat = useMemo(() => {
    return shopList?.map(item => ({
      id: item.id,
      name: item.name,
      qnt: item.qnt,
      price: item.price,
      priceFormat: formatMoney().format(item.price),
      total: formatMoney().format(item.total)
    }))
  }, [shopList])

  return (
    <Flex
      flexDir={'column'}
      align={'flex-start'}
      paddingX={'6'}
      mt='12'
      maxW={'container.sm'}
      mx='auto'
    >
      <Head>
        <title>Merc List</title>
      </Head>
      <Text as='h1' fontWeight={'bold'} fontSize={'4xl'} >Compra dia</Text>
      <Text fontWeight={'bold'} fontSize={'2xl'}>{month}</Text>

      <Box mt='8' position={'relative'} w='full'>
        <Text>Total da compra</Text>
        <Text fontWeight={'bold'} fontSize={"3xl"} mt='2'>{formatMoney().format(totalShop ?? 0)}</Text>

        <Button
          bg='green.500'
          color='gray.50'
          d='flex'
          w={14}
          h={14}
          borderRadius={isWideVersion ? 'base' : 'full'}
          alignItems={'center'}
          justifyContent={'center'}
          position={isWideVersion ? 'absolute' : 'fixed'}
          zIndex={'2'}
          bottom={isWideVersion ? 0 : 6}
          left={isWideVersion ? 'auto' : '50%'}
          right={isWideVersion ? 0 : 'auto'}
          transform={isWideVersion ? '' : 'translateX(-50%)'}
          onClick={() => setModalOpen(true)}
        >
          <Icon as={IoIosAdd} w={8} h={8} />
        </Button>
      </Box>

      <VStack w='full' mt='6' spacing={'6'} pb='8'>
        {shopListFormat?.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            priceFormat={item.priceFormat}
            price={item.price}
            qnt={item.qnt}
            total={item.total}
            id={item.id}
          />
        ))}
      </VStack>

      <FormItem isOpen={modalOpen} onClose={handleClose} buttonText="Adicionar novo item" />
    </Flex>
  )
}
