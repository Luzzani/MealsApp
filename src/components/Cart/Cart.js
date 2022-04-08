import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cntx = useContext(CartContext);

  const totalAmount = `$${cntx.totalAmount.toFixed(2)}`;
  const hasItems = cntx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cntx.addItem(item);
  };
  
  const cartItemRemoveHandler = (id) => {
    cntx.removeItem(id);
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

  return (
    <Modal onHideHanlder={props.onHideHanlder}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onHideHanlder}
          className={classes["button--alt"]}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
