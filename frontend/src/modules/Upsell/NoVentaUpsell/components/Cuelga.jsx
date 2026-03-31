import {useState} from "react";

const Cuelga = ({onGenerar}) => {


    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================

    const [ofrecimiento, setOfrecimiento] = useState("");
    const [numeroTelefonico, setNumeroTelefonico] = useState("");
    const [nombreContesta, setNombreContesta] = useState("");
    const [asesor, setAsesor] = useState("");

    const generarNota = () => {

        //Validacion de campos vacios
        if (!ofrecimiento || !numeroTelefonico || !nombreContesta || !asesor.trim()) {
            alert("Complete todos los campos obligatorios ⚠️");
            return;
        }

        //Validacion de 10 digitos
        if (numeroTelefonico.length !== 10) {
            alert("La línea debe tener exactamente 10 dígitos ⚠️");
            return;
        }

        //La nota como tal
        let nota = `- Cuelga. Motivo: ejemplo, OFRECIMIENTO:${ofrecimiento} en la línea ${numeroTelefonico}. Contesta ${nombreContesta}, se habla con ${nombreContesta}, se procede a entregar información pero se cuelga la llamada//${asesor}
/INSIGHT Pereira/ grupo especializado Upsell/ 00811`;

onGenerar(nota);
    };

    return (

         <div style={{ marginTop: "20px" }}>


            {/* Tipo Producto */}
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

            {/* Línea */}
            <label>Número donde llama:</label>
            <input
                type="text"
                inputMode="numeric"
                value={numeroTelefonico}
                onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, "");
                    if (soloDigitos.length <= 10) {
                        setNumeroTelefonico(soloDigitos);
                    }
                }}
                style={inputStyle}
            />

            {/* Quién contesta */}
            <label>Quién contesta:</label>
            <input
                type="text"
                value={nombreContesta}
                onChange={(e) => setNombreContesta(e.target.value)}
                style={inputStyle}
            />

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

export default Cuelga;







