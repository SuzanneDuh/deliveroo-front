import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Hp from "./components/Hp";
import Category from "./components/Category";

// import Header from "./components/Header";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  let sousTotal = 0;

  cart.forEach((cartItem) => {
    console.log(cartItem);
    sousTotal = sousTotal + Number(cartItem.price) * cartItem.quantity;
  });

  let total = sousTotal + 2.5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://deliveroo3.herokuapp.com/");
      // OK ça marche enfin avec mon back. HALLELUIA... console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addCart = (meal) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === meal.id);
    if (exist) {
      exist.quantity++;
    } else {
      meal.quantity = 1;
      newCart.push(meal);
    }

    setCart(newCart);
  };

  const substractCart = (meal) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === meal.id);
    if (exist.quantity === 1) {
      const index = newCart.indexOf(exist);
      newCart.splice(index, 1);
    } else {
      exist.quantity--;
    }

    setCart(newCart);
  };

  return isLoading ? (
    <h1>Patience...Patience...En cours de chargement...</h1>
  ) : (
    // OK CA S'AFFICHE BIEN++
    <div>
      <img src="./assets/logodeliveroo.jpeg" alt="" />
      <Hp restaurant={data.restaurant} />
      <div className="articleetpanier">
        <div className="a">
          {data.categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <Category
                  addCart={addCart}
                  className="b"
                  keys={index}
                  category={category}
                />
              )
            );
          })}
        </div>
        <div className="panier">
          {cart.map((elem, index) => {
            return (
              <>
                <div key={elem.id}>
                  <div>
                    <button onClick={() => substractCart(elem)}>-</button>
                    <span>{elem.quantity}</span>
                    <button onClick={() => addCart(elem)}>+</button>
                  </div>
                  <span> {elem.title}</span>
                  <span> {Number(elem.price) * elem.quantity}</span>
                </div>
              </>
            );
          })}
          <div>
            <p>Sous-total : {sousTotal.toFixed(2)} €</p>
            <p>Frais de livraison de 2.50€</p>
            <p>Total : {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
