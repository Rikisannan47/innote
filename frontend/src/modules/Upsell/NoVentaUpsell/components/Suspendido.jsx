import { useState } from "react";

const Suspendido = ({ onGenerar }) => {

    // ===============================
    // ==== ESTADOS DEL FORMULARIO ===
    // ===============================

    const [ofrecimiento, setOfrecimiento] = useState("");
    const [asesor, setAsesor] = useState("");

    // ===============================
    // ===== FUNCIÓN GENERAR NOTA ====
    // ===============================

    const generarNota = () => {

        // Validación
        if (!ofrecimiento || !asesor.trim()) {
            alert("Complete todos los campos obligatorios ⚠️");
            return;
        }

        // Nota CRM
        let nota = `- Suspendido.
Cliente en estado SUSPENDIDO, para ofrecimiento Upsell Móvil: ${ofrecimiento}.
// ${asesor} /INSIGHT Pereira/ grupo especializado Upsell/ 00811`;

        onGenerar(nota);
    };

    return (
        <div style={{ marginTop: "20px" }}>

            {/* Ofrecimiento */}
            <label>Ofrecimiento:</label>
            <select
                value={ofrecimiento}
                onChange={(e) => setOfrecimiento(e.target.value)}
                style={inputStyle}
            >
                <option value="">Seleccione...</option>
                <option value="CELU-PROTECCION">CELU-PROTECCIÓN</option>
                <option value="FIJO">FIJO</option>
                <option value="MOVIL">MÓVIL</option>
            </select>

            {/* Asesor */}
            <label>Nombre del asesor:</label>
            <input
                type="text"
                value={asesor}
                onChange={(e) => setAsesor(e.target.value)}
                style={inputStyle}
            />

            {/* Botón */}
            <button
                onClick={generarNota}
                style={{
                    width: "100%",
                    background: "#39B54A",
                    color: "#fff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Generar nota
            </button>

        </div>
    );
};

// ===============================
// ===== ESTILO REUTILIZABLE =====
// ===============================

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "Century Gothic, Arial"
};

export default Suspendido;