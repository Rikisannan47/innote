import { useState } from "react";

const ClaroTVNuevo = ({ onGenerar}) => {

    //Estados

    const [nombre, setNombre] = useState("");
    const [planVelocidad, setPlanVelocidad] = useState("");
    const [planNuevo, setPlanNuevo] = useState("");
    const [valorNuevo, setValorNuevo] = useState("");
    const [valorNuevoTV, setValorNuevoTV] = useState("");
    const [nombrePlan, setNombrePlan] = useState("");
    const [tieneDescuento, setTieneDescuento] = useState("");
    const [valorDescuento, setValorDescuento] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [nombreAsesor, setNombreAsesor] = useState("");
    const [fechaOferta, setFechaOferta] = useState("");
    const [mesesContrato, setMesesContrato] = useState("");
    const [precioPenalidad, setPrecioPenalidad] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");


    //Planes de Internet

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


    const planesInternetNuevos = [
        "30M GPON PRUS",
        "50M GPON PRUS",
        "100M GPON PRUS",
        "300M GPON PRUS",
        "600M GPON PRUS",
        "1GB GPON PRUS"
    ];

    //Formato Fecha Gringo

    const formatearFechaUSA = (fechaISO) => {
        if (!fechaISO) return "";
        const partes = fechaISO.split("-");
        return `${partes[1]}/${partes[2]}/${partes[0]}`;
    };

    //Formato de Dinero

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

    //Estilo Input

    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

     // GENERAR NOTA

      const generar = () => {

    if (
        !nombre ||
        !planVelocidad ||
        !planNuevo ||
        !valorNuevo ||
        !valorNuevoTV ||
        !nombrePlan ||
        !valorTotal ||
        !nombreAsesor ||
        !fechaOferta ||
        !mesesContrato ||
        !precioPenalidad
    ) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    //Agreagado de texto por si hay descuentos
    let textoDescuento = "";

    if (valorDescuento && valorDescuento.trim() !== "") {
        textoDescuento = ` luego descuento de $${valorDescuento}`;
    }

    let nota = `Cliente Titular ${nombre} acepta cambio de plan ${planVelocidad}  a Plan ${planNuevo} de $${valorNuevo} , más servicio nuevo ${nombrePlan} de $${valorNuevoTV}${textoDescuento} Oferta incluye telefonía ILIM PR +LD +50minutos Multi-Destino, Renta final $${valorTotal} + IVU, orientado de contrato a ${mesesContrato} meses, penalidad de $${precioPenalidad} por cada mes restante por cancelación temprana, se le orienta vera cargos de prorrateo en su próxima factura y caja STB de Claro TV gratis la recibirá por Island Wide de 24 a 48 horas, 
venta realizada por Grupo especializado ${nombreAsesor} vigente hasta el ${formatearFechaUSA(fechaOferta)}, según boletín. 71136 INSIGHT.`;

    // 🔹 SOLO agregamos esto
    if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
        nota += `

Comentario adicional:
${comentarioAdicional.trim()}`;
    }

    onGenerar(nota);
};

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <label>Nombre titular:</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} style={estiloInput} />

            <label>Plan velocidad actual:</label>
            <select value={planVelocidad} onChange={e => setPlanVelocidad(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                {planesInternetAnterior.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>

            <label>Plan nuevo:</label>
            <select value={planNuevo} onChange={e => setPlanNuevo(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                {planesInternetNuevos.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>

            <label>Nombre plan:</label>
            <input value={nombrePlan} onChange={e => setNombrePlan(e.target.value)} style={estiloInput} />

            <label>Valor internet:</label>
            <input value={valorNuevo}
                onChange={(e)=>formatearDinero(e.target.value,setValorNuevo)}
                onBlur={()=>blurDinero(valorNuevo,setValorNuevo)}
                placeholder="ej: 25.00"
                style={estiloInput} />

            <label>Valor Plan TV:</label>
            <input value={valorNuevoTV}
                onChange={(e)=>formatearDinero(e.target.value,setValorNuevoTV)}
                onBlur={()=>blurDinero(valorNuevoTV,setValorNuevoTV)}
                placeholder="ej: 99.99"
                style={estiloInput} />

            <label>¿Tiene descuento?</label>
                <select
                    value={tieneDescuento}
                    onChange={e=>setTieneDescuento(e.target.value)}
                    style={estiloInput}
                >
                    <option value="">Seleccione si tiene descuento...</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>

                {/* Si la respuesta es Sí, entonces, que muestre esto. */}
                    {tieneDescuento === "si" && (
                        <>
                            <label>Valor descuento:</label>
                            <input
                                type="text"
                                value={valorDescuento}
                                onChange={(e)=>formatearDinero(e.target.value,setValorDescuento)}
                                onBlur={()=>blurDinero(valorDescuento,setValorDescuento)}
                                placeholder="ej: 1.00"
                                style={estiloInput}
                            />
                        </>
                    )}

            <label>Valor total:</label>
            <input value={valorTotal}
                onChange={(e)=>formatearDinero(e.target.value,setValorTotal)}
                onBlur={()=>blurDinero(valorTotal,setValorTotal)}
                placeholder="ej: 59.99"
                style={estiloInput} />

            <label>Meses contrato:</label>
            <select value={mesesContrato} onChange={e=>setMesesContrato(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
            </select>
            
            <label>Precio penalidad:</label>
                    <select 
                        value={precioPenalidad} 
                        onChange={e => setPrecioPenalidad(e.target.value)} 
                        style={estiloInput}
                    >
                        <option value="">Seleccione...</option>
                        <option value="8.33">$8.33</option>
                        <option value="14.58">$14.58</option>
                        <option value="16.66">$16.66</option>
                    </select>

            <label>Nombre asesor:</label>
            <input value={nombreAsesor} onChange={e=>setNombreAsesor(e.target.value)} style={estiloInput} />

            <label>Fecha oferta:</label>
            <input type="date" value={fechaOferta} onChange={e=>setFechaOferta(e.target.value)} style={estiloInput} />

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
                    marginTop: "10px",
                    background: "#39B54A",
                    color: "#fff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}>
                Generar nota
            </button>

        </div>

    );
};

export default ClaroTVNuevo;