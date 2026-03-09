import { useState} from "react";

const MemoAccesorios = ({onGenerar}) => {

    //Estados

    const [titular, setTitular] = useState("");
    const [ban, setBan] = useState("");
    const [portabilidad, setPortabilidad] = useState("");
    const [costoRegular, setCostoRegular] = useState("");
    const [costoOferta, setCostoOferta] = useState("");
    const [costoPlazos, setCostoPlazos] = useState("");
    const [accesorio, setAccesorio] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [priceCode, setPriceCode] = useState("");
    const [codigoTarifa, setCodigoTarifa] = useState("");
    const [precioTarifa, setPrecioTarifa] = useState("");

    const [agregarComentario, setAgregarComentario] = useState("no");
    const [comentarioAdicional, setComentarioAdicional] = useState("");

    // Fijos
    const canal = "775TEL INSIGHT";
    const compID = "00811";

    // VALIDACIONES

    // BAN solo números (9)
    const soloNumerosBan = (valor) => {
        const limpio = valor.replace(/\D/g, "").slice(0, 9);
        setBan(limpio);
    };

 // teléfono 10 dígitos
    const soloTelefono = (valor) => {
        const limpio = valor.replace(/\D/g, "").slice(0, 10);
        setPortabilidad(limpio);
    };

    // =========================
    // FORMATO DINERO (5 dígitos)
    // =========================
    const formatearDinero = (valor, setValor) => {
        let val = valor
            .replace(/[^\d.]/g, '')
            .replace(/(\..*)\./g, '$1');

        if (val === "" || val === ".") {
            setValor(val);
            return;
        }

        const partes = val.split(".");
        let enteros = partes[0];
        let decimales = partes[1] || "";

        if (enteros.length > 5) enteros = enteros.slice(0, 5);
        if (decimales.length > 2) decimales = decimales.slice(0, 2);

        const nuevo = val.includes(".") ? `${enteros}.${decimales}` : enteros;
        setValor(nuevo);
    };

    const blurDinero = (valor, setValor) => {
        if (valor === "" || valor === ".") return;

        if (!valor.includes(".")) {
            setValor(`${parseInt(valor, 10)}.00`);
            return;
        }

        const partes = valor.split(".");
        let enteros = partes[0];
        let decimales = partes[1] || "";

        enteros = enteros.replace(/^0+/, "") || "0";
        decimales = decimales.padEnd(2, "0").slice(0, 2);

        setValor(`${enteros}.${decimales}`);
    };

    // =========================
    // ESTILO INPUT
    // =========================
    const estiloInput = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontFamily: "Century Gothic, Arial"
    };

    // =========================
    // GENERAR NOTA
    // =========================
    const generar = () => {

    if (
        !titular || !ban || !portabilidad ||
        !costoRegular || !costoOferta || !costoPlazos ||
        !accesorio || !itemCode || !priceCode ||
        !codigoTarifa || !precioTarifa
    ) {
        alert("Completa todos los campos");
        return;
    }

    let nota = `Canal: ${canal}
Comp ID: ${compID}
TITULAR: ${titular}
BAN: ${ban}
PORTABILIDAD: ${portabilidad}
Costo De Equipo Regular: $${costoRegular}
Costo De Equipo en oferta: $${costoOferta}
Costo de los plazos: $${costoPlazos}
ACCESORIO: ${accesorio}
ITEM CODE: ${itemCode}      PRICE CODE: ${priceCode}
Código De Tarifa: ${codigoTarifa}
Precio de tarifa: $${precioTarifa}

CONDICIONES:
7 días para cambios y devoluciones, 1 año de garantía, equipo recibir en casa dentro de 5 a 7 días laborables por UPS, se le orienta de prorrateo y que deberá de pagar el total del equipo en caso de que desee cancelar. Se le orienta al cliente que la persona a recibir equipo debe presentar ID para la entrega del mismo y que en caso de querer devolver o cambiar el equipo debe de pagar la totalidad de $30.00 que se le reflejara en su factura por cada equipo. *****(775TEL INSIGHT - 00811) ****`;

    // 🔹 Agregar comentario SOLO si aplica
    if (agregarComentario === "si" && comentarioAdicional.trim() !== "") {
        nota += `

Comentario adicional:
${comentarioAdicional.trim()}`;
    }

    onGenerar(nota);
};

    //UI del retorno

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <label>Canal</label>
            <input value={canal} readOnly style={estiloInput} />

            <label>Comp ID</label>
            <input value={compID} readOnly style={estiloInput} />

            <label>Titular:</label>
            <input value={titular} onChange={e => setTitular(e.target.value)} style={estiloInput} />

            <label>BAN:</label>
            <input value={ban} onChange={e => soloNumerosBan(e.target.value)} style={estiloInput} />

            <label>Portabilidad:</label>
            <input value={portabilidad} onChange={e => soloTelefono(e.target.value)} style={estiloInput} />

            <label>Costo equipo regular:</label>
            <input
                value={costoRegular}
                onChange={e => formatearDinero(e.target.value, setCostoRegular)}
                onBlur={() => blurDinero(costoRegular, setCostoRegular)}
                style={estiloInput}
            />

            <label>Costo equipo oferta:</label>
            <input
                value={costoOferta}
                onChange={e => formatearDinero(e.target.value, setCostoOferta)}
                onBlur={() => blurDinero(costoOferta, setCostoOferta)}
                style={estiloInput}
            />

            <label>Costo plazos:</label>
            <input
                value={costoPlazos}
                onChange={e => formatearDinero(e.target.value, setCostoPlazos)}
                onBlur={() => blurDinero(costoPlazos, setCostoPlazos)}
                style={estiloInput}
            />

            <label>Accesorio:</label>
            <input value={accesorio} onChange={e => setAccesorio(e.target.value)} style={estiloInput} />

            <label>Item Code:</label>
            <input value={itemCode} onChange={e => setItemCode(e.target.value)} style={estiloInput} />

            <label>Price Code:</label>
            <select value={priceCode} onChange={e => setPriceCode(e.target.value)} style={estiloInput}>
                <option value="">Seleccione...</option>
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

            <label>Código tarifa:</label>
            <input value={codigoTarifa} onChange={e => setCodigoTarifa(e.target.value)} style={estiloInput} />

            <label>Precio tarifa:</label>
            <input
                value={precioTarifa}
                onChange={e => formatearDinero(e.target.value, setPrecioTarifa)}
                onBlur={() => blurDinero(precioTarifa, setPrecioTarifa)}
                style={estiloInput}
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

            <button
                onClick={generar}
                style={{
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

export default MemoAccesorios;