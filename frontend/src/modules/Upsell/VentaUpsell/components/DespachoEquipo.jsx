import { useState } from "react";

const DespachoEquipo = ({ onGenerar }) => {

    // =========================
    // ESTADOS
    // =========================
    const [cliente, setCliente] = useState("");
    const [personaAut, setPersonaAut] = useState("");
    const [relacion, setRelacion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [pueblo, setPueblo] = useState("");
    const [contactos, setContactos] = useState("");
    const [referencia, setReferencia] = useState("");

    // =========================
    // ESTILO INPUT (mismo global)
    // =========================
    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

    // =========================
    // GENERAR NOTA
    // =========================
    const generar = () => {

        if (
            !cliente ||
            !personaAut ||
            !relacion ||
            !direccion ||
            !pueblo ||
            !contactos ||
            !referencia
        ) {
            alert("Completa todos los campos");
            return;
        }

        const nota = `CLIENTE: ${cliente}
PERSONA AUT.: ${personaAut}
RELACIÓN: ${relacion}
DIRECCIÓN FÍSICA: ${direccion}
PUEBLO: ${pueblo}
NÚMEROS DE CONTACTOS: ${contactos}
REFERENCIA: ${referencia}

775TEL*** 00811`;

        onGenerar(nota);
    };

    // =========================
    // UI
    // =========================
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <label>Cliente:</label>
            <input value={cliente} onChange={e => setCliente(e.target.value)} style={estiloInput} />

            <label>Persona autorizada:</label>
            <input value={personaAut} onChange={e => setPersonaAut(e.target.value)} style={estiloInput} />

            <label>Relación:</label>
            <input value={relacion} onChange={e => setRelacion(e.target.value)} style={estiloInput} />

            <label>Dirección física:</label>
            <input value={direccion} onChange={e => setDireccion(e.target.value)} style={estiloInput} />

            <label>Pueblo:</label>
            <input value={pueblo} onChange={e => setPueblo(e.target.value)} style={estiloInput} />

            <label>Números de contactos:</label>
            <input value={contactos} onChange={e => setContactos(e.target.value)} style={estiloInput} />

            <label>Referencia:</label>
            <textarea
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
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

            <button
                onClick={generar}
                style={{
                    background: "#39B54A",
                    color: "#fff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Generar nota
            </button>

        </div>
    );
};

export default DespachoEquipo;