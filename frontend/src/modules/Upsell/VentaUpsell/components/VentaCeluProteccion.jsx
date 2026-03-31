import { useState } from "react";
import CampoMoneda from "../../NoVentaMasivo/CampoMoneda";

const VentaCeluProteccion = ({ onGenerar}) => {
    
    //Estados

    const [titular, setTitular] = useState("");
    const [linea, setLinea] = useState("");
    const [ban, setBan] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [precio, setPrecio] = useState("");
    const [reclamaciones, setReclamaciones] = useState("");
    const [asesor, setAsesor] = useState("");

    // Generar nota

    const generarNota = () => {

        if (
            !titular.trim() || !linea || !ban || !nombreCliente.trim() || !precio || !reclamaciones || !asesor.trim()
        ) {
            alert("Complete todos los campos obligatorios ⚠️");
            return;
        }
    
    
    if (!/^\d{10}$/.test(linea)) {
            alert("La línea debe tener 10 dígitos ⚠️");
            return;
        }

        if (!/^\d{1,9}$/.test(ban)) {
            alert("El BAN debe tener máximo 9 dígitos ⚠️");
            return;
        }

        let nota = `CELU-PROTECCION

Motivo: OFRECIMIENTO CELU-PROTECCION

Titular: ${titular}
LINEA: ${linea}
BAN: ${ban}

Se genera contacto con el cliente Titular (${nombreCliente}), para realizar activación de claro protección por valor ($${precio}) + IVU mensual, cliente acepta, se indica que cubre daños, robo o perdida del equipo móvil que acaba de adquirir, cuenta con ${reclamaciones} reclamaciones en un periodo de 12 meses consecutivos, activación en las prox 24 horas, en caso de requerirlo, prorrateo en próxima factura.

**insight00811** //// ${asesor} 71136 INSIGHT // Pereira`;

        onGenerar(nota);

};

return (
    <div style={{ marginTop: "20px"}}>
        <label>Titular:</label>
            <input value={titular} onChange={(e) => setTitular(e.target.value)} style={inputStyle} />

            <label>Línea:</label>
            <input
                type="text"
                inputMode="numeric"
                value={linea}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setLinea(val);
                }}
                style={inputStyle}
            />

            <label>BAN:</label>
            <input
                type="text"
                inputMode="numeric"
                value={ban}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 9) setBan(val);
                }}
                style={inputStyle}
            />

            <label>Nombre del cliente:</label>
            <input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} style={inputStyle} />

            <CampoMoneda label="Precio ($)" value={precio} setValue={setPrecio} />

            <label>Reclamaciones (12 meses):</label>
            <select
                value={reclamaciones}
                onChange={(e) => setReclamaciones(e.target.value)}
                style={inputStyle}
            >
                <option value="">Seleccione...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>

            <label>Nombre del asesor:</label>
            <input value={asesor} onChange={(e) => setAsesor(e.target.value)} style={inputStyle} />

            <button onClick={generarNota} style={btnStyle}>
                Generar nota
            </button>
    </div>
);
};

//Estilos

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "Century Gothic, Arial"
};

const btnStyle = {
    width: "100%",
    background: "#39B54A",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

export default VentaCeluProteccion;