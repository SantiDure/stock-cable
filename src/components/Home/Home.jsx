import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Item from "../Item/Item";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const itemCollectionRef = collection(db, "stock");

  const getData = () => {
    getDocs(itemCollectionRef)
      .then((response) => {
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStock(filteredData);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => getData(), []);

  if (loading) {
    return (
      <div className="home__loading">
        <div className="home__spinner" />
        Cargando inventario...
      </div>
    );
  }

  if (stock.length === 0) {
    return (
      <div className="home__wrapper">
        <div className="home__empty">
          <div className="home__empty-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <div className="home__empty-title">Sin productos en stock</div>
          <p className="home__empty-desc">Agregá tu primer item para comenzar a gestionar el inventario.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home__wrapper">
      <div className="home__header">
        <div className="home__title">Inventario general</div>
        <div className="home__subtitle">Sistema de gestión de stock · OCANET</div>
      </div>

      <div className="home__count-bar">
        <div className="home__count-pill">
          <span className="home__count-dot" />
          {stock.length} {stock.length === 1 ? "item" : "items"} en stock
        </div>
      </div>

      <div>
        {stock.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            img={item.imagen}
            elemento={item.elemento}
            tipo={item.tipo}
            cantidad={item.cantidad}
            categoria={item.categoria}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
