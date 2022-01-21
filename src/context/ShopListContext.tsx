import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react'

interface ShopListProviderProps {
  children: ReactNode
}

type ItemShop = {
  id: string;
  name: string;
  qnt: number;
  price: number;
  total: number;
}

interface ShopListContextData {
  shopList: ItemShop[];
  newShopItem: (item: ItemShop) => void;
  removeShopItem: (id: string) => void;
  editShopItem: (item: ItemShop) => void
}

const ShopListContext = createContext<ShopListContextData>({} as ShopListContextData)

export function ShopListProvider({ children }: ShopListProviderProps) {

  const [shopList, setShopList] = useState<ItemShop[]>([])

  useEffect(() => {
    const shoListStore = JSON.parse(localStorage.getItem('shopItems'))
    setShopList(shoListStore)
  }, [])

  function newShopItem(item: ItemShop) {
    setShopList(shopList ? [...shopList, item] : [item])

    localStorage.setItem('shopItems', JSON.stringify(shopList ? [...shopList, item] : [item]))
  }

  function removeShopItem(id: string) {
    const newList = shopList.filter(shopItem => shopItem.id !== id)
    setShopList(newList)
    localStorage.setItem('shopItems', JSON.stringify(newList))
  }

  function editShopItem(itemShop: ItemShop) {
    const newShopList = [...shopList]
    const currentItem = newShopList.find(item => item.id == itemShop.id)

    currentItem.name = itemShop.name
    currentItem.qnt = itemShop.qnt
    currentItem.price = itemShop.price
    currentItem.total = itemShop.total

    setShopList(newShopList)
    localStorage.setItem('shopItems', JSON.stringify(newShopList))
  }

  return (
    <ShopListContext.Provider value={{
      shopList,
      newShopItem,
      removeShopItem,
      editShopItem
    }}>
      {children}
    </ShopListContext.Provider>
  )
}

export function useShopList() {
  const context = useContext(ShopListContext)

  return context
}