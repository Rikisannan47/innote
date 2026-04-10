import { useState } from "react";

const NoInteresSatisfecho = ({ onGenerar }) => {

    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================

    const [nombre, setNombre] = useState("");
    
    // Estados para Oferta
    const [isIlimitadoOferta, setIsIlimitadoOferta] = useState(false);
    const [velocidadOferta, setVelocidadOferta] = useState("");
    const [unidadOferta, setUnidadOferta] = useState("MB");
    const [valorOferta, setValorOferta] = useState("");

    // Estados para Actual
    const [isIlimitadoActual, setIsIlimitadoActual] = useState(false);
    const [velocidadActual, setvelocidadActual] = useState("");
    const [unidadActual, setUnidadActual] = useState("MB");
    const [valorActual, setValorActual] = useState("");

    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    // Función que genera la nota final
    const generar = () => {

        // Validación de las velocidades si es ilimitado o no.
        const vOfertaValida = isIlimitadoOferta || velocidadOferta;
        const vActualValida = isIlimitadoActual || velocidadActual;
        
        // Validación obligatoria
        if (!nombre || !vOfertaValida || !valorOferta || !vActualValida || !valorActual) {
            alert("Completa todos los campos obligatorios");
            return;
        }

        // Definir qué texto mostrar en la nota (Lógica de Ilimitado)
        const textoVelocidadOferta = isIlimitadoOferta ? "ilimitado" : `${velocidadOferta} ${unidadOferta}`;
        const textoVelocidadActual = isIlimitadoActual ? "ilimitado" : `${velocidadActual} ${unidadActual}`;

        let nota = `- Contacto efectivo con titular ${nombre}. Se ofrece upgrade a ${textoVelocidadOferta} con el valor de $${parseFloat(valorOferta).toFixed(2)}. Cliente manifiesta satisfacción con su plan actual de ${textoVelocidadActual} con un valor de $${parseFloat(valorActual).toFixed(2)} y no percibe necesidad de mayor ancho de banda por el momento.

Perfil de uso: básico (solo navegación).`;

        // 🔹 Comentario opcional
        if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
            nota += `\n\nComentario adicional:\n${comentarioAdicional.trim()}`;
        }

        nota += `\n\n- Campaña: Grupo Especializado.`;

        onGenerar(nota);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "15px",
        }}>

            {/* Nombre Titular */}
            <label>Nombre titular:</label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC", fontFamily: "Century Gothic, Arial" }}
            />

            {/* --- SECCIÓN VELOCIDAD OFERTADA --- */}
            <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "10px", border: "1px solid #eee" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "bold", marginBottom: "8px" }}>
                    <input 
                        type="checkbox" 
                        checked={isIlimitadoOferta} 
                        onChange={(e) => setIsIlimitadoOferta(e.target.checked)} 
                    />
                    ¿Se le ofrece plan ilimitado?
                </label>

                <label>Velocidad Ofertada:</label>
                <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                    {isIlimitadoOferta ? (
                        <input
                            type="text"
                            value="Ilimitado"
                            readOnly
                            style={{ width: "100%", flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #CCC", background: "#e9e9e9", fontWeight: "bold" }}
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={velocidadOferta}
                                onChange={(e) => {
                                    const soloDigitos = e.target.value.replace(/\D/g, '');
                                    if (soloDigitos === '') { setVelocidadOferta(''); return; }
                                    if (soloDigitos.length > 3) return;
                                    
                                    const numero = parseInt(soloDigitos, 10);
                                    if (numero >= 1 && numero <= 999) {
                                        setVelocidadOferta(numero.toString());
                                    }
                                }}
                                style={{ width: "100%", flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #CCC" }}
                            />
                            <select
                                value={unidadOferta}
                                onChange={(e) => setUnidadOferta(e.target.value)}
                                style={{ padding: "10px", borderRadius: "8px" }}
                            >
                                <option value="MB">MB</option>
                                <option value="GB">GB</option>
                            </select>
                        </>
                    )}
                </div>
            </div>

            {/* Valor Ofertado */}
            <label>Valor plan ofertado ($):</label>
            <input
                type="text"
                inputMode="decimal"
                value={valorOferta}
                onChange={(e) => {
                    let valordecimal = e.target.value.replace(/[^\d.]/g,'').replace(/(\..*)\./g,'$1');
                    if (valordecimal === '' || valordecimal === '.') { setValorOferta(valordecimal); return; }
                    const partes = valordecimal.split('.');
                    let enteros = partes[0].slice(0, 5);
                    let decimales = (partes[1] || '').slice(0, 2);
                    setValorOferta(valordecimal.includes('.') ? `${enteros}.${decimales}` : enteros);
                }}
                onBlur={() => {
                    if (valorOferta === '' || valorOferta === '.') return;
                    setValorOferta(parseFloat(valorOferta).toFixed(2));
                }}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC" }}
            />

            {/* --- SECCIÓN VELOCIDAD ACTUAL --- */}
            <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "10px", border: "1px solid #eee" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "bold", marginBottom: "8px" }}>
                    <input 
                        type="checkbox" 
                        checked={isIlimitadoActual} 
                        onChange={(e) => setIsIlimitadoActual(e.target.checked)} 
                    />
                    ¿Tiene plan ilimitado?
                </label>

                <label>Velocidad Actual:</label>
                <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                    {isIlimitadoActual ? (
                        <input
                            type="text"
                            value="Ilimitado"
                            readOnly
                            style={{ width: "100%", flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #CCC", background: "#e9e9e9", fontWeight: "bold" }}
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={velocidadActual}
                                onChange={(e) => {
                                    const soloDigitos = e.target.value.replace(/\D/g, '');
                                    if (soloDigitos === '') { setvelocidadActual(''); return; }
                                    if (soloDigitos.length > 3) return;

                                    const numero = parseInt(soloDigitos, 10);
                                    if (numero >= 1 && numero <= 999) {
                                        setvelocidadActual(numero.toString());
                                    }
                                }}
                                style={{ width: "100%", flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #CCC" }}
                            />
                            <select
                                value={unidadActual}
                                onChange={(e) => setUnidadActual(e.target.value)}
                                style={{ padding: "10px", borderRadius: "8px" }}
                            >
                                <option value="MB">MB</option>
                                <option value="GB">GB</option>
                            </select>
                        </>
                    )}
                </div>
            </div>

            {/* Valor Actual */}
            <label>Valor del plan actual ($):</label>
            <input
                type="text"
                inputMode="decimal"
                value={valorActual}
                onChange={(e) => {
                    let valorLimpio = e.target.value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
                    if (valorLimpio === '' || valorLimpio === '.') { setValorActual(valorLimpio); return; }
                    const partes = valorLimpio.split('.');
                    let enteros = partes[0].slice(0, 5);
                    let decimales = (partes[1] || '').slice(0, 2);
                    setValorActual(valorLimpio.includes('.') ? `${enteros}.${decimales}` : enteros);
                }}
                onBlur={() => {
                    if (valorActual === '' || valorActual === '.') return;
                    setValorActual(parseFloat(valorActual).toFixed(2));
                }}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #CCC" }}
            />

            {/* Comentario Adicional */}
            <label>¿Desea agregar comentario adicional?</label>
            <select
                value={agregarComentario}
                onChange={(e) => setAgregarComentario(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontFamily: "Century Gothic, Arial" }}
            >
                <option value="no">No</option>
                <option value="si">Sí</option>
            </select>

            {agregarComentario === "si" && (
                <textarea
                    value={comentarioAdicional}
                    onChange={(e) => setComentarioAdicional(e.target.value)}
                    rows={3}
                    style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc", fontFamily: "Century Gothic, Arial", resize: "none" }}
                />
            )}

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