import React, { useState } from "react";
import CampoMoneda from "../CampoMoneda";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
};

function LlamadaOutbound ({ onGenerar}) {
    const [nombreContacto, setNombreContacto] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");
    const [ban, setBan] = useState("");
    const [motivoConsulta, setMotivoConsulta] = useState("");

    //Oferta cruzada estructurada

    const [aplicaOfertaCruzada, setAplicaOfertaCruzada] = useState("");
    const [productosCruzados, setProductosCruzados] = useState([]);
    const [detalleOfertaCruzada, setDetalleOfertaCruzada] = useState("");

    const [canal, setCanal] = useState("");
    const [fincap, setFincap] = useState("");
    const [valorDisponible, setValorDisponible] = useState("");

    const generarNotaInterna = () => {

         // Validación campos obligatorios
        if (
            !nombreContacto ||
            !tipoPersona ||
            !ban ||
            !motivoConsulta ||
            !canal ||
            !fincap ||
            !valorDisponible
        ) {
                alert("Todos los campos son obligatorios.");
                return;
            }

        if (ban.length !== 9) {
            alert("El BAN debe tener exactamente 9 dígitos.");
            return;
        }

        // 🔥 Validación condicional de oferta cruzada
        if (
            aplicaOfertaCruzada === "Si" &&
            (
                productosCruzados.length === 0 ||
                !detalleOfertaCruzada.trim()
            )
        ) {
            alert("Debe completar los campos de Oferta Cruzada.");
            return;
        }
 
        let ofertaCruzadaFinal = "N/A";

        if (aplicaOfertaCruzada === "Si") {
            ofertaCruzadaFinal = `Sí. Producto(s) cruzado(s): ${productosCruzados.join(", ")}. Detalle: ${detalleOfertaCruzada}`;
        }
        
        
        const nota = `Me contacto con ${nombreContacto} (${tipoPersona}), del BAN ${ban}, por motivo de consulta: ${motivoConsulta} 
Oferta cruzada: ${ofertaCruzadaFinal}. 
Finalizó el contacto.

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
            }}>

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
                    <option value="No autorizado">No autorizado</option>
                </select>

                <label>BAN:</label>
                <input
                    type="text"
                    inputMode="numeric"
                    value={ban}
                    onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, '');
                    setBan(soloDigitos.slice(0, 9));
                    }}
                    style={inputStyle}
                />

                <label>Motivo de consulta:</label>
                <textarea
                    value={motivoConsulta}
                    onChange={(e) => setMotivoConsulta(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "none" }}
                />

                {/* Oferta Cruzada Controlada */}
                <label>¿Aplica Oferta Cruzada?</label>
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
                        <option value="FWA5">FWA</option>
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

export default LlamadaOutbound;