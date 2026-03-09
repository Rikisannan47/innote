import { useState } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";

const MemoVenta = ({ onGenerar}) => {

    const inputStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    };

    // ESTADOS

    const [ban, setBan] = useState("");
    const [suscriptor, setSuscriptor] = useState("");
    const [titular, setTitular] = useState("");
    const [equipo, setEquipo] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [costoRegular, setCostoRegular] = useState("");
    const [costoPlazos, setCostoPlazos] = useState("");
    const [priceCodeDespacho, setPriceCodeDespacho] = useState("");
    const [plazosUpdate, setPlazosUpdate] = useState("");
    const [codigoTarifa, setCodigoTarifa] = useState("");
    const [precioTarifa, setPrecioTarifa] = useState("");
    const [canal, setCanal] = useState ("");

    // VALIDACIÓN

    const validarCampos = () =>  {
        if (
            ban.length !==9 ||
            !suscriptor.trim() ||
            !titular.trim() ||
            !equipo.trim() ||
            !itemCode.trim() ||
            !costoRegular ||
            !costoPlazos ||
            !priceCodeDespacho.trim()||
            !plazosUpdate.trim() ||
            !codigoTarifa.trim() ||
            !precioTarifa ||
            !canal
        ) {
            return false;
        }
        return true;
    };

    // GENERAR NOTA

    const generarNota = () => {
    
        if (!validarCampos()) {
            alert("Todos los campos son obligatorios y el BAN debe tener exactamente 9 dígitos");
            return;
        }

        const notaFinal =
        `Comp ID: (80925 INSIGHT)
BAN: ${ban}
Suscriptor: ${suscriptor}
Titular: ${titular}
Equipo: ${equipo}
Item Code: ${itemCode}
Costo de equipo precio regular: $${costoRegular}
Costo de equipo a Plazos: $${costoPlazos}
Price Code Despacho: ${priceCodeDespacho}
Plazos Update: ${plazosUpdate}
Codigo de tarifa: $${codigoTarifa}
Precio de Tarifa: $${precioTarifa}

Términos y condiciones leídos en llamada a cliente.  Se orienta envío de equipo inalámbrico por parte de IW en un término de 24-48 horas, acuerdo a 24 meses, equipo gratis en financiamiento a 24 meses, en caso de cancelacion pagara $4.58 por cada mes restante, prorrateo e ivu en primera factura.  Cliente de acuerdo con los terminos y condiciones. ***** CANAL(${canal})****`;
        onGenerar(notaFinal);    
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
            <label>Suscriptor:</label>
                <input
                    type="text"
                    value={suscriptor}
                    onChange={(e) => {setSuscriptor(e.target.value)}}
                    style={inputStyle}
                />

            <label>Titular:</label>
                    <input
                        type="text"
                        value={titular}
                        onChange={(e) => {setTitular(e.target.value)}}
                        style={inputStyle}
                    />
            <label>Equipo:</label>
                    <input
                        type="text"
                        value={equipo}
                        onChange={(e)=> setEquipo(e.target.value)}
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
                label="Costo de equipo precio regular:"
                value={costoRegular}
                setValue={setCostoRegular}
            />
            <CampoMoneda
                label="Costo de equipo a Plazos:"
                value={costoPlazos}
                setValue={setCostoPlazos}
            />
            <label>Pride Code Despacho:</label>
                    <input
                        type="text"
                        value={priceCodeDespacho}
                        onChange={(e)=> setPriceCodeDespacho(e.target.value)}
                        style={inputStyle}
                    />

            <label>Plazos Update:</label>
                <input
                    type="text"
                    value={plazosUpdate}
                    onChange={(e)=> setPlazosUpdate(e.target.value)}
                    style={inputStyle}
                />
            
            <label>Código Tarifa:</label>
                    <input
                        type="text"
                        value={codigoTarifa}
                        onChange={(e) => setCodigoTarifa(e.target.value)}
                        style={inputStyle}
                    />
            <CampoMoneda
                label="Precio de Tarifa"
                value={precioTarifa}
                setValue={setPrecioTarifa}
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
                }}>
                Generar Nota
            </button>

        </div>
    );
};

export default MemoVenta;
