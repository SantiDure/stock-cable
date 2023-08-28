import { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Item from "../Item/Item";
import "./Home.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const itemCollectionRef = collection(db, "stock");
  useEffect(() => {
    getDocs(itemCollectionRef)
      .then(async (response) => {
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStock(filteredData);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [stock]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="cards">
        {stock.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              img={item.imagen}
              elemento={item.elemento}
              tipo={item.tipo}
              cantidad={item.cantidad}
              categoria={item.categoria}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
