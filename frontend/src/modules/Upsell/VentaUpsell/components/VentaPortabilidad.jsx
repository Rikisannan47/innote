import { useState} from "react";

const VentaPortabilidad = ({onGenerar}) => {

    //Estados
    const [compID, setCompID] = useState("00811");
    const [clienteExistente, setClienteExistente] = useState("");
    const [ban, setBan] = useState("");
    const [titular, setTitular] = useState("");
    const [portabilidad, setPortabilidad] = useState("");
    const [fincap, setFincap] = useState("");
    const [credito, setCredito] = useState("");
    const [equipo, setEquipo] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [costoRegular, setCostoRegular] = useState("");
    const [costoOferta, setCostoOferta] = useState("");
    const [costoPlazos, setCostoPlazos] = useState("");
    const [plazoUpdate, setPlazoUpdate] = useState("");
    const [priceCode, setPriceCode] = useState("");
    const [codigoTarifa, setCodigoTarifa] = useState("");
    const [precioTarifa, setPrecioTarifa] = useState("");
    const [seguro, setSeguro] = useState("");

    // segunda parte portabilidad
    const [banNuevo, setBanNuevo] = useState("");
    const [numeroPortar, setNumeroPortar] = useState("");
    const [compania, setCompania] = useState("");
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [pin, setPin] = useState("");
    const [direccion, setDireccion] = useState("");

    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");


    //Validaciones

    const soloNumerosBan = (valor, setValor, limite = 9) => {
        const limpio = valor.replace(/\D/g, "").slice(0, limite);
        setValor(limpio);
    };

    const soloTelefono = (valor, setValor) => {
        const limpio = valor.replace(/\D/g, "").slice(0, 10);
        setValor(limpio);
    };

    //Formato Dinero

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

        if (enteros.length > 5) enteros = enteros.slice(0, 5);
        if (decimales.length > 2) decimales = decimales.slice(0, 2);

        const nuevo = val.includes('.') ? `${enteros}.${decimales}` : enteros;
        setValor(nuevo);
    };

    const blurDinero = (valor, setValor) => {
        if (valor === "" || valor === ".") return;

        if (!valor.includes (".")) {
            setValor(`${parseInt(valor, 10)}.00`);
            return;
        }

    const partes = valor.split(".");
    let enteros = partes[0];
    let decimales = partes [1] || "";

    enteros = enteros.replace(/^0+/, "") || "0";
    decimales = decimales.padEnd(2, "0").slice(0, 2);

    setValor(`${enteros}.${decimales}`);

    };

    //Estilo

    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

    // GENERAR NOTA

    const generar = () => {

    if (
        !compID || !titular || !fincap ||
        !credito || !equipo || !itemCode || !costoRegular ||
        !costoOferta || !costoPlazos || !plazoUpdate || !priceCode ||
        !codigoTarifa || !precioTarifa || !seguro ||
        !banNuevo || !numeroPortar || !compania ||
        !numeroCuenta || !pin || !direccion || 
        (clienteExistente === "si" && (!ban || !portabilidad))
    ) {
        alert("Completa todos los campos");
        return;
    }

    let bloqueClienteExistente = "";

    if (clienteExistente === "si") {
        bloqueClienteExistente = `BAN: ${ban}
Portabilidad: ${portabilidad}
`;
    }

    let nota = `CANAL: 775TEL
Comp ID: ${compID}
${bloqueClienteExistente}Titular: ${titular}
FinCap: $${fincap}
CreditClass: ${credito}
Equipo: ${equipo}
Item Code: ${itemCode}
Costo De Equipo Regular: $${costoRegular}
Costo De Equipo en Oferta: $${costoOferta}
Costo de los plazos: $${costoPlazos}
Plazo Update: ${plazoUpdate}
Price Code: ${priceCode}
Código De Tarifa: ${codigoTarifa}
Precio de tarifa: $${precioTarifa}
Seguro: ${seguro}

PORTABILIDAD
Canal: 775TEL
Comp ID: ${compID}
BAN Nuevo: ${banNuevo}
Titular: ${titular}
Número a portar: ${numeroPortar}
Compañía: ${compania}
Número de cuenta: ${numeroCuenta}
PIN Transfer: ${pin}
Dirección física y postal: ${direccion}

Términos y Condiciones: 7 días para cambios y devoluciones, 1 año de garantía, equipo recibir en casa dentro de 5 a 7 días laborables por UPS, se le orienta de prorrateo y que deberá de pagar el total del equipo en caso de que desee cancelar. Se le orienta al cliente que la persona a recibir equipo debe presentar ID para la entrega del mismo y que en caso de querer devolver o cambiar el equipo debe de pagar la totalidad de $30.00 que se le reflejara en su factura por cada equipo. *****(775TEL INSIGHT - 00811) ****`;

    // 🔹 AQUÍ agregamos el comentario SOLO si aplica
    if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
        nota += `

Comentario adicional:
${comentarioAdicional.trim()}`;
    }

    onGenerar(nota);
};

//UI el retorno

