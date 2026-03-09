import { useState } from "react";

const Despacho = ({ onGenerar }) => {
  const [cliente, setCliente] = useState("");
  const [autorizado, setAutorizado] = useState("");
  const [relacion, setRelacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [referencia, setReferencia] = useState("");
  const [ordenWim, setOrdenWim] = useState("");
  const [contactos, setContactos] = useState("");
  const [canal, setCanal] = useState ("");

  const inputStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    };

  const handleGenerar = () => {

     if (
    !cliente ||
    !direccion ||
    !ciudad ||
    !ordenWim ||
    !contactos ||
    !canal
  ) {
    alert("Completa todos los campos obligatorios");
    return;
  }

    const nota = `DESPACHO

• CLIENTE: ${cliente}
• AUTORIZADO: ${autorizado}
• RELACIÓN: ${relacion}
• DIRECCIÓN FÍSICA: ${direccion}
• CIUDAD: ${ciudad}
• REFERENCIA: ${referencia}
• NUMERO ORDEN WIM: ${ordenWim}
• NUMERO DE CONTACTOS: ${contactos}

***** CANAL(${canal})*****`;

    onGenerar(nota);
  };

  return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "15px",
        }}>

      <h2>DESPACHO:</h2>

      <input placeholder="CLIENTE" value={cliente} onChange={(e) => setCliente(e.target.value)} style={inputStyle}/>
      <input placeholder="AUTORIZADO" value={autorizado} onChange={(e) => setAutorizado(e.target.value)} style={inputStyle}/>
      <input placeholder="RELACIÓN" value={relacion} onChange={(e) => setRelacion(e.target.value)} style={inputStyle}/>
      <input placeholder="DIRECCIÓN FÍSICA" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={inputStyle}/>
      <input placeholder="CIUDAD" value={ciudad} onChange={(e) => setCiudad(e.target.value)} style={inputStyle}/>
      <input placeholder="REFERENCIA" value={referencia} onChange={(e) => setReferencia(e.target.value)} style={inputStyle}/>
      <input placeholder="NUMERO ORDEN WIM" value={ordenWim} onChange={(e) => setOrdenWim(e.target.value)} style={inputStyle}/>
      <input placeholder="NUMERO DE CONTACTOS" value={contactos} onChange={(e) => setContactos(e.target.value)} style={inputStyle}/>

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

      <button 
        style={{
                    marginTop:"10px",
                    background: "#39B54A",
                    color: "#fff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
        onClick={handleGenerar}>Generar Nota</button>
    </div>
  );
};

export default Despacho;