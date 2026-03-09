import { useState } from "react";

const Venta3PlayNuevo = ({ onGenerar}) => {

    //Estados

    const [nombre, setNombre] = useState("");
    const [velocidadContratada, setVelocidadContratada] = useState("");
    const [velocidadValor, setVelocidadValor] = useState ("");
    const [nombrePlanTv, setNombrePlanTv] = useState("");
    const [valorPlanTv, setValorPlanTv] = useState("");
    const [tieneDescuento, setTieneDescuento] = useState("");
    const [valorDescuento, setValorDescuento] = useState("");
    const [valorFinal, setValorFinal] = useState("");
    const [fechaBoletin, setFechaBoletin] = useState ("");
    const [numeroOrden, setNumeroOrden] = useState("");
    const [nombreAsesor, setNombreAsesor] = useState("");
    const [mesesContrato, setMesesContrato] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");


    //Planes de Internet

    const planesInternet = [
        "30M GPON PRUS",
        "50M GPON PRUS",
        "100M GPON PRUS",
        "300M GPON PRUS",
        "600M GPON PRUS",
        "1GB GPON PRUS"
    ];

    //Penalidad Fee 2Play

    const penalidad3Play = {
        "24": "14.58",
        "12": "29.16"
    };

    //Formato fecha gringa

    const formatearFechaUSA = (fechaISO) => {
        if (!fechaISO) return "";
        const partes = fechaISO.split("-");
        return `${partes[1]}/${partes[2]}/${partes[0]}`;
    };


    //Formato Dinero

    const formatearDinero = (valor, setValor) => {
        let val = valor
        .replace(/[^\d.]/g, '')
        .replace(/(\..*)\./g, '$1');

        if (val === '.') {
            setValor(val);
            return;
        }
   
    const partes = val.split('.');
    let enteros = partes[0];
    let decimales = partes [1] || '';

    if (enteros.length > 5) enteros = enteros.slice(0, 5);
    if (decimales.length >2) decimales = decimales.slice(0, 2);

    const tienePunto = val.includes('.');
    const nuevo = tienePunto ? `${enteros}.${decimales}` : enteros;
    setValor(nuevo);
     };


    const blurDinero = (valor, setValor) => {
        if (valor === '' || valor === '.') return;

        if (!valor.includes('.')) {
            setValor(`${parseInt(valor, 10)}.00`);
            return;
        };

        const partes = valor.split('.');
        let enteros = partes[0];
        let decimales = partes [1] || '';

        enteros = enteros.replace(/^0+/, '') || '0';
        decimales = decimales.padEnd(2, 0).slice(0, 2);

        setValor(`${enteros}.${decimales}`);
    };

    //Estilo input

    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

    //Generar Nota

     const generar = () => {

    if (
        !nombre ||
        !velocidadContratada ||
        !valorPlanTv ||
        !nombrePlanTv ||
        !valorFinal ||
        !fechaBoletin ||
        !numeroOrden ||
        !mesesContrato ||
        !nombreAsesor
    ) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    //Agreagado de texto por si hay descuento
    let textoDescuento = "";

    if (valorDescuento && valorDescuento.trim() !== "") {
        textoDescuento = ` luego descuento de $${valorDescuento}`;
    }

    let nota = `Cliente Titular ${nombre} acepta servicio 3play con plan ${velocidadContratada} de $${valorPlanTv} este incluye telefonía ILIM PR +LD +50minutos Multi-Destino, 9 servicios verticales más servicio de Claro TV ${nombrePlanTv} de $${valorPlanTv}${textoDescuento}, libre de costo de activación y módem, se orienta verá en la primera factura $20.00 de depósito + cargos fraccionables y caja STB de Claro TV gratis la recibirá por Island Wide luego de instalación de 24 a 48 horas, 
Renta final de $${valorFinal} + IVU, orientado de contrato a ${mesesContrato} meses, penalidad de $${penalidad3Play[mesesContrato]} por cada mes restante por cancelación temprana, se le orienta verá cargos de prorrateo en su próxima factura e instalación de 5 a 7 días laborables, venta realizada por Grupo especializado ${nombreAsesor} Oferta vigente hasta el ${formatearFechaUSA(fechaBoletin)}, según boletín. 71136 INSIGHT. Order number is ${numeroOrden}.`;

    // 🔹 Solo agregamos esto
    if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
        nota += `

Comentario adicional:
${comentarioAdicional.trim()}`;
    }

    onGenerar(nota);
};

    //La UI es lo que sigue
    return (
        <div style={{ display: "flex", flexDirection: "column"}}>

            {/* CAMPO DEL NOMBRE DEL TITULAR*/}
             <label>Nombre titular</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} style={estiloInput} />

            {/* CAMPO DE LA VELOCIDAD QUE SE CONTRATÓ */}
            <label>Velocidad contratada</label>
            <select value={velocidadContratada} onChange={e => setVelocidadContratada(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                {planesInternet.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>
            
            {/* CAMPO DEL VALOR DEL PLAN DE INTERNET OFERTADO */}
            <label>Valor internet</label>
            <input value={velocidadValor}
                onChange={(e)=>formatearDinero(e.target.value,setVelocidadValor)}
                onBlur={()=>blurDinero(velocidadValor,setVelocidadValor)}
                style={estiloInput}
            />

            {/* CAMPO DE NOMBRE DEL PLAN 3PLAY NUEVO */}
            <label>Nombre plan 3Play</label>
            <input value={nombrePlanTv} onChange={e=>setNombrePlanTv(e.target.value)} style={estiloInput} />
            
            {/* CAMPO DEL VALOR DEL PLAN 3PLAY NUEVO */}
            <label>Valor plan 3Play </label>
            <input value={valorPlanTv}
                onChange={(e)=>formatearDinero(e.target.value,setValorPlanTv)}
                onBlur={()=>blurDinero(valorPlanTv,setValorPlanTv)}
                style={estiloInput}
            />
            {/* CAMPO DE lOS DESCUENTOS */}
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

                {tieneDescuento === "si" && (
                    <>
                        <label>Valor descuento:</label>
                        <input
                            type="text"
                            value={valorDescuento}
                            onChange={(e)=>formatearDinero(e.target.value,setValorDescuento)}
                            onBlur={()=>blurDinero(valorDescuento,setValorDescuento)}
                            style={estiloInput}
                        />
                    </>
                )}

            {/* CAMPO DEL VALOR FINAL */}
            <label>Valor final</label>
            <input value={valorFinal}
                onChange={(e)=>formatearDinero(e.target.value,setValorFinal)}
                onBlur={()=>blurDinero(valorFinal,setValorFinal)}
                style={estiloInput}
            />

            {/* CAMPO DE LOS MESES CONTRATADOS */}
            <label>Meses contrato</label>
            <select value={mesesContrato} onChange={e=>setMesesContrato(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
            </select>

            {/* CAMPO DE LA FECHA */}
            <label>Fecha boletín</label>
            <input type="date" value={fechaBoletin} onChange={e=>setFechaBoletin(e.target.value)} style={estiloInput} />
            
            {/* CAMPO DEL NOMBRE DEL ASESOR UPSELL */}
            <label>Nombre asesor</label>
            <input value={nombreAsesor} onChange={e=>setNombreAsesor(e.target.value)} style={estiloInput} />
            
            {/* CAMPO DEL NÚMERO DE ORDEN */}
            <label>Número orden</label>
            <input value={numeroOrden} onChange={e=>setNumeroOrden(e.target.value)} style={estiloInput} />

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

export default Venta3PlayNuevo;