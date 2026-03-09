import { useState } from "react";

const NoInteresSatisfecho = ({onGenerar}) => {

    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================

    const [nombre, setNombre] = useState("");
    const [velocidadOferta, setVelocidadOferta] = useState("");
    const [unidadOferta, setUnidadOferta] = useState("MB");
    const [valorOferta, setValorOferta] = useState("");
    const [velocidadActual, setvelocidadActual] = useState("");
    const [unidadActual, setUnidadActual] = useState("MB");
    const [valorActual, setValorActual] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    //Función que genera la nota final
    const generar = () => {
        
    // Validación obligatoria
    if (!nombre || !velocidadOferta || !valorOferta || !velocidadActual || !valorActual) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    let nota = `- Contacto efectivo con titular ${nombre}. Se ofrece upgrade a ${velocidadOferta} ${unidadOferta} con el valor de $${parseFloat(valorOferta).toFixed(2)}. Cliente manifiesta satisfacción con su plan actual de ${velocidadActual} ${unidadActual} con un valor de $${parseFloat(valorActual).toFixed(2)} y no percibe necesidad de mayor ancho de banda por el momento.

Perfil de uso: básico (solo navegación).`;

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
        <div style = {{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "15px",
        }}>

            {/* Nombrer Titular */}
             <label>Nombre titular:</label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC", fontFamily: "Century Gothic, Arial"}}
            />

                {/* Velocidad Ofertada */}
                <label>Velocidad Ofertada:</label>

                <div style={{display: "flex", gap: "10px"}}>

                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={velocidadOferta}
                        onChange={(e) => {

                            const soloDigitos = e.target.value.replace(/\D/g, '');

                            if (soloDigitos === '') {
                                setVelocidadOferta('');
                                return;
                            }

                            if (soloDigitos.length > 3) return;

                            const numero = parseInt(soloDigitos, 10);

                            if (unidadOferta === "MB") {
                                if (numero >= 1 && numero <= 999) {
                                    setVelocidadOferta(numero.toString());
                                }
                            } else if (unidadOferta === "GB") {
                                if (numero === 1) {
                                    setVelocidadOferta("1");
                                }
                            }

                        }}
                        onBlur={() => {

                            if (velocidadOferta === '' || parseInt(velocidadOferta, 10) === 0) {

                                if (unidadOferta === "GB") {
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

                    {/*Selector de MB y GB */}
                    
                    <select
                        value={unidadOferta}
                        onChange={(e) => {

                            const nuevaUnidad = e.target.value;
                            setUnidadOferta(nuevaUnidad);

                            if (nuevaUnidad === "GB") {
                                setVelocidadOferta("1");
                            }

                        }}
                        style={{ padding: "10px", borderRadius: "8px"}}
                    >
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>
                    </select>

                </div>

            {/* Valor Ofertado */}
            <label>Valor plan ofertado ($):</label>
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

            {/* Velocidad Actual */}
            <label>Velocidad Actual:</label>

            <div style={{display:"flex", gap:"10px"}}>

                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={velocidadActual}
                    onChange={(e) => {

                        const soloDigitos = e.target.value.replace(/\D/g, '');

                        if (soloDigitos === '') {
                            setvelocidadActual('');
                            return;
                        }

                        if (soloDigitos.length > 3) return;

                        const numero = parseInt(soloDigitos, 10);

                        if (unidadActual === "MB") {
                            if (numero >= 1 && numero <= 999) {
                                setvelocidadActual(numero.toString());
                            }
                        } else if (unidadActual === "GB") {
                            if (numero === 1) {
                                setvelocidadActual("1");
                            }
                        }

                    }}
                    onBlur={() => {

                        if (velocidadActual === '' || parseInt(velocidadActual, 10) === 0) {

                            if (unidadActual === "GB") {
                                setvelocidadActual("1");
                            } else {
                                setvelocidadActual("1");
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

                {/*Selector de MB y GB */}
                <select
                    value={unidadActual}
                    onChange={(e) => {

                        const nuevaUnidad = e.target.value;
                        setUnidadActual(nuevaUnidad);

                        if (nuevaUnidad === "GB") {
                            setvelocidadActual("1");
                        }

                    }}
                    style={{padding: "10px", borderRadius: "8px"}}
                >
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                </select>
            </div>

            {/* Valor Actual */}
            <label>Valor del plan actual ($):</label>
            <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*\.?[0-9]*"
                placeholder="ej: 99.99"
                value={valorActual}
                onChange={(e) => {
                    let valorLimpio = e.target.value
                    .replace(/[^\d.]/g, '')
                    .replace(/(\..*)\./g, '$1');

                    if (valorLimpio === '' || valorLimpio === '.') {
                    setValorActual(valorLimpio);
                    return;
                    }

                    const partes = valorLimpio.split('.');
                    let enteros = partes[0];
                    let decimales = partes[1] || '';

                    if (enteros.length > 5) enteros = enteros.slice(0, 5);
                    if (decimales.length > 2) decimales = decimales.slice(0, 2);

                    const tienePunto = valorLimpio.includes('.');
                    setValorActual(tienePunto ? `${enteros}.${decimales}` : enteros);
                }}

                onBlur={(e) => {
                    const valor = e.target.value;
                    if (valor === '' || valor === '.') return; // ❌ SIN valor por defecto

                    if (!valor.includes('.')) {
                    setValorActual(`${parseInt(valor, 10)}.00`);
                    return;
                    }

                    const partes = valor.split('.');
                    let enteros = partes[0];
                    let decimales = partes[1] || '';

                    if (enteros === '') {
                    enteros = decimales;
                    decimales = '00';
                    } else {
                    enteros = enteros.replace(/^0+/, '') || '0';
                    decimales = decimales.padEnd(2, '0').slice(0, 2);
                    }

                    setValorActual(`${enteros}.${decimales}`);
                }}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC" }}
            />

            <label>¿Desea agregar comentario adicional?</label>
            <select
                value={agregarComentario}
                onChange={(e) => setAgregarComentario(e.target.value)}
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
                marginTop: "10px",
                background: "#39B54A",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
            }}>
                Generar nota
            </button>
        </div>
    );
};

export default NoInteresSatisfecho;