import {useState} from "react";

//Componente No Disponible
//Recibe la función onGenerar desde el padre (UpsellFormReview)
const NoDisponible = ({onGenerar}) => {

    // ===============================
    // ====ESTADOS DEL FORMULARIO=====
    // ===============================
    
    const [quienAtiende, setQuienAtiende] = useState (""); 
    const [parentesco, setParentesco] = useState ("");
    const [jornada, setJornada] = useState ("");
    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    //Función que genera la nota final
    const generarNota = () => {

        if (!quienAtiende || !parentesco || !jornada) {
            alert("Complete todos los campos obligatorios ⚠️");
            return;
        }

        //Construcción de la nota en formato CRM
        let nota = `- Contacto fallido.
Atiende ${quienAtiende}, ${parentesco}, indica que
el titular no se encuentra.
No se brinda información sensible.
Reintentar en la ${jornada}.`;

if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
    nota += `

- Comentario adicional:
${comentarioAdicional}`;
}

nota += `

- Campaña: Grupo Especializado.`;

onGenerar(nota);
    }; // Se envia la nota al componente padre (modal)

    return (
        <div style={{ marginTop: "20px"}}>

            {/* Campo quien atiende */}
            <label>Quién atiende:</label>
            <input
            type="text"
            value={quienAtiende}
            onChange={(e) => setQuienAtiende(e.target.value)}
            style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid  #ccc",
                fontFamily: "Century Gothic, Arial"
            }}
            />

            {/* Campo Parentesco */}
            <label>Parentesco:</label>
            <input
                type="text"
                value={parentesco}
                onChange={(e) => setParentesco(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontFamily: "Century Gothic, Arial"
                }}
                />

            {/* Jornada */}
            <label>Jornada de reintento:</label>
            <select
                value={jornada}
                onChange={(e) => setJornada(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontFamily: "Century Gothic, Arial"               
                    }}>
                    <option value="">Seleccione...</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option> 
            </select>

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
                onClick={generarNota}
                style={{
                    width: "100%",
                    background: "#39B54A",
                    color: "#fff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}>
                    Generar nota
            </button>

        </div>
    );
};

export default NoDisponible;