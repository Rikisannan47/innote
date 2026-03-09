import { useState } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%"
};

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop:"15px",
    fontFamily: "Century Gothic"
};

const buttonStyle = {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#39B54A",
    color: "#fff",
    cursor: "pointer"
};

const TriplePlayVenta = ({ onGenerar}) => {
    const [velocidadOferta, setVelocidadOferta] = useState("");
    const [unidad, setUnidad] = useState("MB");
    const [planTV, setPlanTV] = useState("");
    const [precio, setPrecio] = useState("");
    const [prorrateo, setProrrateo] = useState("");
    const [canal, setCanal] = useState ("");

    const handleGenerar = () => {

        if (!velocidadOferta || !planTV || !precio || !prorrateo || !canal) {
    alert("Completa todos los campos obligatorios");
    return;
  }

        const nota = `Usted acepto servicio TRIPLE PLAY ${velocidadOferta} ${unidad} + tel ilimi USA/PR + (Claro TV+ PLAN ${planTV}) POR $${precio} + ivu, el contrato es contrato 24 meses, la penalidad por la TV es $200 dolares y por el internet es $150, en caso de cancelación temprana pagaría los meses restantes del acuerdo de $14.58 por cada mes restante, en caso de no devolución del módem conllevaría a penalidad de $100 dólares y por entrega de modem incompleto $35. En la primera factura tendrá cargos de prorrateo Aproximado de $${prorrateo} y un posible depósito de 20 dólares, la instalación será de 5 a 7 días laborables por un técnico. Al correo electrónico le llegara el link del Claro TV+ y la caja STB llegara en 24 a 48 horas luego de la instalación, Sí no activa su cuenta en este periodo debe comunicarse grupo especializado de Claro TV+ al número 7875240113.
***** CANAL(${canal})****`;

        onGenerar (nota);
    };

        return (
            <div style={containerStyle}>
                    <h3>Triple Play</h3>

                    <label>Velocidad:</label>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={velocidadOferta}
                        onChange={(e) => {
                            const soloDigitos = e.target.value.replace(/\D/g, '');

                            if (soloDigitos === '') {
                            setVelocidadOferta('');
                            return;
                            }

                            if (soloDigitos.length > 3) return;

                            const numero = parseInt(soloDigitos, 10);

                            if (unidad === "MB") {
                            if (numero >= 1 && numero <= 999) {
                                setVelocidadOferta(numero.toString());
                            }
                            } else if (unidad === "GB") {
                            if (numero === 1) {
                                setVelocidadOferta("1");
                            }
                            }
                        }}
                        onBlur={() => {
                            if (velocidadOferta === '' || parseInt(velocidadOferta, 10) === 0) {
                            setVelocidadOferta("1");
                            }
                        }}
                        style={{ ...inputStyle, flex: 1 }}
                        />

                        <select
                        value={unidad}
                        onChange={(e) => {
                            setUnidad(e.target.value);
                            setVelocidadOferta("1"); // reset seguro al cambiar unidad
                        }}
                        style={{ ...inputStyle, width: "100px" }}
                        >
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>
                        </select>
                    </div>

                    <label>Plan TV:</label>
                    <select
                        value={planTV}
                        onChange={(e) => setPlanTV(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">Seleccione Plan</option>
                        <option value="Ultra Esencial">Ultra Esencial</option>
                        <option value="Esencial">Esencial</option>
                        <option value="Esencial + Español">Esencial + Español</option>
                        <option value="Esencial Todo Español">Esencial Todo Español</option>
                        <option value="Basic">Basic</option>
                        <option value="Basic +">Basic +</option>
                        <option value="Signature">Signature</option>
                    </select>

                    <label>Precio:</label>
                    <CampoMoneda value={precio} setValue={setPrecio} />

                    <label>Prorrateo Aproximado:</label>
                    <CampoMoneda value={prorrateo} setValue={setProrrateo} />

                    <label>Canal:</label>
                    <select
                        value={canal}
                        onChange={(e) => setCanal(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">Seleccione canal...</option>
                        <option value="80925">80925</option>
                        <option value="60083">60083</option>
                        <option value="60123">60123</option>
                    </select>

                    <button style={buttonStyle} onClick={handleGenerar}>
                        Generar Nota
                    </button>
            </div>
        );
    };

    export default TriplePlayVenta;