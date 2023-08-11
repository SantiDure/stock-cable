import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function FormularioNuevoItem() {
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [elemento, setElemento] = useState("");
  const [tipo, setTipo] = useState("");

  const nuevoItem = {
    cantidad: cantidad,
    categoria: categoria,
    elemento: elemento,
    tipo: tipo,
  };

  const handleAddItem = () => {
    if (!cantidad || !categoria || !elemento || !tipo) {
      Swal.fire({
        title: "error al agregar producto",
        text: "completa todos los campos para agregar un item",
        icon: "error",
      });
    } else {
      const stockCollectionRef = collection(db, "stock");
      addDoc(stockCollectionRef, nuevoItem).then(({ id }) =>
        Swal.fire({
          title: `Añadiste un item a la lista`,
          html: `
                <h4>${elemento}</h4>
                Tipo: ${tipo}<br>
                Cantidad: ${cantidad}
                `,
          icon: "success",
        })
      );
    }
  };

  return (
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
              setElemento(e.target.value);
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
              setTipo(e.target.value);
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
              setCantidad(e.target.value);
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
              setCategoria(e.target.value);
            }}
          >
            <option>-</option>
            <option>divisores</option>
            <option>conectores</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddItem}
        >
          Añadir item
        </button>
        <Link to={"/"}>
          <button className="btn btn-secondary">Volver</button>
        </Link>
      </fieldset>
    </form>
  );
}

export default FormularioNuevoItem;
