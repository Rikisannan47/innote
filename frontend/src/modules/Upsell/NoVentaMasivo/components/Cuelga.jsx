import { useState } from "react";
import CampoMoneda from "../CampoMoneda";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    boder: "1px solid #ccc"
};

function MasivoClienteCuelga ({ onGenerar}) {
    const [nombreContacto, setNombreContacto] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");
    const [ban, setBan] = useState("");
    const [productos, setProductos] = useState([]);
    const [ofertaEquipos, setOfertaEquipos] = useState("");
    const [canal, setCanal] = useState("");
    const [fincap,setFincap] = useState("");
    const [valorDisponible, setValorDisponible] = useState("");

    const handleProductosChange = (e) => {
        const options = Array.from(
            e.target.selectedOptions,
            option => option.value
        );
        setProductos(options);
    };

    const generarNotaInterna = () => {

        if (
            !nombreContacto.trim() ||
            !tipoPersona ||
            !ban ||
            ban.length !== 9 ||
            productos.length === 0 ||
            !ofertaEquipos.trim() ||
            !canal ||
            !fincap ||
            !valorDisponible
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        const nota = `Me contacto con ${nombreContacto} (${tipoPersona}), del BAN ${ban}, se le ofrece producto(s): ${productos.join(", ")}. Oferta y equipos ofrecidos: ${ofertaEquipos}. Cliente me cuelga la llamada en medio de la interacción.
Canal: ${canal}.
Fincap: ${fincap}.
Valor disponible: $${valorDisponible}.
`;
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
                style={inputStyle}>
                    <option value="">Seleccione...</option>
                    <option value="Titular">Titular</option>
                    <option value="Autorizado">Autorizado</option>
                    <option value="No autorizado">No autorizado</option>
                </select>
            
            <label>BAN:</label>
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={ban}
                onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, '');
                    if (soloDigitos.length > 9) return;
                    setBan(soloDigitos);
                }}
                style={inputStyle}            
            />

            <label>Productos ofrecidos:</label>
                <select
                    multiple
                    value={productos}
                    onChange={handleProductosChange}
                    style={{ ...inputStyle, height: "120px" }}
                >
                    <option value="Renovación">Renovación</option>
                    <option value="Línea nueva">Línea Nueva</option>
                    <option value="Portabilidad">Portabilidad</option>
                    <option value="3Play">3Play</option>
                    <option value="2Play">2Play</option>
                    <option value="TV+">TV+</option>
                    <option value="TV NOW">TV NOW</option>
                    <option value="FWA">FWA</option>
                    <option value="CH">CH</option>
                    <option value="Accesorio">Accesorio</option>
                </select>
                <h6>Presioná Ctrl para seleccionar varios productos 👆🏽</h6>
            <label>Oferta y equipos ofrecidos:</label>
                <textarea
                    value={ofertaEquipos}
                    onChange={(e) => setOfertaEquipos(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "none" }}
                />
            <label>Canal:</label>
                <select
                    value={canal}
                    onChange={(e) => setCanal(e.target.value)}
                    style={inputStyle}
                >
                    <option value=""></option>
                    <option value="80925 INSIGHT">80925 INSIGHT</option>
                    <option value="60083 INBOUND">60083 INBOUND</option>
                    <option value="60123 PERFORMANCE">60123 PERFORMANCE</option>
                </select>

                <label>Fincap:</label>
                <select
                    value={fincap}
                    onChange={(e) => setFincap(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>

                <CampoMoneda
                    label="Valor Disponible"
                    value={valorDisponible}
                    setValue={setValorDisponible}
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
};

export default MasivoClienteCuelga;