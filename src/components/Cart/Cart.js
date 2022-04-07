import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: "c1", name: "sushi", amount: 2, price: 1299 }].map((item) => (
        <li  key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onHideHanlder={props.onHideHanlder}>
      {cartItems}
      <div className={classes.total}>
          <span>Total Amount</span>
          <span>35.62</span>
      </div>
      <div className={classes.actions}>
          <button onClick={props.onHideHanlder} className={classes['button--alt']}>Close</button>
          <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
