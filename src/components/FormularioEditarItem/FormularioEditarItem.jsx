import { useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
function FormularioEditarItem({ id, edit, setEdit }) {
  const [newCantidad, setNewCantidad] = useState();

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
