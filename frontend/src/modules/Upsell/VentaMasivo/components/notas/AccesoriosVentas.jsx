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

const AccesoriosVenta = ({ onGenerar}) => {

    const [ban, setBan] = useState ("");
    const [suscriptor, setSuscriptor] = useState("");
    const [titular, setTitular] = useState("");
    const [accesorio, setAccesorio] = useState("");
    const [itemCode, setItemCode] = useState("");
    
    const [costo, setCosto] = useState("");
    const [costoOferta, setCostoOferta] = useState("");
    const [costoPlazos, setCostoPlazos] = useState("");
    const [priceCode, setPriceCode] = useState("");
    const [descuento, setDescuento] = useState("");
    const [marca, setMarca] = useState ("");
    const [precioRegular, setPrecioRegular] = useState("");
    const [canal, setCanal] = useState ("");

    const handleGenerar = () => {
        if (ban.length !== 9) {
      alert("El BAN debe contener exactamente 9 dígitos.");
        return;
        }

        if (!suscriptor || !titular || !accesorio || !costo || !marca || !precioRegular || !canal) {
            alert("Debe completar todos los campos obligatorios!");
            return;
        }

        const nota = `OFERTAS DE EQUIPOS EN PORTAFOLIO DEL 15 DE JULIO AL 30 DE AGOSTO DE 2021 - APLICA A CANAL DIRECTO E INDIRECTO UPDATE PLUS Y FINANCIAMIENTO

MEMO DE ACCESORIOS

BAN: ${ban}
SUSCRIPTOR: ${suscriptor}
TITULAR: ${titular}
ACCESORIO: ${accesorio}
ITEM CODE: ${itemCode}
COSTO DE ACCESORIO: $${costo}
COSTO DE ACCESORIO EN OFERTA: $${costoOferta}
COSTO DE ACCESORIO A PLAZOS: $${costoPlazos}
PRICE CODE: ${priceCode}
DESCUENTO: $${descuento}

TÉRMINOS Y CONDICIONES:
La garantía de los equipos es de un año directamente con el Manufacturero ${marca} 
no con claro por lo cual la venta es Final, No se permite cambios y/o devoluciones.
En caso de cancelación temprana pagaría equipo por los meses restantes del acuerdo a 
precio regular que sería $${precioRegular} por cada mes restante. El equipo será entregado por la compañía Island Wide en un periodo 24-48. horas 
laborables y al momento de la entrega, usted o la persona autorizada, deberá presentar 
una identificación vigente con foto
Por favor, indíqueme su correo electrónico para enviarle su factura de manera recurrente 
***** CANAL(${canal})*****
`;

        onGenerar(nota);
    };

    return (
        <div style={containerStyle}>
      <h3>Accesorios</h3>

      <label>BAN:</label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={ban}
        onChange={(e) => {
          const soloNumeros = e.target.value.replace(/\D/g, '');
          if (soloNumeros.length <= 9) {
            setBan(soloNumeros);
          }
        }}
        maxLength={9}
        style={inputStyle}
      />

      <label>Suscriptor:</label>
      <input
        value={suscriptor}
        onChange={(e)=>setSuscriptor(e.target.value)}
        style={inputStyle}
      />

      <label>Titular:</label>
      <input
        value={titular}
        onChange={(e)=>setTitular(e.target.value)}
        style={inputStyle}
      />

      <label>Accesorio:</label>
      <input
        value={accesorio}
        onChange={(e)=>setAccesorio(e.target.value)}
        style={inputStyle}
      />

      <label>Item Code:</label>
      <input
        value={itemCode}
        onChange={(e)=>setItemCode(e.target.value)}
        style={inputStyle}
      />

      <label>Costo de Accesorio:</label>
      <CampoMoneda value={costo} setValue={setCosto} />

      <label>Costo de Accesorio en Oferta:</label>
      <CampoMoneda value={costoOferta} setValue={setCostoOferta} />

      <label>Costo de Accesorio a Plazos:</label>
      <CampoMoneda value={costoPlazos} setValue={setCostoPlazos} />

      <label>Price Code:</label>
      <input
        value={priceCode}
        onChange={(e)=>setPriceCode(e.target.value)}
        style={inputStyle}
      />

      <label>Descuento:</label>
      <CampoMoneda value={descuento} setValue={setDescuento} />
      
      <label>Precio regular:</label>
      <CampoMoneda value={precioRegular} setValue={setPrecioRegular}/>


      <label>Marca:</label>
                <select
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione Marca...</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Otro">Otro</option>
                </select>

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

export default AccesoriosVenta;