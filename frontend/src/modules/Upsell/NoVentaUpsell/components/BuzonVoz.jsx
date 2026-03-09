import {useState} from "react";

const BuzonVoz = ({ onGenerar}) => {

    const generar = () => {
        const nota = 
        `- Buzón de voz. Se intentará en horario alterno 
para validar interés en mejora de plan. 
- Campaña: Grupo Especializado.
        `;
        
        onGenerar(nota);
    };

    return (
        <div>
                <button
                onClick={generar}
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

export default BuzonVoz;