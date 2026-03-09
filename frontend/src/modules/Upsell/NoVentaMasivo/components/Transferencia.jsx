import {useState} from "react";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
};

function Transferencia ({ onGenerar}) {

    const [nombreContacto, setNombreContacto] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");
    const [motivoTransferencia, setMotivoTransferencia] = useState("");

    const generarNotaInterna = () => {

        if (
            !nombreContacto.trim() ||
            !tipoPersona ||
            !motivoTransferencia.trim() 
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const nota = `Se realiza transferencia de cliente ${nombreContacto} (${tipoPersona}), por motivo ${motivoTransferencia}, se transfiere cliente.`;
        onGenerar(nota);
    };

    return (
        <div
        style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "15px",
        fontFamily: "Century Gothic"
        }}
      >
            <label>Nombre Contacto:</label>
            <input
                type="text"
                value={nombreContacto}
                onChange={(e)=> setNombreContacto(e.target.value)}
                style={inputStyle}
            />

            <label>Tipo Persona:</label>
            <select
                value={tipoPersona}
                onChange={(e)=> setTipoPersona(e.target.value)}
                style={inputStyle}
            >
                <option value="">Seleccione...</option>
                <option value="Titular">Titular</option>
                <option value="Autorizado">Autorizado</option>
                <option value="No autorizado">No autorizado</option>
            </select>

            <label>Motivo Transferencia:</label>
            <textarea
                value={motivoTransferencia}
                onChange={(e)=> setMotivoTransferencia(e.target.value)}
                rows={3}
                style={{...inputStyle, resize: "none"}}
            />

            <button
                onClick={generarNotaInterna}
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
}

export default Transferencia;