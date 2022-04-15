import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealsItems from "./MealsItem/MealsItems";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-98087-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error)=>{
      setIsLoading(false); 
      setHasError(error.message);
    });
  }, []);

  let mealsList = meals.map((meal) => (
    <MealsItems
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  
    if (isLoading) {
      mealsList = <p>Loading...</p>;
    }

  if (hasError) {
   return mealsList = <p>{hasError}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
