import { useState } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%"
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "15px",
  fontFamily: "Century Gothic"
};

const buttonStyle = {
  marginTop: "15px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#39B54A",
  color: "#fff",
  cursor: "pointer"
};

const ClaroHogarVenta = ({  onGenerar}) => {

    const [velocidadOferta, setVelocidadOferta] = useState("");
    const [unidad, setUnidad] = useState("MB");
    const [precio, setPrecio] = useState("");
    const [costoEquipo, setCostoEquipo] = useState("");
    const [canal, setCanal] = useState ("");


    const handleGenerar = () => {

        if (!velocidadOferta || !precio || !costoEquipo) {
    alert("Completa todos los campos obligatorios");
    return;
    }

        const nota = `Usted acepto servicio de internet inalámbrico con VOZ + INT ${velocidadOferta} ${unidad} por un costo de $${precio} + ivu, acuerdo a 24 meses. El costo del equipo es $${costoEquipo} gratis en financiamiento a 24 meses, en caso de cancelación pagará $4.16 por cada mes restante. Se le orienta envío de equipo inalámbrico por parte de IW en un término de 24-48 horas. Se le orienta prorrateo en primera factura.  
***** CANAL(${canal})*****`;
        
        onGenerar(nota);
    };

    return (
        <div style={containerStyle}>
            <h3>Claro Hogar</h3>

            <label>Velocidad:</label>
            <div style={{ display: "flex", gap: "10px" }}>
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

                        if (unidad == "MB") {
                            if (numero >= 1 && numero <= 999) {
                                setVelocidadOferta(numero.toString());
                            }
                        } else if (unidad === "GB") {
                            if ( numero === 1) {

                            }
                        }
                    }}
                    onBlur={() => {
                        if (velocidadOferta === '' || parseInt(velocidadOferta, 10) === 0) {
                            setVelocidadOferta("1");
                        }
                    }}
                    style={{...inputStyle, flex: 1}}
                    />

                    <select
                    value={unidad}
                        onChange={(e) => {
                            setUnidad(e.target.value);
                            setVelocidadOferta("1");
                        }}
                        style={{...inputStyle, width: "100px"}}
                    >
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>   
                    </select>
            </div>

            <label>Precio Mensual:</label>
            <CampoMoneda value={precio} setValue={setPrecio}/>
            
            <label>Costo del equipo:</label>
            <CampoMoneda value={costoEquipo} setValue={setCostoEquipo}/>

            <label>Canal:</label>
                <select
                    value={canal}
                    onChange={(e) => setCanal(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione canal...</option>
                    <option value="80925">80925</option>
                    <option value="60083">60083</option>
                    <option value="60123">60123</option>
                </select>

            <button style={buttonStyle} onClick={handleGenerar}>
                Generar Nota
            </button>
        </div>
    );
};

export default ClaroHogarVenta;