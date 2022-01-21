import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react"
import CartItem from "../components/CartItem"
import { IoIosAdd } from 'react-icons/io'
import { FormItem } from "../components/FormItem"
import { useMemo, useState } from "react"
import { useShopList } from "../context/ShopListContext"

export default function Home() {
  const { shopList } = useShopList()
  const [modalOpen, setModalOpen] = useState(false)

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
    <Flex flexDir={'column'} align={'flex-start'} paddingX={'6'} mt='12' >
      <Text as='h1' fontWeight={'bold'} fontSize={'4xl'} >Compra mês</Text>
      <Text fontWeight={'bold'} fontSize={'2xl'}>{month}</Text>

      <Box mt='8'>
        <Text>Total da compra</Text>
        <Text fontWeight={'bold'} fontSize={"3xl"} mt='2'>{formatMoney().format(totalShop ?? 0)}</Text>
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

      <Button
        bg='green.500'
        color='gray.50'
        position={'fixed'}
        w='80%'
        zIndex={'2'}
        bottom='6'
        left={'50%'}
        transform='translateX(-50%)'
        p={'6'}
        leftIcon={<Icon as={IoIosAdd} w={8} h={8} />}
        onClick={() => setModalOpen(true)}
      > Adicionar novo item</Button>

      <FormItem isOpen={modalOpen} onClose={handleClose} buttonText="Adicionar novo item" />
    </Flex>
  )
}
