import { useState } from "react";

const Upsell3PlaySin = ({onGenerar}) => {

    const [nombre, setNombre] = useState("");
    const [planActual, setPlanActual] = useState("");
    const [valorActual, setValorActual] = useState("");
    const [planAceptado, setPlanAceptado] = useState("");
    const [valorAceptado, setValorAceptado] = useState("");
    const [valorFinal, setValorFinal] = useState("");
    const [nombreAsesor, setNombreAsesor] = useState("");
    const [fechaOferta, setFechaOferta] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");


    // ===============================
    // PLANES DISPONIBLES
    // ===============================

    const planesInternetAnterior = [
        "5M GPON PRUS",
        "16M GPON PRUS",
        "20M GPON PRUS",
        "30M GPON PRUS",
        "50M GPON PRUS",
        "100M GPON PRUS",
        "300M GPON PRUS",
        "600M GPON PRUS",
        "1GB GPON PRUS"
    ];

    const planesInternet = [
        "30M GPON PRUS",
        "50M GPON PRUS",
        "100M GPON PRUS",
        "300M GPON PRUS",
        "600M GPON PRUS",
        "1GB GPON PRUS"
    ];

    // ===============================
    // FORMATO FECHA USA
    // ===============================
    const formatearFechaUSA = (fechaISO) => {
        if (!fechaISO) return "";
        const partes = fechaISO.split("-");
        return `${partes[1]}/${partes[2]}/${partes[0]}`;
    };

    // ===============================
    // INPUT DINERO 
    // ===============================
    const formatearDinero = (valor, setValor) => {
        let val = valor
            .replace(/[^\d.]/g, '')
            .replace(/(\..*)\./g, '$1');

        if (val === '' || val === '.') {
            setValor(val);
            return;
        }

        const partes = val.split('.');
        let enteros = partes[0];
        let decimales = partes[1] || '';

        if (enteros.length > 5) enteros = enteros.slice(0, 5);
        if (decimales.length > 2) decimales = decimales.slice(0, 2);

        const tienePunto = val.includes('.');
        const nuevo = tienePunto ? `${enteros}.${decimales}` : enteros;
        setValor(nuevo);
    };

    const blurDinero = (valor, setValor) => {
        if (valor === '' || valor === '.') return;

        if (!valor.includes('.')) {
            setValor(`${parseInt(valor, 10)}.00`);
            return;
        }

        const partes = valor.split('.');
        let enteros = partes[0];
        let decimales = partes[1] || '';

        enteros = enteros.replace(/^0+/, '') || '0';
        decimales = decimales.padEnd(2, '0').slice(0, 2);

        setValor(`${enteros}.${decimales}`);
    };

    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

    //Gereramos la nota para el asesorcito

    const generar = () => {

    if (
        !nombre ||
        !planActual ||
        !valorActual ||
        !planAceptado ||
        !valorAceptado ||
        !valorFinal ||
        !nombreAsesor ||
        !fechaOferta
    ) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    let nota = `Cliente Titular ${nombre} acepta cambio de plan de ${planActual} con valor de $${valorActual} a ${planAceptado} con un valor de $${valorAceptado} oferta incluye telefonía ILIM PR +LD +50minutos Multi-Destino Renta final $${valorFinal} + IVU, sin Renovacion de contrato se le orienta verá cargos de prorrateo en su próxima factura, venta realizada por Grupo especializado ${nombreAsesor}
Oferta vigente hasta el ${formatearFechaUSA(fechaOferta)}, según boletín. 71136 INSIGHT.
– Grupo Especializado`;

    // 🔹 Comentario opcional
    if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
        nota += `

Comentario adicional:
${comentarioAdicional.trim()}`;
    }

    nota += `

- Campaña: Grupo Especializado.`;

    onGenerar(nota);
};

    return (

        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>

            <label>Nombre titular:</label>
            <input 
                type="text" 
                value={nombre} 
                onChange={e=>setNombre(e.target.value)} 
                style={estiloInput} />

            <label>Plan actual:</label>
            <select value={planActual} onChange={e => setPlanActual(e.target.value)} style={estiloInput}>
                <option value="">Seleccione plan...</option>
                {planesInternetAnterior.map((plan, i) => (
                    <option key={i}>{plan}</option>
                ))}
            </select>

            <label>Valor actual:</label>
            <input
                type="text"
                value={valorActual}
                onChange={(e)=>formatearDinero(e.target.value,setValorActual)}
                style={estiloInput}
                onBlur={()=>blurDinero(valorActual,setValorActual)}
            />

            <label>Plan aceptado:</label>
            <select value={planAceptado} onChange={e => setPlanAceptado(e.target.value)} style={estiloInput}>
                <option value="">Seleccione plan...</option>
                {planesInternet.map((plan, i) => (
                    <option key={i}>{plan}</option>
                ))}
            </select>

            <label>Valor aceptado:</label>
            <input
                type="text"
                value={valorAceptado}
                onChange={(e)=>formatearDinero(e.target.value,setValorAceptado)}
                onBlur={()=>blurDinero(valorAceptado,setValorAceptado)}
                style={estiloInput}
            />

            <label>Valor final:</label>
            <input
                type="text"
                value={valorFinal}
                onChange={(e)=>formatearDinero(e.target.value,setValorFinal)}
                style={estiloInput}
                onBlur={()=>blurDinero(valorFinal,setValorFinal)}
            />

            <label>Nombre Asesor:</label>
            <input
            type="text"
                value={nombreAsesor} 
                onChange={e=>setNombreAsesor(e.target.value)}
                style={estiloInput} />

            <label>Fecha oferta:</label>
            <input 
                type="date" 
                value={fechaOferta} 
                onChange={e=>setFechaOferta(e.target.value)}
                style={estiloInput} />

            <label>¿Desea agregar comentario adicional?</label>
            <select
                value={agregarComentario}
                onChange={(e) => {
                    const valor = e.target.value;
                    setAgregarComentario(valor);

                    if (valor === "no") {
                        setComentarioAdicional("");
                    }
                }}
                
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontFamily: "Century Gothic, Arial"
                }}
            >
                <option value="no">No</option>
                <option value="si">Sí</option>
            </select>

            {agregarComentario === "si" && (
                <>
                    <label>Comentario:</label>
                    <textarea
                        value={comentarioAdicional}
                        onChange={(e) => setComentarioAdicional(e.target.value)}
                        rows={3}
                        style={{ 
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            marginBottom: "20px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontFamily: "Century Gothic, Arial",
                            resize: "none"
                        }}
                    />
                </>
            )}

            <button onClick={generar}
            style={{
                marginTop:"10px",
                background:"#39B54A",
                color:"#fff",
                padding:"12px",
                border:"none",
                borderRadius:"10px",
                fontWeight:"bold",
                cursor:"pointer"
            }}>
                Generar nota
            </button>
        </div>

    );
};

export default Upsell3PlaySin;