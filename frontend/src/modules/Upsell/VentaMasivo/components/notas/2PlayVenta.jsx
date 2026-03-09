import { useState } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%"
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "15px",
  fontFamily: "Century Gothic"
};

const buttonStyle = {
  marginTop: "15px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#39B54A",
  color: "#fff",
  cursor: "pointer"
};

const DoblePlayVenta = ({ onGenerar }) => {
  const [plan, setPlan] = useState("");
  const [precio, setPrecio] = useState("");
  const [prorrateo, setProrrateo] = useState("");
  const [canal, setCanal] = useState ("");

  const handleGenerar = () => {

    if (!plan || !precio || !prorrateo || !canal) {
    alert("Completa todos los campos obligatorios");
    return;
  }
  
    const nota = `Usted acepto servicio DOBLE PLAY ${plan} + tel ilimi USA/PR POR $${precio} + ivu, el contrato es contrato 24 meses, el cargo por cancelación es de $150, en caso de cancelación temprana pagaría los meses restantes del acuerdo de $6.25 por cada mes restante, en caso de no devolución del módem conllevaría a penalidad de $100 dólares y por entrega de modem incompleto $35. En la primera factura tendrá cargos de prorrateo Aproximado de $${prorrateo} y un posible depósito de 20 dólares, la instalación será de 5 a 7 días laborables por un técnico.   
***** CANAL(${canal})****`;

    onGenerar(nota);
  };

  return (
    <div style={containerStyle}>
      <h3>Doble Play</h3>

      <label>Plan:</label>
      <input
        placeholder="Ej: 200MB + TV"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        style={inputStyle}
      />

      <label>Precio:</label>
      <CampoMoneda
        value={precio}
        setValue={setPrecio}
      />

      <label>Prorrateo Aproximado:</label>
      <CampoMoneda
        value={prorrateo}
        setValue={setProrrateo}
      />

      <label>Canal:</label>
                <select
                    placeholder="Seleccione canal..."
                    value={canal}
                    onChange={(e) => setCanal(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="80925">80925</option>
                    <option value="60083">60083</option>
                    <option value="60123">60123</option>
                </select>

      <button style={buttonStyle} onClick={handleGenerar}>
        Generar Nota
      </button>
    </div>
  );
};

export default DoblePlayVenta;