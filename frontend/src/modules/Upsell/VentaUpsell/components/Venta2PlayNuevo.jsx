import {useState} from "react";

const Venta2PlayNuevo = ({ onGenerar}) => {

    //Estados

    const [nombre, setNombre] = useState("");
    const [velocidadContratada, setVelocidadContratada] = useState("");
    const [valorNuevo, setValorNuevo] = useState("");
    const [valorFinal, setValorFinal] = useState("");
    const [fechaBoletin, setFechaBoletin] = useState("");
    const [numeroOrden, setNumeroOrden] = useState("");
    const [mesesContrato, setMesesContrato] = useState("");
    const [nombreAsesor, setNombreAsesor] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    //Planes de internet

    const planesInternet =[
        "30M GPON PRUS",
        "50M GPON PRUS",
        "100M GPON PRUS",
        "300M GPON PRUS",
        "600M GPON PRUS",
        "1GB GPON PRUS"
    ];

    //Penalidad Fee 2Play

    const penalidad2Play = {
        "24": "6.25",
        "12": "12.50"
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

    if (enteros.lenght > 5) enteros = enteros.slice(0, 5);
    if (decimales.lenght >2) decimales = decimales.slice(0, 2);

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
        !valorNuevo ||
        !valorFinal ||
        !fechaBoletin ||
        !numeroOrden ||
        !mesesContrato ||
        !nombreAsesor
    ) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    let nota = `Cliente Titular ${nombre} acepta servicio 2Play plan ${velocidadContratada} de $${valorNuevo} este incluye telefonía ILIM PR +LD +50minutos Multi-Destino, 9 servicios verticales, libre de costo de activación y módem, se orienta verá en la primera factura $20.00 de depósito + cargos fraccionables, Renta final de $${valorFinal} + IVU, orientado de contrato a ${mesesContrato} meses, penalidad de $${penalidad2Play[mesesContrato]} por cada mes restante por cancelación temprana, se le orienta verá cargos de prorrateo en su próxima factura e instalación de 5 a 7 días laborables, 
venta realizada por Grupo especializado ${nombreAsesor} Oferta vigente hasta el ${formatearFechaUSA(fechaBoletin)}, según boletín. 71136 INSIGHT. Order number is ${numeroOrden}.`;

    // 🔹 Solo agregamos esto
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

            <label>Velocidad contratada:</label>
            <select value={velocidadContratada} onChange={e => setVelocidadContratada(e.target.value)} style={estiloInput}>
                <option value="">Seleccione plan...</option>
                {planesInternet.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>

            <label>Valor plan:</label>
            <input
                value={valorNuevo}
                onChange={(e)=>formatearDinero(e.target.value,setValorNuevo)}
                onBlur={()=>blurDinero(valorNuevo,setValorNuevo)}
                style={estiloInput}
            />

            <label>Valor final:</label>
            <input
                value={valorFinal}
                onChange={(e)=>formatearDinero(e.target.value,setValorFinal)}
                onBlur={()=>blurDinero(valorFinal,setValorFinal)}
                style={estiloInput}
            />

            <label>Meses contrato:</label>
            <select value={mesesContrato} onChange={e=>setMesesContrato(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
            </select>

            <label>Fecha boletín:</label>
            <input type="date" value={fechaBoletin} onChange={e=>setFechaBoletin(e.target.value)} style={estiloInput} />
            
            <label>Nombre asesor:</label>
            <input value={nombreAsesor} onChange={e=>setNombreAsesor(e.target.value)} style={estiloInput} />


            <label>Número orden:</label>
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

export default Venta2PlayNuevo;