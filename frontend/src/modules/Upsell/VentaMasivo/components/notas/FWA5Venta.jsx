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

const FWA5GVenta = ({ onGenerar }) => {

  const [canal, setCanal] = useState("");
  const [ban, setBan] = useState("");
  const [titular, setTitular] = useState("");
  const [termino, setTermino] = useState("24 meses");
  const [pricingCode, setPricingCode] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [convergente, setConvergente] = useState("No");
  const [velocidad, setVelocidad] = useState("");
  const [unidad, setUnidad] = useState("MB");
  const [codigoPlan, setCodigoPlan] = useState("");
  const [precioPlan, setPrecioPlan] = useState("");
  const [canalInsight, setCanalInsight] = useState ("");
  

  const handleGenerar = () => {

    if (
    !canal ||
    !ban ||
    !titular ||
    !termino ||
    !pricingCode ||
    !itemCode ||
    !velocidad ||
    !codigoPlan ||
    !precioPlan ||
    !canal
  ) {
    
    alert("Completa todos los campos obligatorios");
    return;
  }

    const nota = `Cliente acepta servicio FWA 5G:

• Canal de Ventas: ${canal}
• BAN: ${ban}
• Nombre del titular: ${titular}
• Término de contrato: ${termino}
• Pricing Code: ${pricingCode}

Cargo de Activación - ACT5G2

• Convergente: ${convergente}
• Velocidad seleccionada: ${velocidad} ${unidad}
• Código del Plan: ${codigoPlan}
• Precio del Plan: $${precioPlan}

Términos y Condiciones:
En este servicio, el equipo está diseñado para utilizarse únicamente en la residencia del cliente. El equipo requiere instalación, por lo que su servicio no estará disponible hasta que el Instalador la complete. Dentro de las próximas 48 horas, recibirá una llamada para coordinar su cita de instalación del equipo. El día de su cita, el Instalador realizará la prueba de cobertura y procederá con la instalación de la antena y equipos relacionados. Restricciones geográficas podrán afectar el servicio. Los equipos requieren conexión eléctrica para funcionar. Una vez instalados comenzará su contrato y garantía. Podrá recibir cargos fraccionados en su primera factura. 14 días para cambio o devolución. Cancelación luego de los 14 días conlleva cargo de $150.00 por cancelación temprana. Garantía del Aurus AI-CFW-2591-CPE y POE 2 años. Nokia Beacon 1 año con Claro.

***** CANAL(${canal})*****`;

    onGenerar(nota);
  };

  return (
    <div style={containerStyle}>
      <h3>FWA 5G</h3>

      <label>Canal de Ventas:</label>
      <input value={canal} onChange={(e)=>setCanal(e.target.value)} style={inputStyle} />

      <label>BAN:</label>
            <input
                type="text"
                inputMode="numeric"
                value={ban}
                onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, '');
                    setBan(soloDigitos.slice(0, 9));
                }}
                style={inputStyle}
            />

      <label>Nombre del titular:</label>
      <input value={titular} onChange={(e)=>setTitular(e.target.value)} style={inputStyle} />

      <label>Término de contrato:</label>
      <input value={termino} onChange={(e)=>setTermino(e.target.value)} style={inputStyle} />

      <label>Pricing Code:</label>
      <select value={pricingCode} onChange={(e)=>setPricingCode(e.target.value)} style={inputStyle}>
        <option value="">Seleccione Plan</option>
        <option value="Plan $39.99 - H2MA39A">Plan $39.99 - H2MA39A</option>
        <option value="Plan $49.99 - H2MA49A">Plan $49.99 - H2MA49A</option>
        <option value="Plan $64.99 - H2MA64A">Plan $64.99 - H2MA64A</option>
      </select>

      <label>Item Code:</label>
      <select value={itemCode} onChange={(e)=>setItemCode(e.target.value)} style={inputStyle}>
        <option value="">Seleccione Plan</option>
        <option value="32134H Aurus AI-CFW 2591-CPE">32134H Aurus AI-CFW 2591-CPE</option>
        <option value="30591H SIM TRIO LTE IMEI LOCK">30591H SIM TRIO LTE IMEI LOCK</option>
        <option value="32135H POE FOR AURUS AI">32135H POE FOR AURUS AI</option>
        <option value="32136H J-ARM TO HOLD AURUS AI">32136H J-ARM TO HOLD AURUS AI</option>
        <option value="80067H NOKIA BEACON 1.1">80067H NOKIA BEACON 1.1</option>
      </select>

      <label>Convergente:</label>
      <select value={convergente} onChange={(e)=>setConvergente(e.target.value)} style={inputStyle}>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      <label>Velocidad:</label>
      <div style={{ display:"flex", gap:"10px" }}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={velocidad}
          onChange={(e)=>{
            const solo = e.target.value.replace(/\D/g,'');
            if(solo.length>3) return;
            setVelocidad(solo);
          }}
          style={{...inputStyle, flex:1}}
        />
        <select value={unidad} onChange={(e)=>setUnidad(e.target.value)} style={{...inputStyle,width:"100px"}}>
          <option value="MB">MB</option>
          <option value="GB">GB</option>
        </select>
      </div>

      <label>Código del Plan:</label>
      <input value={codigoPlan} onChange={(e)=>setCodigoPlan(e.target.value)} style={inputStyle} />

      <label>Precio del Plan:</label>
      <CampoMoneda value={precioPlan} setValue={setPrecioPlan} />

      <label>Canal:</label>
                <select
                    value={canalInsight}
                    onChange={(e) => setCanalInsight(e.target.value)}
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

export default FWA5GVenta;