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
    color: "fff",
    cursor: "pointer"
};

const ClaroTVNowVenta = ({ onGenerar }) => {

  const [dataIlimitada, setDataIlimitada] = useState("");
  const [hotspot, setHotspot] = useState("");
  const [unidadHotspot, setUnidadHotspot] = useState("GB");
  const [precio, setPrecio] = useState("");
  const [canal, setCanal] = useState ("");

  const handleGenerar = () => {

    if (!dataIlimitada || !hotspot || !precio || !canal) {
    alert("Completa todos los campos obligatorios");
    return;
    }

    const nota = `Usted acepto servicio Claro TV NOW con 28 Canales, Llamadas ilimitadas en Puerto Rico, USA, México y Canadá, Larga Distancia ilimitada a USA, México y Canadá, SMS/MMS ilimitado, SMS y MMS roaming ilimitado en USA, México y Canadá, data ilimitada ${dataIlimitada} y Hotspot de ${hotspot} ${unidadHotspot}, por un costo mensual de $${precio}. 

Al correo electrónico le llegará el link de Claro TV NOW para iniciar sesión y debe descargar la APP de Claro TV+ en su dispositivo móvil. Servicio de Claro TV NOW NO FUNCIONA para Tablets, Módems con Banda Ancha/Internet on the Go, Computadoras ni Televisores Inteligentes. 

Se le recuerda que la activación de servicio no tiene contrato o acuerdo. En la primera factura podría tener cargos de prorrateo. 

Sí no activa su cuenta en el periodo de 24 a 48 horas luego de enviado el link a su correo debe comunicarse al grupo especializado de Claro TV+ al número 7875240113.

***** CANAL(${canal})*****`;

    onGenerar(nota);
  };

  return (
        <div style={containerStyle}>
      <h3>Claro TV+ NOW</h3>

      <label>Data Ilimitada:</label>
      <input
        value={dataIlimitada}
        onChange={(e) => setDataIlimitada(e.target.value)}
        style={inputStyle}
        placeholder="Ej: 50GB alta velocidad"
      />

      <label>Hotspot:</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={hotspot}
          onChange={(e) => {
            const solo = e.target.value.replace(/\D/g, "");
            if (solo.length > 3) return;
            setHotspot(solo);
          }}
          style={{ ...inputStyle, flex: 1 }}
        />
        <select
          value={unidadHotspot}
          onChange={(e) => setUnidadHotspot(e.target.value)}
          style={{ ...inputStyle, width: "100px" }}
        >
          <option value="MB">MB</option>
          <option value="GB">GB</option>
        </select>
      </div>

      <label>Precio Mensual:</label>
      <CampoMoneda value={precio} setValue={setPrecio} />

      <label>Canal:</label>
                <select
                    value={canal}
                    onChange={(e) => setCanal(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione canal...</option>
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

export default ClaroTVNowVenta;


