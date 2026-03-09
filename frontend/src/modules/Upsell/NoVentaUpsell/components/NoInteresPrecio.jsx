import {useState} from "react";

const NoInteresPrecio = ({onGenerar}) => {

    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================

    const [nombre, setNombre] = useState("");
    const [velocidadOferta, setVelocidadOferta] = useState("");
    const [unidad, setUnidad] = useState("MB");
    const [valorOferta, setValorOferta] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    //Función que genera la nota final
    const generar = () => {

    if (!nombre || !velocidadOferta || !valorOferta) {
        alert("Complete los campos obligatorios");
        return;
    }

    let nota = `- Contacto efectivo con titular ${nombre}. Se ofrece propuesta de valor para aumento de velocidad a ${velocidadOferta} ${unidad} con un valor de $${parseFloat(valorOferta).toFixed(2)}. Cliente rechaza por presupuesto limitado, indicando que prioriza mantener su renta mensual actual.

Se recomienda re-contactar cuando existan promociones de lealtad o descuentos por empaquetamiento (Claro Full).`;

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
        <div style={{marginTop: "20px"}}>

            {/* Nombre Titular*/}
            <label>Nombre titular:</label>
            <input
            type="text"
            value={nombre}
            onChange={(e) =>setNombre(e.target.value)}
            style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                fontFamily: "Century Gothic, Arial",
                borderRadius: "8px"
            }}
            />

        {/* Velocidad Ofertada */}

        <label>Velocidad ofertada:</label>

        <div style={{display:"flex", gap: "10px"}}>

                {/* Número entero */}
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={velocidadOferta}

                    onChange={(e) => {

                        // 1️⃣ Extraer solo números
                        const soloDigitos = e.target.value.replace(/\D/g, '');

                        // 2️⃣ Si queda vacío, limpiar
                        if (soloDigitos === '') {
                            setVelocidadOferta('');
                            return;
                        }

                        // 3️⃣ Limitar a máximo 3 dígitos
                        if (soloDigitos.length > 3) return;

                        // 4️⃣ Convertir a número
                        const numero = parseInt(soloDigitos, 10);

                        // 5️⃣ Validar según unidad
                        if (unidad === "MB") {

                            if (numero >= 1 && numero <= 999) {
                                setVelocidadOferta(numero.toString());
                            }

                        } else if (unidad === "GB") {

                            if (numero === 1) {
                                setVelocidadOferta("1");
                            }

                        }

                    }}

                    onBlur={() => {

                        if (velocidadOferta === '' || parseInt(velocidadOferta, 10) === 0) {

                            if (unidad === "GB") {
                                setVelocidadOferta("1");
                            } else {
                                setVelocidadOferta("1");
                            }

                        }

                    }}

                    style={{
                        width: "100%",
                        flex: 1,
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        border: "1px solid #CCC"
                    }}
                />

                {/* Selector MB o GB */}
                <select
                    value={unidad}
                    onChange={(e) => {

                        const nuevaUnidad = e.target.value;
                        setUnidad(nuevaUnidad);

                        // 🔥 Si cambia a GB → forzar 1
                        if (nuevaUnidad === "GB") {
                            setVelocidadOferta("1");
                        }

                        // 🔥 Si cambia a MB y estaba vacío → poner 1
                        if (nuevaUnidad === "MB" && velocidadOferta === "") {
                            setVelocidadOferta("1");
                        }

                    }}
                    style={{padding:"10px"}}
                >
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                </select>

            </div>
        {/*Valor del plan ofertado*/}
        <label style={{marginTop: "10px", display:"block"}}>
            Valor del plan ofertado ($)
        </label>
         <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*\.?[0-9]*"
                placeholder="ej: $120.99"
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

        {/* Botón Generar */}
        <button
            onClick={generar}
            style={{
                marginTop:"15px",
                background:"#39B54A",
                color: "#FFF",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor:"pointer",
                fontWewight:"bold",
                width:"100%"
            }}
        >
            Generar nota
        </button>

        </div>
    );
};

export default NoInteresPrecio;