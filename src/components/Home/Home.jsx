import { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
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
      <Link to={"nuevo-item"}>
        <button className="btn btn-success">Agregar item</button>
      </Link>
      <br></br>
      <div>
        {stock.map((item) => {
          return (
            <div key={item.id} className="card card-container">
              <p className="card'text">Categoria: {item.categoria} </p>
              <p className="card'text">Elemento: {item.elemento}</p>
              <p className="card'text">Tipo: {item.tipo}</p>
              <p className="card'text">Cantidad: {item.cantidad}</p>
              <button className="btn btn-primary">editar</button>
              <br></br>
              <button
                className="btn btn-danger"
                onClick={() => deleteDoc(doc(db, "stock", item.id))}
              >
                eliminar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
