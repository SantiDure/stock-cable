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
  const [img, setImg] = useState();
  const nuevoItem = {
    imagen: img,
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

  let UrlImagenDrive = "https://drive.google.com/uc?export=download&id=";
  const elegirImagen = (tipo) => {
    switch (tipo) {
      case "RG6":
        setImg(`${UrlImagenDrive}1-9qbC3uXbZDr8abyAwZVPi3hpSnpDL4s`);
        break;
      case "RG11":
        setImg(`${UrlImagenDrive}18Ds008liIayQVJslVd2P8Xq3zSmxtsmc`);
        break;
      case "RG59":
        setImg(`${UrlImagenDrive}18lG9-7oD0EABqHXsaKjF1ptZWdBjEneY`);
        break;
      case "Conector mecánico FO":
        setImg(`${UrlImagenDrive}1Vu5qDlvqrizaso4rkd0c1n7_hggpkoTQ`);
        break;
      case "Rj45":
        setImg(`${UrlImagenDrive}1yyqXCWqjLx0TbBis1ElKa5OalQExXKss`);
        break;
      case "Divisor x2":
        setImg(`${UrlImagenDrive}1y_MkAD34aTjRsXZ9dguUP7ZOLX79jswy`);
        break;
      case "Divisor x3":
        setImg(`${UrlImagenDrive}1lafMgACwZAuhB2ooAg8hxdJlaxyWi5CX`);
        break;
      case "Divisor x4":
        setImg(`${UrlImagenDrive}1-sx3T3beXs5buVbaNN5MqJQMrDm49W9w`);
        break;
      case "Split satelital":
        setImg(`${UrlImagenDrive}1LuOIQitfB6wFDrSrBdFQ1F6cQTbPL64C`);
        break;
      case "Patch Cord":
        setImg(`${UrlImagenDrive}1GR9rz3dY_EkHuxIkNkKHFCVZhgyRl0Lr`);
        break;
      case "Split x2 FO":
        setImg(`${UrlImagenDrive}1nhR8REvEZ8VxecPiz75zWntKiVj4SD9u`);
        break;
      case "Split x8 FO":
        setImg(`${UrlImagenDrive}1Ei8kIOifWXpqClqNfEG2XKbc13HkfT_g`);
        break;
      case "Cable Ethernet":
        setImg(`${UrlImagenDrive}1qvc9X5-jhdh2fZ7KOXLmlL2jELy9Gs_G`);
        break;
      default:
        setImg(`${UrlImagenDrive}1JKb7OiFnyx30ah7cwiUBA_uEd5_8p5T-`);
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
