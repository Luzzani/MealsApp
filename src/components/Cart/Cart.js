import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cntx = useContext(CartContext);

  const totalAmount = `$${cntx.totalAmount.toFixed(2)}`;
  const hasItems = cntx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cntx.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cntx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submiteOrderHandler = async (userData) => {
    setIsSubmitting(true);
    // implement error hanlder
    await fetch(
      "https://react-http-98087-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cntx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cntx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cntx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideHanlder} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {!isCheckout && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submiteOrderHandler}
          onCancel={props.onHideHanlder}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const setIsSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Successfully sent the order!</p>

  return <Modal onHideHanlder={props.onHideHanlder}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && setIsSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>;
};

export default Cart;
