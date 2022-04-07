import { useContext } from "react";

import classes from "./MealsItem.module.css";
import MealsItemsForm from "./MealsItemsForm";
import CartContext from "../../../store/cart-context";


const MealsItems = (props) => {
  const cntx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHanlder = amount =>{
    cntx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
    return
  }

  return (
    <li className={classes.meal}>
    <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemsForm id={props.id} onAddToCart={addToCartHanlder}/>
      </div>
    </li>
  );
};

export default MealsItems;
