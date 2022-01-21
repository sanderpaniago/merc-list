import { useState } from "react";
import { Box, StackProps, HStack, Flex, IconButton, Icon, Text, Link } from "@chakra-ui/react";
import { motion, useMotionValue } from 'framer-motion'
import { TiDocumentDelete } from 'react-icons/ti'
import { RiPencilLine } from "react-icons/ri";
import { useShopList } from "../../context/ShopListContext";
import { FormItem } from "../FormItem";

type CartItem = {
  name: string
  qnt: number,
  price: number,
  priceFormat: string
  id: string
  total: string
}

type PoseValue = 'visible' | 'hidden'

const MotionTr = motion<StackProps>(HStack)
const MotionBox = motion(Box)

export default function CartItem({ qnt, name, price, total, id, priceFormat }: CartItem) {
  const { removeShopItem } = useShopList()
  const x = useMotionValue(0)

  const [openModal, setOpenModal] = useState(false)
  const [pose, setPose] = useState<PoseValue>('visible')
  return (
    <MotionBox
      overflow='hidden'
      w='full'
      position='relative'
      minHeight='80px'
      d='flex'
    >

      <MotionTr
        drag='x'
        dragConstraints={{ left: 0, right: -0 }}
        animate={pose}
        variants={{
          visible: { x: 0 },
          hidden: { x: -150 }
        }}
        onAnimationComplete={() => {
          if (x.get() < -50) {
            setPose('hidden')
          } else {
            setPose('visible')
          }
        }}
        onDragEnd={() => {
          if (x.get() < -50) {
            setPose('hidden')
          } else {
            setPose('visible')
          }
        }}
        style={{ x }}

        w='full'
        position='absolute'
        height='full'
        background='gray.800'
        zIndex='1'
        borderRadius={'6'}
        padding='4'
      >
        <Box w='full'>
          <Flex justify={'space-between'}>
            <Text fontSize={"md"} fontWeight={'semibold'}>{name} </Text>
            <Text fontSize={"md"} fontWeight={'semibold'}>{total}</Text>
          </Flex>
          <Text as={'div'} color='gray.500' fontSize={'sm'} mt='2' d='flex'>
            Unid: {qnt}
            <Text ml='4'>{priceFormat} /unid.</Text>
          </Text>
        </Box>
      </MotionTr>
      <HStack d='flex' mr='0' ml='auto' alignSelf='center'>
        <IconButton
          aria-label="delete document"
          colorScheme="red"
          size='lg'
          onClick={() => removeShopItem(id)}
          icon={<Icon as={TiDocumentDelete} w={6} h={6} />}
        />
        <IconButton
          aria-label='edit document'
          colorScheme="purple"
          onClick={() => {
            setOpenModal(true)
            setPose('visible')
          }}
          size='lg'
          icon={<Icon as={RiPencilLine} w={6} h={6} />}
        />
        <FormItem
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          buttonText="Salvar item"
          defaultValue={{
            id,
            name,
            price,
            qnt
          }} />
      </HStack>
    </MotionBox>
  )
}