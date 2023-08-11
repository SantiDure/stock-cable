import { useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
function FormularioEditarItem({ id, edit, setEdit }) {
  const [newCantidad, setNewCantidad] = useState();
  const [newCategoria, setNewCategoria] = useState();
  const [newElemento, setNewElemento] = useState();
  const [newTipo, setNewTipo] = useState();
  const handleUpdateItem = () => {
    if (!newCantidad || !newCategoria || !newElemento || !newTipo) {
      Swal.fire({
        title: "Rellena todos los campos para editar un item",
        icon: "error",
      });
    } else {
      updateDoc(doc(db, "stock", id), {
        cantidad: newCantidad,
        categoria: newCategoria,
        elemento: newElemento,
        tipo: newTipo,
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
                Elemento
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                placeholder="Ej. Conector"
                onChange={(e) => {
                  e.preventDefault();
                  setNewElemento(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="disabledTextInput" className="form-label">
                Tipo
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                placeholder="Ej. Si se trata de un conector puede ser 'rg6'"
                onChange={(e) => {
                  e.preventDefault();
                  setNewTipo(e.target.value);
                }}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Categoria
              </label>
              <select
                id="disabledSelect"
                className="form-select"
                onChange={(e) => {
                  e.preventDefault();
                  setNewCategoria(e.target.value);
                }}
              >
                <option>-</option>
                <option>divisores</option>
                <option>conectores</option>
              </select>
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
