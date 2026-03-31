import { useState } from "react";
import CampoMoneda from "../../NoVentaMasivo/CampoMoneda";

const MemoVentaHogar = ({onGenerar}) => {

    //Estados

const [finCap, setFinCap] = useState("");
const [credito, setCredito] = useState("");
const [lineaNueva, setLineaNueva] = useState("");
const [ban, setBan] = useState("");
const [titular, setTitular] = useState("");
const [equipo, setEquipo] = useState("");
const [itemCode, setItemCode] = useState("");
const [codigoTarifa, setCodigoTarifa] = useState("");
const [precioTarifa, setPrecioTarifa] = useState("");
const [seguro, setSeguro] = useState("");

//Generamos la nota

const generarNota = () => {

    //Restriccion de campos vacíos
    if (
        !finCap || !credito || !lineaNueva || !ban || !titular.trim() || !codigoTarifa.trim() || !precioTarifa || !seguro
    ) {
        alert("Complete todos los campos obligatorios ⚠️");
        return;
    }

    if (!/^\d{10}$/.test(lineaNueva)) {
            alert("La línea debe tener 10 dígitos ⚠️");
            return;
        }

    if (!/^\d{1,9}$/.test(ban)) {
            alert("El BAN debe tener máximo 9 dígitos ⚠️");
            return;
        }

    let nota = `Memo de Venta CH / Claro hogar 5G

Oferta: Desde el 1ero de octubre de 2025 Plan Claro
Hogar para Redundancia (Back Up a Fijo) INTERNET 3 MEMO Linea Nueva
CANAL: 775TEL
Comp ID: 00811
Fin Cap: $${finCap}
Crédito: ${credito}
Linea Nueva: ${lineaNueva}
BAN: ${ban}
Titular: ${titular}
Equipo: ${equipo}
Item Code: ${itemCode}
Price Code: CACFIX
Código De Tarifa: ${codigoTarifa}
Precio de tarifa: $${precioTarifa}

Seguro: ${seguro}

Términos y Condiciones: Equipo a recibir en casa dentro de 24/48 horas laborables por compañía Island Wide, se le orienta de prorrateo, y que deberá de pagar $100 sino devuelve equipo en CAC en caso de que desee cancelar servicio fijo. Se le orienta al cliente que la persona a recibir equipo debe presentar ID para la entrega del mismo.*(00811-775 TEL INSIGHT)*`;

        onGenerar(nota);
    };

    return (
        <div style={{ marginTop: "20px" }}>

            <CampoMoneda label="Fin Cap ($)" value={finCap} setValue={setFinCap} />

            <label>Crédito:</label>
            <select value={credito} onChange={(e) => setCredito(e.target.value)} style={inputStyle}>
                <option value="">Seleccione...</option>
                <option>B</option><option>C</option><option>D</option>
                <option>E</option><option>F</option><option>G</option><option>H</option>
            </select>

            <label>Línea Nueva:</label>
            <input
                type="text"
                inputMode="numeric"
                value={lineaNueva}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setLineaNueva(val);
                }}
                style={inputStyle}
            />

            <label>BAN:</label>
            <input
                type="text"
                inputMode="numeric"
                value={ban}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 9) setBan(val);
                }}
                style={inputStyle}
            />

            <label>Titular:</label>
            <input value={titular} onChange={(e) => setTitular(e.target.value)} style={inputStyle} />

            <label>Equipo:</label>
            <input value={equipo} onChange={(e) => setEquipo(e.target.value)} style={inputStyle} />

            <label>Item Code:</label>
            <input value={itemCode} onChange={(e) => setItemCode(e.target.value)} style={inputStyle} />

            <label>Código de Tarifa:</label>
            <input value={codigoTarifa} onChange={(e) => setCodigoTarifa(e.target.value)} style={inputStyle} />

            <CampoMoneda label="Precio de tarifa ($)" value={precioTarifa} setValue={setPrecioTarifa} />

            <label>Seguro:</label>
            <select value={seguro} onChange={(e) => setSeguro(e.target.value)} style={inputStyle}>
                <option value="">Seleccione...</option>
                <option>SI</option>
                <option>NO</option>
            </select>

            <button onClick={generarNota} style={btnStyle}>
                Generar nota
            </button>

        </div>
    );
};

// ===============================
// ===== ESTILOS =================
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

const btnStyle = {
    width: "100%",
    background: "#39B54A",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

export default MemoVentaHogar;
