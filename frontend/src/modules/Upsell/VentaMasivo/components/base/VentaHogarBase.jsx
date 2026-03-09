import { useState } from "react";

const containerStyle = {
  padding: "20px",
  maxWidth: "600px",
  margin: "auto",
  fontFamily: "Century Gothic"
};

const textareaStyle = {
  width: "100%",
  minHeight: "150px",
  marginTop: "20px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer"
};

const VentaHogarBase = ({ Componente }) => {
  const [nota, setNota] = useState("");

  const copiarNota = () => {
    navigator.clipboard.writeText(nota);
    alert("Nota copiada");
  };

  return (
    <div style={containerStyle}>
      <Componente onGenerar={setNota} />

      <textarea
        value={nota}
        readOnly
        style={textareaStyle}
      />

      {nota && (
        <button style={buttonStyle} onClick={copiarNota}>
          Copiar Nota
        </button>
      )}
    </div>
  );
};

export default VentaHogarBase;