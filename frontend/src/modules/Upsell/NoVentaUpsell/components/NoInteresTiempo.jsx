import {useState} from "react";

const NoInteresTiempo = ({ onGenerar}) => {

    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================

    const [nombre, setNombre] = useState ("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState ("");
    const [mencionoPrecio, setMencionoPrecio] = useState("");
    const [velocidadOferta, setVelocidadOferta] = useState("");
    const [unidadOferta, setUnidadOferta] = useState("MB");
    const [valorOferta, setValorOferta] = useState ("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    //Función que formatea la fecha al formato gringo
    const formatearFechaUSA = (fechaISO) => {
        if (!fechaISO) return "";

        const partes = fechaISO.split("-"); //YYYY-MM-DD
        const year = partes [0];
        const month = partes [1];
        const day = partes [2];

        return `${month}/${day}/${year}`; // MM/DD/YYYY
    }

    //Función que formatea al modo 12 horas
    const formetearHora12 = (hora24) => {
        if (!hora24) return "";

        let [hora, minutos] = hora24.split(":");
        hora = parseInt(hora);

        const ampm = hora >= 12 ? "PM" : "AM";
        hora = hora % 12;

        if (hora === 0) hora = 12; // 0 = 12 AM o 12 PM

        return `${hora}:${minutos} ${ampm}` 

    }

    //Luego generamos la Nota

    const generar = () => {

    if (!nombre || !fecha || !hora) {
        alert("Completa todos los campos obligatorios");
        return; 
    }

    let nota;

if (mencionoPrecio === "si") {

    nota = `Titular ${nombre}, interesado en escuchar la oferta pero solicita rellamada por falta de tiempo. Se le ofrece ${velocidadOferta}${unidadOferta} con un valor de $${valorOferta}. No Interesado por falta de tiempo (Llamada en mal momento). Programar seguimiento para el ${formatearFechaUSA(fecha)} a las ${formetearHora12(hora)}. – Grupo Especializado`;

} else if (mencionoPrecio === "no") {

    nota = `Titular ${nombre}, interesado en escuchar la oferta pero solicita rellamada por falta de tiempo. No se entró en detalles de precios. Programar seguimiento para el ${formatearFechaUSA(fecha)} a las ${formetearHora12(hora)}. – Grupo Especializado`;

} else {
    alert("Debes indicar si se mencionó precio");
    return;
}

// 🔹 SOLO agregamos esto
if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
    nota += `

Comentario adicional:
${comentarioAdicional.trim()}`;
}

onGenerar(nota);
};
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "15px"
        }}>

            {/* Nombre Titular */}
            <div>
                <label>Nombre titular:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginTop: "5px",
                        fontFamily: "Century Gothic, Arial"
                    }}
                />
            </div>

            {/* Fecha Callback */}

            <div>
                <label>Fecha Callback</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e)=>setFecha(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginTop: "5px"
                        }}
                    />
            </div>

            {/* Hora Callback */}

            <div>
                <label>Hora callback:</label>
                <input
                    type="time"
                    value={hora}
                    onChange={(e)=>setHora(e.target.value)}
                    style={{
                        width: "100%",
                        padding:"10px",
                        borderRadius: "8px",
                        border:"1px, solid #ccc",
                        marginTop:"5px"
                    }}
                />
            </div>
            
            {/* ¿Se mencionó precio? */}

            <div>
                <label>¿Se mencionó precio al cliente?</label>
                <select
                    value={mencionoPrecio}
                    onChange={(e) => setMencionoPrecio(e.target.value)}
                    style={{width: "100%", padding: "10px", marginBottom: "15px", borderRadius:"8px"}}>
                    <option value="">Seleccione...</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
             </div>

                {mencionoPrecio === "si" && (
                    <>
                    
            {/* Velocidad Ofertada */}
            <label>Velocidad Ofertada:</label>
            <div style={{display:"flex", gap:"10px"}}>  
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={velocidadOferta}
                    onChange={(e) => {
                              // 1. Extraer solo dígitos (elimina letras, guiones, espacios, etc.)
                              const soloDigitos = e.target.value.replace(/\D/g, '');

                              // 2. Si después de limpiar no queda nada, podemos poner cadena vacía
                              if (soloDigitos === '') {
                                setVelocidadOferta('');
                                return;
                              }

                              // 3. Convertir a número y validar rango 1-999
                              const numero = parseInt(soloDigitos, 10);
                              if (unidadOferta === "MB") {

                                 if (numero >= 1 && numero <= 999) {
                              // Opcional: eliminar ceros a la izquierda (ej: "012" → "12")
                                setVelocidadOferta(numero.toString());
                                }
                              } else if (unidadOferta === "GB") {
                                if (numero === 1) {
                                    setVelocidadOferta("1");
                                }
                              }
                            }}

                        onBlur={() => {
                            // Si el campo queda vacío o con valor 0, asignamos "1" por defecto
                            if (velocidadOferta === '' || parseInt(velocidadOferta, 10) === 0) {

                                if (unidadOferta === "GB") {
                                    setVelocidadOferta("1");
                                } else {
                                    setVelocidadOferta("1");
                            }
                        }
                    }}

                    style={{width: "100%", flex: 1, padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC"}}
                />

                {/* Selector MB o GB */}
                    <select
                        value={unidadOferta}
                        onChange={(e) => {

                            const nuevaUnidad = e.target.value;
                            setUnidadOferta(nuevaUnidad);

                            // 🔥 Si cambia a GB, forzar valor 1
                            if (nuevaUnidad === "GB") {
                                setVelocidadOferta("1");
                            }

                            // 🔥 Si cambia a MB y el valor estaba vacío, poner 1
                            if (nuevaUnidad === "MB" && velocidadOferta === "") {
                                setVelocidadOferta("1");
                            }

                        }}
                        style={{padding: "10px", borderRadius: "8px"}}
                    >
                        <option>MB</option>
                        <option>GB</option>
                    </select>
            </div>
                    

                        {/* valor Plan */}
            <div>
                <label>Valor Plan ofertado:</label>
            <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*\.?[0-9]*"
                placeholder="ej: 120.99"
                value={valorOferta}
                onChange={(e) => {
                
                let valordecimal = e.target.value
                    .replace(/[^\d.]/g,'')
                    .replace(/(\..*)\./g,'$1');

                if ( valordecimal === '' || valordecimal === '.') {
                    setValorOferta(valordecimal);
                    return;
                }

                const partes = valordecimal.split('.');
                let enteros = partes[0];
                let decimales = partes[1] || '';

                if (enteros.length > 5) {
                    enteros = enteros.slice(0, 5);
                }

                if (decimales.length > 2) {
                    decimales = decimales.slice(0, 2);
                }
                const tienePunto = valordecimal.includes('.');
                const nuevoValor = tienePunto ? `${enteros}.${decimales}`:enteros;
                setValorOferta(nuevoValor);
                }}

                onBlur={(e) => {
                    const valor = e.target.value;
                    //Si esta vacío o solo .
                    if (valor === '' || valor === '.')
                        return;
                     //Si se digita 25 -> 25.00
                    if (!valor.includes('.')){
                        setValorOferta(`${parseInt(valor, 10)}.00`)
                        return;
                    }
                    
                    const partes = valor.split('.');
                    let enteros = partes[0];
                    let decimales = partes [1] || '';

                    // Si empieza con punto: .5 → "5.00"
                    if (enteros === '') {
                        enteros = decimales;
                        decimales = '00';
                    } else {
                        enteros = enteros.replace(/^0+/, '') || '0';
                        decimales =  decimales.padEnd(2, '0').slice(0, 2);
                    }

                setValorOferta(`${enteros}.${decimales}`);
                }}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC"}}
            />    
                </div>
            </>
        )}

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

            {/* Botón */}
            <button
                onClick={generar}
                style={{
                    marginTop:"10px",
                    background: "#39B54A",
                    color: "#fff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Generar nota
            </button>
        </div>
    )
}

export default NoInteresTiempo;