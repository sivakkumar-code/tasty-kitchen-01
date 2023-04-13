import React from 'react'

const CartDataContext = React.createContext({
  cartDataList: [],
  addCartData: () => {},
  removeCartData: () => {},
  updateCartCountData: () => {},
})

export default CartDataContext
