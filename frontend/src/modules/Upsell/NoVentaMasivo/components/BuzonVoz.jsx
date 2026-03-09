import { useState } from "react";
import CampoMoneda from "../CampoMoneda";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
};

function BuzonDeVoz ({ onGenerar}) {
    
    const [cliente, setCliente] = useState("");
    const [productos, setProductos] = useState([]);
    const [canal, setCanal] = useState("");
    const [fincap, setFincap] = useState("");
    const [valorDisponible, setValorDisponible] = useState("");

    const validarCampos = () => {
        if (
            !cliente.trim() ||
            productos.length === 0 ||
            !canal ||
            !fincap ||
            !valorDisponible
        ) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        return true;
    };

    const generarNotaInterna = () => {
        if (!validarCampos()) return;

        const nota = `Cliente ${cliente}, se trata de llamar para realizar ofrecimiento de ${productos.join(", ")}. Cliente no contesta.

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

            <label>Cliente:</label>
            <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                style={inputStyle}
            />

            <label>Productos a ofrecer:</label>
            <select
                multiple
                value={productos}
                onChange={(e) => {
                    const options = Array.from(
                        e.target.selectedOptions,
                        options => options.value
                    );
                    setProductos(options);
                }}
                style={{...inputStyle, height: "120px"}}
            >
                <option value="Renovación">Renovación</option>
                <option value="Línea nueva">Línea Nueva</option>
                <option value="Portabilidad">Portabilidad</option>
                <option value="3Play">3Play</option>
                <option value="2Play">2Play</option>
                <option value="TV+">TV+</option>
                <option value="TV NOW">TV NOW</option>
                <option value="FWA5">FWA5</option>
                <option value="CH">CH</option>
                <option value="Accesorio">Accesorio</option>
            </select>
            <h6>Presioná Ctrl para seleccionar varios productos 👆🏽</h6>

            <label>Canal:</label>
            <select
                value={canal}
                onChange={(e)=> setCanal(e.target.value)}
                style={inputStyle}
            >
                <option value="">Selecccione...</option>
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
}

export default BuzonDeVoz;