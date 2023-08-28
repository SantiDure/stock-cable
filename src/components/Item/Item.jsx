import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import FormularioEditarItem from "../FormularioEditarItem/FormularioEditarItem";

import "./Item.css";
function Item({ id, elemento, tipo, cantidad, categoria, img }) {
  const [edit, setEdit] = useState(false);

  const handleEditItem = () => {
    setEdit(true);
  };
  return (
    <>
      <div key={id} className="card mb-3 card__container">
        <div className="row g-0 text__container">
          <div className="col-md-2 item__img__container">
            <img
              src={img}
              id="img__item"
              className="img-fluid rounded-start"
              alt={elemento}
            />
          </div>
          <div className="col-md-10 card__content">
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
