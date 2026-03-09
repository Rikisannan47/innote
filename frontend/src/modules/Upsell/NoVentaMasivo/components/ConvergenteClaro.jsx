import { useState } from "react";
import CampoMoneda from "../CampoMoneda";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
};

function ConvergenteClaroOtroTitular ({ onGenerar}) {
    const [nombreContacto, setNombreContacto] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");
    const [linea, setLinea] = useState("");
    const [lineaFijo, setLineaFijo] = useState("");

    const [aplicaOfertaCruzada, setAplicaOfertaCruzada] = useState("");
    const [productosCruzados, setProductosCruzados] = useState([]);
    const [detalleOfertaCruzada, setDetalleOfertaCruzada] = useState("");

    const [canal, setCanal] = useState("");
    const [fincap, setFincap] = useState("");
    const [valorDisponible, setValorDisponible] = useState("");

    const generarNotaInterna = () => {

            if (
            !nombreContacto.trim() ||
            !tipoPersona ||
            !linea ||
            !lineaFijo.trim() ||
            !canal ||
            !fincap
            ) {
            alert("Todos los campos son obligatorios");
            return;
            }

            if (linea.length < 8) {
            alert("La línea debe tener al menos 8 dígitos");
            return;
            }

            if (
            aplicaOfertaCruzada === "Si" &&
            (productosCruzados.length === 0 || !detalleOfertaCruzada.trim())
            ) {
            alert("Debe completar todos los productos de la venta cruzada");
            return;
            }

            let ofertaCruzadaFinal = "N/A";

            if (aplicaOfertaCruzada === "Si") {
            ofertaCruzadaFinal = `Sí. Producto(s) cruzado(s): ${productosCruzados.join(", ")}. Detalle: ${detalleOfertaCruzada}`;
            }

            const nota = `Me contacto con ${nombreContacto} (${tipoPersona}), de la línea ${linea}, quien me contesta indica tener los servicios fijo en la línea ${lineaFijo}. Oferta cruzada: ${ofertaCruzadaFinal}, finalizó el contacto.

Canal: ${canal}
Fincap: ${fincap}
Valor disponible: $${valorDisponible}`;

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
                    onChange={(e) => setNombreContacto(e.target.value)}
                    style={inputStyle}
                />

                <label>Tipo Persona:</label>
                <select
                    value={tipoPersona}
                    onChange={(e) => setTipoPersona(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="Titular">Titular</option>
                    <option value="Autorizado">Autorizado</option>
                    <option value="No autorizado">No Autorizado</option>
                </select>

                <label>Línea:</label>
                <input
                    type="text"
                    inputMode="numeric"
                    value={linea}
                    onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, "");
                    if (soloDigitos.length > 10) return;
                    setLinea(soloDigitos);
                    }}
                    style={inputStyle}
                />

                <label>Línea con Servicios Fijos:</label>
                <input
                    type="text"
                    inputMode="numeric"
                    value={lineaFijo}
                    onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, "");
                    if (soloDigitos.length > 10) return;
                    setLineaFijo(soloDigitos);
                    }}
                    style={inputStyle}
                />

                <label>¿Aplica Venta Cruzada?</label>
                <select
                    value={aplicaOfertaCruzada}
                    onChange={(e) => {
                    const valor = e.target.value;
                    setAplicaOfertaCruzada(valor);

                    if (valor === "No") {
                        setProductosCruzados([]);
                        setDetalleOfertaCruzada("");
                    }
                    }}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                </select>

                {aplicaOfertaCruzada === "Si" && (
                    <>
                    <label>Productos Oferta Cruzada:</label>
                    <select
                        multiple
                        value={productosCruzados}
                        onChange={(e) => {
                        const options = Array.from(
                            e.target.selectedOptions,
                            option => option.value
                        );
                        setProductosCruzados(options);
                        }}
                        style={{ ...inputStyle, height: "120px" }}
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

                    <label>Detalle Oferta Cruzada:</label>
                    <textarea
                        value={detalleOfertaCruzada}
                        onChange={(e) => setDetalleOfertaCruzada(e.target.value)}
                        rows={3}
                        style={{ ...inputStyle, resize: "none" }}
                    />
                    </>
                )}

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

export default ConvergenteClaroOtroTitular;