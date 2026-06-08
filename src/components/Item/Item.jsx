import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import FormularioEditarItem from "../FormularioEditarItem/FormularioEditarItem";
import "./Item.css";

function Item({ id, elemento, tipo, cantidad, categoria, img }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="item__card">
      <div className="item__inner">
        {/* Imagen */}
        <div className="item__img-wrapper">
          <img
            src={img}
            className="item__img"
            alt={tipo}
          />
        </div>

        {/* Info */}
        <div className="item__body">
          <div className="item__tipo">{tipo || elemento}</div>
          <div className="item__meta">
            <span className="item__badge item__badge--cantidad">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              {cantidad} uds.
            </span>
            {categoria && (
              <span className="item__badge item__badge--categoria">
                {categoria}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="item__actions">
          {!edit && (
            <>
              <button
                className="btn__icon btn__icon--edit"
                title="Editar"
                onClick={() => setEdit(true)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button
                className="btn__icon btn__icon--delete"
                title="Eliminar"
                onClick={() => deleteDoc(doc(db, "stock", id))}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/>
                  <path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Edit form */}
      {edit && (
        <div className="item__edit-form">
          <FormularioEditarItem id={id} edit={edit} setEdit={setEdit} />
        </div>
      )}
    </div>
  );
}

export default Item;
