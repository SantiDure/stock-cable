import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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
  const nuevoItem = {
    imagen: img,
    cantidad: cantidad,
    categoria: categoria,
    tipo: tipo,
  };

  const handleAddItem = () => {
    if (!cantidad || !categoria || !tipo) {
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
                <h4>${tipo}</h4>
                Cantidad: ${cantidad}
                `,
          icon: "success",
        })
      );
    }
  };

  const elegirImagen = (tipo) => {
    switch (tipo) {
      case "RG6":
        setImg(rg6);
        break;
      case "RG11":
        setImg(rg11);
        break;
      case "RG59":
        setImg(rg59);
        break;
      case "Conector mecánico FO":
        setImg(conectorFo);
        break;
      case "Rj45":
        setImg(rj45);
        break;
      case "Divisor x2":
        setImg(divisorX2);
        break;
      case "Divisor x3":
        setImg(divisorX3);
        break;
      case "Divisor x4":
        setImg(divisorX4);
        break;
      case "Split satelital":
        setImg(splitSatelital);
        break;
      case "Patch Cord":
        setImg(patchCord);
        break;
      case "Split x2 FO":
        setImg(splitX2Fo);
        break;
      case "Split x4 FO":
        setImg(splitX4Fo);
        break;
      case "Split x8 FO":
        setImg(splitX8Fo);
        break;
      case "Cable Ethernet":
        setImg(ethernet);
        break;
      default:
        setImg(noDisponible);
    }
  };

  return (
    <form>
      <fieldset>
        <div className="mb-3">
          <label htmlFor="disabledSelect" className="form-label">
            Tipo
          </label>
          <select
            id="disabledSelect"
            className="form-select"
            onChange={(e) => {
              e.preventDefault();
              setTipo(e.target.value);
              elegirImagen(e.target.value);
            }}
          >
            <option>-</option>
            <option>RG6</option>
            <option>RG59</option>
            <option>RG11</option>
            <option>Conector mecánico FO</option>
            <option>Patch Cord</option>
            <option>Split x2 FO</option>
            <option>Split x8 FO</option>
            <option>Rj45</option>
            <option>Divisor x2</option>
            <option>Divisor x3</option>
            <option>Divisor x4</option>
            <option>Split satelital</option>
          </select>
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
            <option>Divisores RG6</option>
            <option>Conectores</option>
            <option>Fibra Optica</option>
            <option>Satelital</option>
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
