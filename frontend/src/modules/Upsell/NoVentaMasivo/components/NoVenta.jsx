import { useState } from "react";
import CampoMoneda from "../CampoMoneda";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    boder: "1px solid #ccc"
};
function MasivoNoVenta({ onGenerar}) {

    const [nombreContacto, setNombreContacto] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");
    const [ban, setBan] = useState("");
    const [productos, setProductos] = useState([]);
    const [ofertaEquipos, setOfertaEquipos] = useState("");
    const [motivoNoAcepta, setMotivoNoAcepta] = useState("");
    const [aplicaOfertaCruzada, setAplicaOfertaCruzada] = useState("");
    const [productosCruzados, setProductosCruzados] = useState([]);
    const [detalleOfertaCruzada, setDetalleOfertaCruzada] = useState("");
    const [canal, setCanal] = useState("");
    const [fincap, setFincap] = useState("");
    const [valorDisponible, setValorDisponible] = useState("");

    const handleProductosChange = (e) => {
        const options = Array.from(
            e.target.selectedOptions,
            option => option.value
        );
        setProductos(options);
    };

    let ofertaCruzadaFinal = "N/A";
    if (aplicaOfertaCruzada === "Si") {
        ofertaCruzadaFinal = `Producto(s) cruzado(s): ${productosCruzados.join(", ")}. Detalle: ${detalleOfertaCruzada}`;
    }

    const generarNotaInterna = () => {

        // Validación básica obligatoria
        if (
            !nombreContacto.trim() ||
            !tipoPersona ||
            !ban ||
            productos.length === 0 ||
            !ofertaEquipos.trim() ||
            !motivoNoAcepta.trim() ||
            !aplicaOfertaCruzada ||
            !canal ||
            !fincap ||
            !valorDisponible
        ) {
            alert("Todos los campos son obligatorios.");
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

        const nota = `Me contacto con ${nombreContacto} (${tipoPersona}), del BAN ${ban}, se le ofrece producto(s): ${productos.join(", ")}. Oferta y equipos ofrecidos: ${ofertaEquipos}. Cliente indica no estar interesado porque: ${motivoNoAcepta}
Oferta cruzada: ${ofertaCruzadaFinal}. 
Finalizó el contacto.
Canal: ${canal}.
Fincap: ${fincap}
Valor disponible: $${valorDisponible}
`;

        onGenerar(nota);
    };

    return (
        <div  style={{
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
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            <label>Tipo Persona:</label>
                <select
                    value={tipoPersona}
                    onChange={(e) => 
                        setTipoPersona(e.target.value)}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}>
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
                        onChange={(e)=> {
                        // 1. Extraer solo dígitos (elimina letras, guiones, espacios, etc.)
                        const soloDigitos = e.target.value.replace(/\D/g, '');

                        // 2. Si después de limpiar no queda nada, podemos poner cadena vacía
                            if (soloDigitos === '') {
                                setBan('');
                                    return;
                            }

                        // // 3. Limitar a 3 dígitos
                            if (soloDigitos.length > 9) return;

                        // 4. Convertir a número y validar rango 1-999
                            const numero = parseInt(soloDigitos, 10);
                            if (numero >= 1 && numero <= 999999999) {
                        // Opcional: eliminar ceros a la izquierda (ej: "012" → "12")
                            setBan(numero.toString());
                                }
                            }

                        }

                        onBlur={(e) => {
                        // Si el campo queda vacío o con valor 0, asignamos "1" por defecto
                            const valorActual = ban;
                            if (valorActual === '' || parseInt(valorActual, 10) === 0) {
                            setBan('');
                                }
                            }}

                        style={{padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}
                    />
                <label>Productos ofrecidos:</label>
                    <select
                        multiple
                        value={productos}
                        onChange={handleProductosChange}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            height: "120px"
                            }}
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
                    <h6>Presioná Ctrl para seleccionar varios productos👆🏽</h6>

                    <label>Oferta y equipos ofrecidos:</label>
                    <textarea
                        value={ofertaEquipos}
                        onChange={(e) => setOfertaEquipos(e.target.value)}
                        rows={3}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "none" }}
                    />
                    
                    <label>Motivo de No aceptación:</label>
                    <textarea
                        value={motivoNoAcepta}
                        onChange={(e)=> setMotivoNoAcepta(e.target.value)}
                        rows={3}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "none" }}
                    />
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
                                <option value="FWA">FWA</option>
                                <option value="CH">CH</option>
                                <option value="Accesorio">Accesorio</option>
                                </select>

                                <h6>Presioná Ctrl para seleccionar varios productos 👆🏽</h6>

                                <label>Detalle Oferta Cruzada:</label>
                                <textarea
                                value={detalleOfertaCruzada}
                                onChange={(e) => setDetalleOfertaCruzada(e.target.value)}
                                rows={3}
                                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "none" }}
                                />
                            </>
                    )}
                    <label>Canal:</label>
                    <select
                        value={canal}
                        onChange={(e)=> setCanal(e.target.value)}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                    >
                        <option value=""></option>
                        <option value="80925 INSIGHT">80925 INSIGHT</option>
                        <option value="60083 INBOUND">60083 INBOUND</option>
                        <option value="123 PERFORMANCE">60123 PERFORMANCE</option>
                    </select>

                    <label>Fincap:</label>
                    <select
                        value={fincap}
                        onChange={(e)=> setFincap(e.target.value)}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}>
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

                    {/* Botón Generar */}
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
                        }}>
                            Generar nota
                    </button>
        </div>
    );
};

export default MasivoNoVenta;

