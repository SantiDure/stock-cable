import { createContext, useContext } from "react";

export const ItemContext = createContext(" ");

export const UseItemContext = () => useContext(ItemContext);

export const ItemProvider = ({ children }) => {
  function addItem() {
    return "agregado";
  }
  function removeItem() {
    return "eliminado";
  }
  function editItem() {
    return "editado";
  }

  return (
    <ItemContext.Provider
      value={{
        addItem,
        removeItem,
        editItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
