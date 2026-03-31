import {useState} from "react";
 const UpsellMovil = ({onGenerar}) => {

    const [nombre, setNombre] = useState("");
    const [planActual, setPlanActual] = useState ("");
    const [valorActual, setValorActual] = useState("");
    const [planNuevo, setPlanNuevo] = useState ("");
    const [valorNuevo, setValorNuevo] = useState ("");
    const [nombreAsesor, setNombreAsesor] = useState ("");
    const [fechaBoletin, setFechaBoletin] = useState ("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    // ===============================
    // PLANES MOVIL
    // ===============================
    const planesMovil = [
        "VOLT412",
        "VOLT520",
        "RED4050",
        "RED4560",
        "R4050OTT",
        "REDBAS",
        "RBASOTT",
        "REDPLUS",
        "RPLUOTT",
        "EXTREME",
        "REDCSF",
        "VREDBAS1",
        "VREDPLU1",
        "EXTREME1",
        "REDCSF1",
        "VOLCSF50",
        "VOLCSF60",
        "VOLCSF70",
        "REDCSF"
    ];

    // ===============================
    // FORMATO FECHA USA
    // ===============================
    const formatearFechaUSA = (fechaISO) => {
        if (!fechaISO) return "";
        const partes = fechaISO.split("-");
        return `${partes[1]}/${partes[2]}/${partes[0]}`;
    };

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

        if (enteros.length > 5) enteros = enteros.slice(0,5);
        if (decimales.length >2 ) decimales = decimales.slice(0, 2);

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

    //Input

    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

    const generar = () => {

        if (
            !nombre ||
            !planActual ||
            !planNuevo ||
            !valorNuevo ||
            !nombreAsesor ||
            !fechaBoletin
        ) {
            alert("Completa todos los campos obligatorios");
            return;
        }

        let nota = `Cliente titular: ${nombre} se realiza cambio de plan ${planActual} a ${planNuevo} con una renta final de $${valorNuevo} + IVU aproximadamente, cliente acepta cambio de plan y tendrá prorrateo en su primera factura únicamente, venta realizada por ${nombreAsesor} de Grupo Especializado, CLIENTE ORIENTADO DE CARGO DE PRORRATEO, BOLETIN VALIDO HASTA ${formatearFechaUSA(fechaBoletin)}. 00811.`
        
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

            <label>Plan actual:</label>
            <select value={planActual} onChange={e => setPlanActual(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                {planesMovil.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>

            <label>Valor plan actual:</label>
            <input
                value={valorActual}
                onChange={(e)=>formatearDinero(e.target.value,setValorActual)}
                onBlur={()=>blurDinero(valorActual,setValorActual)}
                style={estiloInput}
            />

            <label>Plan nuevo:</label>
            <select value={planNuevo} onChange={e => setPlanNuevo(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
                {planesMovil.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>

            <label>Valor plan nuevo:</label>
            <input
                value={valorNuevo}
                onChange={(e)=>formatearDinero(e.target.value,setValorNuevo)}
                onBlur={()=>blurDinero(valorNuevo,setValorNuevo)}
                style={estiloInput}
            />

            <label>Nombre asesor:</label>
            <input value={nombreAsesor} onChange={e=>setNombreAsesor(e.target.value)} style={estiloInput} />

            <label>Fecha boletín:</label>
            <input type="date" value={fechaBoletin} onChange={e=>setFechaBoletin(e.target.value)} style={estiloInput} />

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

 export default UpsellMovil;