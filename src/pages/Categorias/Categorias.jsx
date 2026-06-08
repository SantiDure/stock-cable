import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Item from "../../components/Item/Item";
import "../../styles/forms.css";

function Categorias() {
  const { categoria } = useParams();
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const itemCollectionRef = collection(db, "stock");

  useEffect(() => {
    getDocs(itemCollectionRef)
      .then((response) => {
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStock(filteredData);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredItems = stock.filter((item) => item.categoria === categoria);

  if (loading) {
    return (
      <div className="home__loading" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "80px 24px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
        <div style={{ width: 18, height: 18, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        Cargando...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 64px" }}>
      <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 16 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Volver
        </Link>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 4 }}>
          {categoria}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
          No hay items en esta categoría.
        </div>
      ) : (
        filteredItems.map((item) => (
          <Item
            key={item.id}
            img={item.imagen}
            id={item.id}
            elemento={item.elemento}
            tipo={item.tipo}
            cantidad={item.cantidad}
            categoria={item.categoria}
          />
        ))
      )}
    </div>
  );
}

export default Categorias;
