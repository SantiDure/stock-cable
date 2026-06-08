import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

function FormularioEditarItem({ id, setEdit }) {
  const [newCantidad, setNewCantidad] = useState("");
  const [loading, setLoading] = useState(true);
  const itemCollectionRef = collection(db, "stock");

  const getData = () => {
    getDocs(itemCollectionRef)
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  };

  const handleUpdateItem = () => {
    if (!newCantidad) {
      Swal.fire({
        title: "Ingresá una cantidad",
        icon: "error",
        background: "#181c27",
        color: "#e8eaf0",
        confirmButtonColor: "#4f8ef7",
      });
    } else {
      updateDoc(doc(db, "stock", id), { cantidad: newCantidad });
      Swal.fire({
        title: "Item actualizado",
        icon: "success",
        background: "#181c27",
        color: "#e8eaf0",
        confirmButtonColor: "#4f8ef7",
      });
      getData();
      setEdit(false);
    }
  };

  useEffect(() => getData(), []);

  return (
    <div className="item__edit-inner">
      <span className="edit-label">Nueva cantidad:</span>
      <input
        type="number"
        className="form-control"
        placeholder="Ej. 10"
        onChange={(e) => setNewCantidad(e.target.value)}
      />
      <button
        className="btn-primary-custom"
        style={{ flex: "none", padding: "7px 14px", fontSize: "13px" }}
        onClick={handleUpdateItem}
      >
        Confirmar
      </button>
      <button
        onClick={() => setEdit(false)}
        style={{
          padding: "7px 12px",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: "13px",
          fontFamily: "var(--font-body)",
          transition: "all 0.2s"
        }}
      >
        Cancelar
      </button>
    </div>
  );
}

export default FormularioEditarItem;
