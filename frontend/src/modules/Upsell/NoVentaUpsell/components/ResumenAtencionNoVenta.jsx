import { useState } from "react";

const ResumenAtencionNoVenta = ({ onGenerar}) => {

    // Aca van los estados
    const [nombreCliente, setNombreCliente] = useState("");
    const [ofertaDetalle, setOfertaDetalle] = useState("");
    const [resolucion, setResolucion] = useState("");
    const [asesor, setAsesor] = useState("");

    //Generar Nota

    const generarNota = () => {

        if (
            !nombreCliente.trim() ||
            !ofertaDetalle.trim() ||
            !resolucion.trim() ||
            !asesor.trim()
        ) {
            alert("Complete todos los campos obligatorios ⚠️");
            return;
        }

        let nota = `Resumen atención

Atendió la llamada ${nombreCliente}, acepta acceso en la cuenta, se brinda mejora (${ofertaDetalle}), resolución de oferta (${resolucion}). Se realiza oferta cruzada, descripción final de la llamada: ${asesor}, grupo especializado 00811 / 71136 INSIGHT.`;

        onGenerar(nota);
    };

    return (
        <div style={{ marginTop: "20px"}}>
            <label>Nombre del cliente:</label>
            <input
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                style={inputStyle}
            />

            <label>Oferta realizada (detalle):</label>
                <textarea
                        value={ofertaDetalle}
                        onChange={(e) => setOfertaDetalle(e.target.value)}
                        rows={3}
                        style={{ 
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            marginBottom: "20px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontFamily: "Century Gothic, Arial",
                            resize: "none"
                        }}
                    />
                
            <label>Resolución de la oferta:</label>

            <textarea
                value={resolucion}
                        onChange={(e) => setResolucion(e.target.value)}
                        rows={3}
                        style={{ 
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            marginBottom: "20px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontFamily: "Century Gothic, Arial",
                            resize: "none"
                        }}
            />

            <label>Nombre del asesor:</label>
            <input
                value={asesor}
                onChange={(e) => setAsesor(e.target.value)}
                style={inputStyle}
            />

            <button onClick={generarNota} style={btnStyle}>
                Generar nota
            </button>



        </div>
    );

};

// ===== ESTILOS =================

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "Century Gothic, Arial"
};

const textareaStyle = {
    ...inputStyle,
    resize: "none"
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

export default ResumenAtencionNoVenta;