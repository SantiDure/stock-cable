import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/forms.css";

import conectorFo from "../../img/conectorFo.webp";
import divisorX2 from "../../img/divisorX2.webp";
import divisorX3 from "../../img/divisorX3.webp";
import divisorX4 from "../../img/divisorX4.webp";
import ethernet from "../../img/ethernet.webp";
import noDisponible from "../../img/no-disponible.jpeg";
import patchCord from "../../img/patchCord.webp";
import rg6 from "../../img/rg6.webp";
import rg11 from "../../img/rg11.webp";
import rg59 from "../../img/rg59.webp";
import rj45 from "../../img/rj45.webp";
import splitSatelital from "../../img/split-satelital.webp";
import splitX2Fo from "../../img/splitX2Fo.webp";
import splitX4Fo from "../../img/splitX4Fo.webp";
import splitX8Fo from "../../img/splitX8Fo.webp";

function FormularioNuevoItem() {
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [img, setImg] = useState();

  const elegirImagen = (tipo) => {
    const map = {
      "RG6": rg6, "RG11": rg11, "RG59": rg59,
      "Conector mecánico FO": conectorFo, "Rj45": rj45,
      "Divisor x2": divisorX2, "Divisor x3": divisorX3, "Divisor x4": divisorX4,
      "Split satelital": splitSatelital, "Patch Cord": patchCord,
      "Split x2 FO": splitX2Fo, "Split x4 FO": splitX4Fo, "Split x8 FO": splitX8Fo,
      "Cable Ethernet": ethernet,
    };
    setImg(map[tipo] || noDisponible);
  };

  const handleAddItem = () => {
    if (!cantidad || !categoria || !tipo) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Completá todos los campos para agregar un item.",
        icon: "error",
        background: "#181c27",
        color: "#e8eaf0",
        confirmButtonColor: "#4f8ef7",
      });
    } else {
      const stockCollectionRef = collection(db, "stock");
      addDoc(stockCollectionRef, { imagen: img, cantidad, categoria, tipo }).then(() =>
        Swal.fire({
          title: "Item agregado",
          html: `<b>${tipo}</b> — ${cantidad} unidades`,
          icon: "success",
          background: "#181c27",
          color: "#e8eaf0",
          confirmButtonColor: "#4f8ef7",
        })
      );
    }
  };

  return (
    <div className="form__page">
      <div className="form__header">
        <Link to="/" className="form__back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Volver al inicio
        </Link>
        <div className="form__title">Nuevo item</div>
        <div className="form__subtitle">Agregar producto al inventario</div>
      </div>

      <div className="form__card">
        <div className="form__group">
          <label className="form__label">Tipo de producto</label>
          <select
            className="form__control form-select"
            onChange={(e) => { setTipo(e.target.value); elegirImagen(e.target.value); }}
          >
            <option value="">Seleccioná un tipo…</option>
            <option>RG6</option>
            <option>RG59</option>
            <option>RG11</option>
            <option>Conector mecánico FO</option>
            <option>Patch Cord</option>
            <option>Split x2 FO</option>
            <option>Split x4 FO</option>
            <option>Split x8 FO</option>
            <option>Rj45</option>
            <option>Divisor x2</option>
            <option>Divisor x3</option>
            <option>Divisor x4</option>
            <option>Split satelital</option>
            <option>Cable Ethernet</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Cantidad</label>
          <input
            type="number"
            className="form__control form-control"
            placeholder="Ej. 4"
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Categoría</label>
          <select
            className="form__control form-select"
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccioná una categoría…</option>
            <option>Divisores RG6</option>
            <option>Conectores</option>
            <option>Fibra Optica</option>
            <option>Satelital</option>
          </select>
        </div>

        <div className="form__divider" />

        <div className="form__actions">
          <button className="btn-primary-custom" type="button" onClick={handleAddItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Añadir item
          </button>
          <Link to="/" className="btn-secondary-custom">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormularioNuevoItem;
