import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";

import { db } from "../../config/firebase";
function FormularioEditarItem({ id, edit, setEdit }) {
  const [newCantidad, setNewCantidad] = useState();

  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const itemCollectionRef = collection(db, "stock");
  
  const getData=()=>{
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
      })
      
  }

  const handleUpdateItem = () => {
    if (!newCantidad) {
      Swal.fire({
        title: "Rellena todos los campos para editar un item",
        icon: "error",
      });
    } else {

      updateDoc(doc(db, "stock", id), {
        cantidad: newCantidad
      });
      Swal.fire({
        title: "Item actualizado",
        icon: "info",
      });
      setEdit(false);
     
      
    }
  };

useEffect(()=>getData(),[edit])

  return (
    <>
      <div>
        <form>
          <fieldset>
           
            <div className="mb-3">
              <label htmlFor="disabledTextInput" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                id="disabledTextInput"
                className="form-control"
                placeholder="Ej. 4"
                onChange={(e) => {
                  e.preventDefault();
                  setNewCantidad(e.target.value);
                }}
              />
            </div>
            
          </fieldset>
        </form>
        <button className="btn btn-primary" onClick={handleUpdateItem}>
          Confirmar
        </button>
        <button className="btn btn-danger" onClick={() => setEdit(false)}>
          Cancelar
        </button>
      </div>
    </>
  );
}

export default FormularioEditarItem;
