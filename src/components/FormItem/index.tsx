import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { IoIosAdd } from 'react-icons/io'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from '../Input'
import { useRef } from "react";
import { useShopList } from "../../context/ShopListContext";

interface FormData {
  name: string
  qnt: number,
  price: number
}

type FormItemProps = {
  isOpen: boolean
  onClose: () => void
  buttonText: string
  defaultValue?: {
    id: string,
    name: string,
    qnt: number,
    price: number
  }
}

export function FormItem({ isOpen, onClose, defaultValue, buttonText }: FormItemProps) {
  const formRef = useRef<FormHandles>(null)

  const { newShopItem, editShopItem } = useShopList()

  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    const newItem = {
      id: defaultValue?.id ?? Math.floor(Date.now() * Math.random()).toString(36),
      name: data.name,
      qnt: Number(data.qnt),
      price: Number(data.price),
      total: Number(data.qnt) * Number(data.price)
    }

    if (defaultValue?.id) {
      editShopItem(newItem)
    } else {
      newShopItem(newItem)
    }

    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} >
      <ModalOverlay />
      <ModalContent
        bg='gray.800'
        bottom={0}
        position={'absolute'}
        m='0'
        borderRadius={'16px 16px 0 0'}
        pt={2}
      >
        <ModalHeader>Novo item</ModalHeader>
        <ModalCloseButton mt={2} />
        <ModalBody px='6'>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: defaultValue?.name,
              qnt: defaultValue?.qnt,
              price: defaultValue?.price
            }}
          >
            <Stack spacing={'4'} pb='8'>
              <Input name='name' placeholder="Nome" defaultValue={defaultValue?.name} />
              <Input name='qnt' placeholder='Quantidade' type='number' defaultValue={defaultValue?.qnt} />
              <Input name='price' placeholder='Valor unid.' type='number' step='0.01' defaultValue={defaultValue?.price} />
            </Stack>
            <Button
              bg='green.500'
              color='gray.50'
              w='full'
              type="submit"
              p={'6'}
              mb='4'
              leftIcon={<Icon as={IoIosAdd} w={8} h={8} />}
              _hover={{ bg: 'green.600', }}
            >{buttonText}</Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}