import { useState } from "react";

const Seguimiento = ({onGenerar}) => {

    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================

    const [nombre, setNombre] = useState ("");
    const [ban, setBan] = useState (""); 
    const [plan, setPlan] = useState("");
    const [costo, setCosto] = useState("");
    const [razon, setRazon] = useState ("");
    const [compId, setCompId] = useState("");
    const[asesor, setAsesor] = useState("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    //Función que genera la nota final
    const generar = () => {

    if (!nombre || !ban || !plan || !costo || !razon || !asesor) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    // Validar BAN 9 dígitos
    if (!/^[0-9]{9}$/.test(ban)) {
        alert("El BAN debe tener 9 dígitos");
        return;
    }

    if (!compId) {
        alert("Debe seleccionar un COMP ID");
        return;
    }

    let nota = `- Seguimiento de gestión.

Titular/autorizado: ${nombre}
BAN: ${ban}
Plan ofertado: ${plan}
Nuevo costo mensual: $${parseFloat(costo).toFixed(2)}
Razón de seguimiento: ${razon}
COMP ID: ${compId}
Asesor: ${asesor}`;

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
    <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "15px",
    }}>

        {/* Nombre */}
        <label>Nombre Titular/autorizado:</label>
        <input
            type="text"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            style={{padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}
        />

        {/*BAN*/}
        <label>BAN:</label>
        <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={ban}
            onChange={(e)=> {
            // 1. Extraer solo dígitos (elimina letras, guiones, espacios, etc.)
            const soloDigitos = e.target.value.replace(/\D/g, '');

            // 2. Si después de limpiar no queda nada, podemos poner cadena vacía
                if (soloDigitos === '') {
                    setBan('');
                        return;
                }

            // // 3. Limitar a 3 dígitos
                if (soloDigitos.length > 9) return;

            // 4. Convertir a número y validar rango 1-999
                const numero = parseInt(soloDigitos, 10);
                if (numero >= 1 && numero <= 999999999) {
            // Opcional: eliminar ceros a la izquierda (ej: "012" → "12")
                setBan(numero.toString());
                    }
                }

            }

            onBlur={(e) => {
            // Si el campo queda vacío o con valor 0, asignamos "1" por defecto
                const valorActual = ban;
                if (valorActual === '' || parseInt(valorActual, 10) === 0) {
                 setBan('');
                    }
                }}

            style={{padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}
        />

        {/*Plan*/}
        <label>Plan ofertado:</label>
        <input
            type="text"
            value={plan}
            onChange={(e)=>setPlan(e.target.value)}
            style={{padding: "10px", borderRadius:"8px", border: "1px solid #ccc"}}
        />

        {/* Costo */}

        <label>Costo del nuevo plan($):</label>
        <input
        type="number"
        step="0.01"
        value={costo}
        placeholder="ej: 60.00"
        onChange={(e)=>setCosto(e.target.value)}
        style={{padding:"10px", borderRadius:"8px", border:"1px solid #CCC"}}
        />

        {/*Razón*/}
        <label>Razón de seguimiento:</label>
        <input
            type="text"
            value={razon}
            onChange={(e)=>setRazon(e.target.value)}
            style={{padding: "10px", borderRadius:"8px", border:"1px solid #ccc"}}
        />

        {/*COMP ID*/}
        <label>COMP ID:</label>
        <select
            value={compId}
            onChange={(e)=>setCompId(e.target.value)}
            style={{padding:"10px", borderRadius:"8px"}}
        >
            <option value="">Seleccione COMP ID...</option>
            <option value="71136">71136</option>
            <option value="00811">00811</option>
        </select>

        {/* Asesor */}
        <label>Asesor:</label>
        <input
            type="text"
            value={asesor}
            onChange={(e)=>setAsesor(e.target.value)}
            style={{padding: "10px", borderRadius:"8px", border: "1px solid #ccc"}}
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

        {/*Botón*/}
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
        );
};

export default Seguimiento;