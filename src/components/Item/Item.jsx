import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import FormularioEditarItem from "../FormularioEditarItem/FormularioEditarItem";
import img from "../assets/no-disponible.jpeg";
import "./Item.css";
function Item({ id, elemento, tipo, cantidad, categoria }) {
  const [edit, setEdit] = useState(false);

  const handleEditItem = () => {
    setEdit(true);
  };
  return (
    <>
      <div key={id} className="card mb-3">
        <div className="row g-0 text__container">
          <div className="col-md-2">
            <img src={img} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-10 card__container">
            <div className="card-body">
              <h5 className="card-title">{elemento}</h5>
              <p className="card-text">{tipo}</p>
              <p className="card-text">Cantidad: {cantidad}</p>
            </div>
            <div className="btn__container">
              <div>
                {edit ? (
                  <FormularioEditarItem id={id} edit={edit} setEdit={setEdit} />
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleEditItem}
                  >
                    ✏
                  </button>
                )}
              </div>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteDoc(doc(db, "stock", id))}
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
