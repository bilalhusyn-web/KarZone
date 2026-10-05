import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  UserInfo: localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null,
  cart: {
    shippingaddress: localStorage.getItem("shippingaddress")
      ? JSON.parse(localStorage.getItem("shippingaddress"))
      : {},

    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : " ",

    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  Admin: localStorage.getItem("Admin")
    ? JSON.parse(localStorage.getItem("Admin"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM_CART":
      const newItems = action.payload;
      const existItems = state.cart.cartItems.find((x) => x.id === newItems.id);
      const cartItems = existItems
        ? state.cart.cartItems.map((item) =>
            item.id === existItems.id ? newItems : item
          )
        : [...state.cart.cartItems, newItems];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartitems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "ClearUserInfo":
      return { ...state, UserInfo: null };
    case "Admin":
      return { ...state, Admin: action.payload };
    case "UserLoggedIn":
      return { ...state, UserInfo: action.payload };
    case "update":
      return { UserInfo: action.payload };
    case "ResetUserInfo":
      return { ...state, UserInfo: null };
    case "CLEAR_CART":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "ADD_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingaddress: action.payload },
      };
    case "ADD_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
