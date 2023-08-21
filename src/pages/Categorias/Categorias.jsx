import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import Item from "../../components/Item/Item";
function Categorias() {
  const { categoria } = useParams();

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

  const filteredItems = stock.filter((item) => {
    return item.categoria === categoria;
  });

  return (
    <>
      <Link to={"/nuevo-item"}>
        <button className="btn btn-success">Agregar item</button>
      </Link>
      <br></br>
      <div>
        {filteredItems.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
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

export default Categorias;
