import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import FormularioEditarItem from "../FormularioEditarItem/FormularioEditarItem";
function Item({ id, elemento, tipo, cantidad, categoria }) {
  const [edit, setEdit] = useState(false);

  const handleEditItem = () => {
    setEdit(true);
  };
  return (
    <>
      <div key={id} className="card card-container">
        {/* informacion del item */}
        <p className="card'text">Elemento: {elemento}</p>
        <p className="card'text">Tipo: {tipo}</p>
        <p className="card'text">Cantidad: {cantidad}</p>
        <p className="card'text">Categoria: {categoria} </p>

        {/* botones */}

        <button
          className="btn btn-danger"
          onClick={() => deleteDoc(doc(db, "stock", id))}
        >
          eliminar
        </button>
      </div>
      <div>
        {edit ? (
          <FormularioEditarItem id={id} edit={edit} setEdit={setEdit} />
        ) : (
          <button className="btn btn-primary" onClick={handleEditItem}>
            editar
          </button>
        )}
      </div>
    </>
  );
}

export default Item;
