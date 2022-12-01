import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span>Your cart is empty</span>
        )}
      </div>
      <Button
        buttonOptions={{
          type: "button",
          onClick:goToCheckoutHandler
        }}
      >
        CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
