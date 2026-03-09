import { useState } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";

const LineaNuevaVenta = ({ onGenerar}) => {

    const inputStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    };

    const [diaInicio, setDiaInicio] = useState("");
    const [diaFinal, setDiaFinal] = useState("");
    const [mes, setMes] = useState("");
    const [anio, setAnio] = useState("");

    const [ban, setBan] = useState("");
    const [titular, setTitular] = useState("");
    const [equipo, setEquipo] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [costoRegular, setCostoRegular] = useState("");
    const [costoOferta, setCostoOferta] = useState("");
    const [costoPlazos, setCostoPlazos] = useState("");
    const [plazoUpdate, setPlazoUpdate] = useState("");
    const [priceCode, setPriceCode] = useState("");
    const[codigoTarifa, setCodigoTarifa] = useState("");
    const [precioTarifa, setPrecioTarifa] = useState("");
    const [seguro, setSeguro] = useState("NO");
    const [canal, setCanal] = useState ("");

    const obtenerMaxDias = (mes) => {
        const meses31 = [
            "ENERO", "MARZO", "MAYO",
            "JULIO", "AGOSTO", "OCTUBRE", "DICIEMBRE"
        ];

        const meses30 = [
           "ABRIL", "JUNIO",
            "SEPTIEMBRE", "NOVIEMBRE" 
        ];

        if (meses31.includes(mes)) return 31;
        if (meses30.includes(mes)) return 30;
        if (mes === "FEBRERO") return 29;

        return 31;
    }
    const validarCampos = () => {

        const maxDias = obtenerMaxDias(mes);
        if (
            parseInt(diaInicio) < 1 ||
            parseInt(diaInicio) > maxDias ||
            parseInt(diaFinal) < 1 ||
            parseInt(diaFinal) > maxDias
        ) {
            alert(`El mes ${mes} solo permite hasta ${maxDias}.`);
            return false;
        }

        if (parseInt(diaFinal) < parseInt(diaInicio)) {
            alert("El día Final no puede ser menor que el día Inicio.");
            return false;
        }

        if (
            ban.length !==9 ||
            !diaInicio || !diaFinal || !mes.trim() || !anio ||
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
            !canal

        ) {
            return false;
        }
        return true;
    };

    const generarNota = () => {

        if (!validarCampos()) {
            alert("Complete todos los campos obligatorios. BAN debe tener 9 dígitos.");
            return;
        }

        const encabezadoOferta =
`OFERTA APLICA DEL ${diaInicio} AL ${diaFinal} DE ${mes} DE ${anio} - APLICA A CANAL DIRECTO E INDIRECTO UPDATE PLUS Y FINANCIAMIENTO`;

 const notaFinal =
`${encabezadoOferta}

• Memo de Venta
• Linea Nueva:
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
• Precio de tarifa: ${precioTarifa}
• Seguro: ${seguro}

Términos y Condiciones:7 días para cambios y devoluciones, 1 año de garantía, equipo recibir en casa dentro de 24 A 48 horas laborables por Island Wide, se le orienta de prorrateo, y que deberá de pagar el total del equipo en caso de que desee cancelar. Se le orienta al cliente que la persona a recibir equipo debe presentar ID para la entrega del mismo y que en caso de querer devolver o cambiar el equipo debe de pagar la totalidad de $30.00 que se le reflejara en su factura por cada equipo.  ***** CANAL(${canal})****`;

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

            <label>Día Inicio:</label>
            <input type="text" inputMode="numeric" min="1" max={obtenerMaxDias(mes)} value={diaInicio} onChange={(e) => { const soloDigitos = e.target.value.replace(/\D/g, ''); const limitado = soloDigitos.slice(0, 2); setDiaInicio(limitado)}} style={inputStyle} />

            <label>Día Final:</label>
            <input type="text" inputMode="numeric" min="1" max={obtenerMaxDias(mes)} value={diaFinal} onChange={(e) => { const soloDigitos = e.target.value.replace(/\D/g, ''); const limitado = soloDigitos.slice(0, 2); setDiaFinal(limitado)}} style={inputStyle} />

            <label>Mes:</label>
                <select
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="ENERO">ENERO</option>
                    <option value="FEBRERO">FEBRERO</option>
                    <option value="MARZO">MARZO</option>
                    <option value="ABRIL">ABRIL</option>
                    <option value="MAYO">MAYO</option>
                    <option value="JUNIO">JUNIO</option>
                    <option value="JULIO">JULIO</option>
                    <option value="AGOSTO">AGOSTO</option>
                    <option value="SEPTIEMBRE">SEPTIEMBRE</option>
                    <option value="OCTUBRE">OCTUBRE</option>
                    <option value="NOVIEMBRE">NOVIEMBRE</option>
                    <option value="DICIEMBRE">DICIEMBRE</option>
                </select>

            <label>Año:</label>
                <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={anio}
                onChange={(e)=> {
                // 1. Extraer solo dígitos (elimina letras, guiones, espacios, etc.)
                const soloDigitos = e.target.value.replace(/\D/g, '');

                // 2. Si después de limpiar no queda nada, podemos poner cadena vacía
                    if (soloDigitos === '') {
                        setAnio('');
                            return;
                    }

                // // 3. Limitar a 4 dígitos
                    if (soloDigitos.length > 4) return;

                // 4. Convertir a número y validar rango 1-999
                    const numero = parseInt(soloDigitos, 10);
                    if (numero >= 1 && numero <= 9999) {
                // Opcional: eliminar ceros a la izquierda (ej: "012" → "12")
                    setAnio(numero.toString());
                        }
                    }

                }

                onBlur={(e) => {
                // Si el campo queda vacío o con valor 0, asignamos "1" por defecto
                    const valorActual = anio;
                    if (valorActual === '' || parseInt(valorActual, 10) === 0) {
                    setAnio('');
                        }
                    }}

                style={{padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}
            />

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
            <input type="text" value={titular} onChange={(e) => setTitular(e.target.value)} style={inputStyle} />

            <label>Equipo:</label>
            <input type="text" value={equipo} onChange={(e) => setEquipo(e.target.value)} style={inputStyle} />

            <label>Item Code:</label>
            <input type="text" value={itemCode} onChange={(e) => setItemCode(e.target.value)} style={inputStyle} />

            <CampoMoneda label="Costo De Equipo Regular:" value={costoRegular} setValue={setCostoRegular} />
            <CampoMoneda label="Costo De Equipo en Oferta:" value={costoOferta} setValue={setCostoOferta} />
            <CampoMoneda label="Costo de los plazos:" value={costoPlazos} setValue={setCostoPlazos}/>

            <label>Plazo Update:</label>
            <input type="text" value={plazoUpdate} onChange={(e) => setPlazoUpdate(e.target.value)} style={inputStyle} />

            <label>Price Code:</label>
                <input type="text" value={priceCode} onChange={(e) => setPriceCode(e.target.value)} style={inputStyle} />

            <label>Código De Tarifa:</label>
            <input type="text" value={codigoTarifa} onChange={(e) => setCodigoTarifa(e.target.value)} style={inputStyle} />

            <CampoMoneda label="Precio de tarifa:" value={precioTarifa} setValue={setPrecioTarifa} />

            <label>Seguro:</label>
            <input type="text" value={seguro} onChange={(e) => setSeguro(e.target.value)} style={inputStyle} />

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

export default LineaNuevaVenta;