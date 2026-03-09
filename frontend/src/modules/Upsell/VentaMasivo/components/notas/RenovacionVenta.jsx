import { useState } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";

const RenovacionVenta = ({ onGenerar}) => {
    
    const inputStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    };

    const [ban, setBan] = useState("");
    const [titular, setTitular] = useState("");
    const [equipo, setEquipo] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [costoRegular, setCostoRegular] = useState("");
    const [costoOferta, setCostoOferta] = useState("");
    const [costoPlazos, setCostoPlazos] = useState("");
    const [plazoUpdate, setPlazoUpdate] = useState("");
    const [priceCode, setPriceCode] = useState("");
    const [codigoTarifa, setCodigoTarifa] = useState("");
    const [precioTarifa, setPrecioTarifa] = useState("");
    const [seguro, setSeguro] = useState("");
    const [canal, setCanal] = useState ("");

    //Campos obligatorios

    const validarCampos = () => {
        if (
            ban.length !== 9 ||
            !titular.trim() ||
            !equipo.trim() ||
            !itemCode.trim() ||
            !costoRegular ||
            !costoOferta ||
            !costoPlazos ||
            !plazoUpdate.trim() ||
            !priceCode.trim() ||
            !codigoTarifa.trim() ||
            !precioTarifa ||
            !seguro ||
            !canal
        ) {
            return false;
        }

        return true;
    }

    const generarNota = () => {
        if (!validarCampos()) {
            alert("Todos los campos son obligatorios y el BAN debe tener 9 dígitos")
            return;
        }

        const notaFinal =
`OFERTA APLICA DEL 15 AL 30 DE SEPTIEMBRE DE 2022- APLICA A CANAL DIRECTO E INDIRECTO UPDATE PLUS Y FINANCIAMIENTO

• Memo de Venta
• Renovacion:
• Comp ID (80925 INSIGHT)
• BAN: ${ban}
• Titular: ${titular}
• Equipo: ${equipo}
• Item Code: ${itemCode}
• Costo De Equipo Regular: ${costoRegular}
• Costo De Equipo en Oferta: ${costoOferta}
• Costo de los plazos: ${costoPlazos}
• Plazo Update: ${plazoUpdate}
• Price Code: ${priceCode}
• Código De Tarifa: ${codigoTarifa}
• Precio de tarifa: $${precioTarifa}
• Seguro: $${seguro}

Términos y Condiciones:7 días para cambios y devoluciones, 1 año de garantía, equipo recibir en casa dentro de 24 A 48 horas laborables por Island Wide, se le orienta de prorrateo, y que deberá de pagar el total del equipo en caso de que desee cancelar. Se le orienta al cliente que la persona a recibir equipo debe presentar ID para la entrega del mismo y que en caso de querer devolver o cambiar el equipo debe de pagar la totalidad de $30.00 que se le reflejara en su factura por cada equipo.  ***** CANAL(${canal})*****`;
        
    onGenerar(notaFinal);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

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

            <label>Titular:</label>
            <input
                type="text"
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
                style={inputStyle}
            />

            <label>Equipo:</label>
            <input
                type="text"
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)}
                style={inputStyle}
            />

            <label>Item Code:</label>
            <input
                type="text"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                style={inputStyle}
            />

            <CampoMoneda
                label="Costo De Equipo Regular:"
                value={costoRegular}
                setValue={setCostoRegular}
            />

            <CampoMoneda
                label="Costo De Equipo en Oferta:"
                value={costoOferta}
                setValue={setCostoOferta}
            />

            <CampoMoneda
                label="Costo de los plazos:"
                value={costoPlazos}
                setValue={setCostoPlazos}
            />

            <label>Plazo Update:</label>
            <input
                type="text"
                value={plazoUpdate}
                onChange={(e) => setPlazoUpdate(e.target.value)}
                style={inputStyle}
            />

            <label>Price Code:</label>
            <input
                type="text"
                value={priceCode}
                onChange={(e) => setPriceCode(e.target.value)}
                style={inputStyle}
            />

            <label>Código De Tarifa:</label>
            <input
                type="text"
                value={codigoTarifa}
                onChange={(e) => setCodigoTarifa(e.target.value)}
                style={inputStyle}
            />

            <CampoMoneda
                label="Precio de tarifa:"
                value={precioTarifa}
                setValue={setPrecioTarifa}
            />

            <CampoMoneda
                label="Seguro:"
                value={seguro}
                setValue={setSeguro}
            />

              <label>Canal:</label>
                <select
                    value={canal}
                    onChange={(e) => setCanal(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="80925">80925</option>
                    <option value="60083">60083</option>
                    <option value="60123">60123</option>
                </select>

            <button
                onClick={generarNota}
                style={{
                    marginTop: "15px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#39B54A",
                    color: "#fff",
                    cursor: "pointer"
                }}
            >
                Generar Nota
            </button>
        </div>
    );
};

export default RenovacionVenta;