return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <label>Comp ID:</label>
            <input value={compID} readOnly style={estiloInput} />

            <label>¿Cliente Existente?</label>
            <select
                value={clienteExistente}
                onChange={e=>{
                    const valor = e.target.value;
                    setClienteExistente(valor);

                    if (valor === "no") {
                        setBan("");
                        setPortabilidad("");
                    }
                }}

                style={estiloInput}>

                    <option value="">Seleccione...</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>

            {clienteExistente === "si" && (
                <>
                    <label>BAN:</label>
                    <input
                        value={ban}
                        onChange={e=>soloNumerosBan(e.target.value,setBan)}
                        style={estiloInput}/>
                        <label>Portabilidad:</label>
                    <input
                        value={portabilidad}
                        onChange={e=>soloTelefono(e.target.value, setPortabilidad)}
                        style={estiloInput}/>
                </>
            )}

            <label>Titular:</label>
            <input value={titular} onChange={e => setTitular(e.target.value)} style={estiloInput} />

            <label>FinCap:</label>
            <input value={fincap}
                onChange={e=>formatearDinero(e.target.value,setFincap)}
                onBlur={()=>blurDinero(fincap,setFincap)}
                style={estiloInput}
            />

            <label>CreditClass</label>
            <select value={credito} onChange={e=>setCredito(e.target.value)} style={estiloInput}>
                <option value="">Seleccione</option>
                <option>A</option><option>B</option><option>C</option>
                <option>D</option><option>E</option><option>F</option>
            </select>

            <label>Equipo</label>
            <input value={equipo} onChange={e=>setEquipo(e.target.value)} style={estiloInput}/>

            <label>Item Code</label>
            <input value={itemCode} onChange={e=>setItemCode(e.target.value)} style={estiloInput}/>

            <label>Costo regular</label>
            <input value={costoRegular}
                onChange={e=>formatearDinero(e.target.value,setCostoRegular)}
                onBlur={()=>blurDinero(costoRegular,setCostoRegular)}
                style={estiloInput}
            />

            <label>Costo oferta</label>
            <input value={costoOferta}
                onChange={e=>formatearDinero(e.target.value,setCostoOferta)}
                onBlur={()=>blurDinero(costoOferta,setCostoOferta)}
                style={estiloInput}
            />

            <label>Costo plazos</label>
            <input value={costoPlazos}
                onChange={e=>formatearDinero(e.target.value,setCostoPlazos)}
                onBlur={()=>blurDinero(costoPlazos,setCostoPlazos)}
                style={estiloInput}
            />

            <label>Plazo Update</label>
            <select value={plazoUpdate} onChange={e=>setPlazoUpdate(e.target.value)} style={estiloInput}>
                <option value="">Seleccione</option>
                <option>SWTL24</option>
                <option>SWTL30</option>
                <option>SWCH24</option>
                <option>SWCH30</option>
            </select>

            <label>Price Code</label>
            <select value={priceCode} onChange={e=>setPriceCode(e.target.value)} style={estiloInput}>
                <option value="">Seleccione</option>
                <option>SWCH24</option>
                <option>SWCH30</option>
                <option>FIUP24</option>
                <option>FIUP30</option>
                <option>U50%30</option>
                <option>F50%30</option>
                <option>UPFAM2</option>
                <option>FIFAM2</option>
                <option>U1000T</option>
                <option>F1000T</option>
            </select>

            <label>Código tarifa</label>
            <input value={codigoTarifa} onChange={e=>setCodigoTarifa(e.target.value)} style={estiloInput}/>

            <label>Precio tarifa</label>
            <input value={precioTarifa}
                onChange={e=>formatearDinero(e.target.value,setPrecioTarifa)}
                onBlur={()=>blurDinero(precioTarifa,setPrecioTarifa)}
                style={estiloInput}
            />

            <label>Seguro</label>
            <select value={seguro} onChange={e=>setSeguro(e.target.value)} style={estiloInput}>
                <option value="">Seleccione</option>
                <option>Si</option>
                <option>No</option>
            </select>

            <hr/>

            <label>BAN Nuevo</label>
            <input value={banNuevo} onChange={e=>soloNumerosBan(e.target.value,setBanNuevo)} style={estiloInput}/>

            <label>Número a portar</label>
            <input value={numeroPortar} onChange={e=>soloTelefono(e.target.value,setNumeroPortar)} style={estiloInput}/>

            <label>Compañía</label>
            <input value={compania} onChange={e=>setCompania(e.target.value)} style={estiloInput}/>

            <label>Número cuenta</label>
            <input value={numeroCuenta} onChange={e=>setNumeroCuenta(e.target.value)} style={estiloInput}/>

            <label>PIN Transfer:</label>
            <input value={pin} onChange={e=>setPin(e.target.value)} style={estiloInput}/>

            <label>Dirección</label>
            <textarea
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
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
                    background:"#39B54A",
                    color:"#fff",
                    padding:"12px",
                    border:"none",
                    borderRadius:"10px",
                    fontWeight:"bold",
                    cursor:"pointer"
                }}>
                Generar nota
            </button>

        </div>
    );
 
};

export default VentaPortabilidad;