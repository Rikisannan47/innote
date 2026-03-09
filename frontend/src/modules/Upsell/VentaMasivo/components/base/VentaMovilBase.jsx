import { useState, useEffect } from "react";
import CampoMoneda from "../../../NoVentaMasivo/CampoMoneda";


const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};
const VentaMovilBase = ({
    onGenerar, 
    //plazoUpdateFijo,
    //priceCodeFijo,
    mostrarCamposPortabilidad = false,
    modoPortabilidad = false
}) => {

    
  // =========================
  // 1. FECHA
  // =========================

  const [diaInicio, setDiaInicio] = useState("");
  const [diaFinal, setDiaFinal] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");

  // 👇 AQUÍ MISMO
  const obtenerMaxDias = (mes) => {
    switch (mes) {
      case "FEBRERO":
        return 29;
      case "ABRIL":
      case "JUNIO":
      case "SEPTIEMBRE":
      case "NOVIEMBRE":
        return 30;
      case "ENERO":
      case "MARZO":
      case "MAYO":
      case "JULIO":
      case "AGOSTO":
      case "OCTUBRE":
      case "DICIEMBRE":
        return 31;
      default:
        return 31;
    }
  };

  useEffect(() => {
    const maxDias = obtenerMaxDias(mes);

    if (diaInicio && parseInt(diaInicio, 10) > maxDias) {
      setDiaInicio("");
    }

    if (diaFinal && parseInt(diaFinal, 10) > maxDias) {
      setDiaFinal("");
    }
  }, [mes]);

// =========================
// 2. DATOS BASE MOVIL
// =========================
const [memo, setMemo] = useState("");
const [portabilidadNumero, setPortabilidadNumero] = useState("");
const [compID, setCompId] = useState("80925 INSIGHT");
const [ban, setBan] = useState("");
const [titular, setTitular] = useState("");
const [equipo, setEquipo] = useState("");
const [itemCode, setItemCode] = useState("");
const [costoRegular, setCostoRegular] = useState("");
const [costoOferta, setCostoOferta]= useState("");
const [costoPlazos, setCostoPlazos] = useState("");
const [codigoTarifa, setCodigoTarifa] = useState("");
const [precioTarifa, setPrecioTarifa] = useState("");
const [seguro, setSeguro] = useState("");
const [canal, setCanal] = useState ("");

// =========================
  // 3. PLAZO Y PRICE CODE
  // =========================
  const [plazoUpdate, setPlazoUpdate] = useState("");
  const [priceCode, setPriceCode] = useState("");

  //const plazoFinal = plazoUpdateFijo || plazoUpdate;
  //const priceFinal = priceCodeFijo || priceCode;

  // =========================
  // 4. CAMPOS PORTABILIDAD
  // =========================
  const [banNuevo, setBanNuevo] = useState("");
  const [titularNuevo, setTitularNuevo] = useState("");
  const [numeroPortar, setNumeroPortar] = useState("");
  const [compania, setCompania] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [pin, setPin] = useState("");

// =========================
// 5. GENERAR NOTA
// =========================

  const handleGenerar = () => {

  const maxDias = obtenerMaxDias(mes, anio);

    if (diaInicio < 1 || diaInicio > maxDias) {
      alert(`El día inicial no es válido para ${mes}.`);
      return;
    }

    if (diaFinal < 1 || diaFinal > maxDias) {
      alert(`El día final no es válido para ${mes}.`);
      return;
    }

    if (Number(diaFinal) < Number(diaInicio)) {
      alert("El día final no puede ser menor que el día inicial.");
      return;
    }

  const data = {
    fecha: {
      diaInicio,
      diaFinal,
      mes,
      anio
    },
    cliente: {
      memo,
      compID,
      ban,
      titular
    },
    equipo: {
      equipo,
      itemCode,
      costoRegular,
      costoOferta,
      costoPlazos,
      plazoFinal: modoPortabilidad ? plazoUpdate : plazoUpdate,
      priceFinal: modoPortabilidad ? priceCode : priceCode
    },
    tarifa: {
      codigoTarifa,
      precioTarifa
    },
    adicionales: {
      seguro
    },
    portabilidad: mostrarCamposPortabilidad
      ? {
          portabilidadNumero,
          banNuevo,
          titularNuevo,
          numeroPortar,
          compania,
          numeroCuenta,
          pin
        }
      : null,
      canal: canal
  };

  onGenerar(data);
};

 // =========================
  // 6. RENDER
  // =========================
  return (
    <div
        style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "15px",
        fontFamily: "Century Gothic"
      }}
    >

      {/* FECHA */}
      <h3>Fecha Oferta</h3>

            {/* 🆕 Día Inicio con validación */}
            <label>Día Inicio:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={diaInicio}
                  onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, '');
                    const limitado = soloDigitos.slice(0, 2);
                    setDiaInicio(limitado);
                  }}
                  style={inputStyle}
                />
            {/* 🆕 Día Final con validación */}
            <label>Día Final:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={diaFinal}
                  onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, '');
                    const limitado = soloDigitos.slice(0, 2);
                    setDiaFinal(limitado);
                  }}
                  style={inputStyle}
                />

            <label>Mes:</label>
              <select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                style={inputStyle}
              >
                <option value="">Seleccione...</option>
                <option value="ENERO">ENERO</option>
                <option value="FEBRERO">FEBRERO</option>
                <option value="MARZO">MARZO</option>
                <option value="ABRIL">ABRIL</option>
                <option value="MAYO">MAYO</option>
                <option value="JUNIO">JUNIO</option>
                <option value="JULIO">JULIO</option>
                <option value="AGOSTO">AGOSTO</option>
                <option value="SEPTIEMBRE">SEPTIEMBRE</option>
                <option value="OCTUBRE">OCTUBRE</option>
                <option value="NOVIEMBRE">NOVIEMBRE</option>
                <option value="DICIEMBRE">DICIEMBRE</option>
              </select>

            <input
                placeholder="AÑO"
                value={anio}
                onChange={(e) =>
                setAnio(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                style={inputStyle}
      />

      <hr />

     {/* DATOS BASE */}

      {/* Memo solo cuando NO es Portabilidad */}
      {!modoPortabilidad && (
          <>
            <label>Memo:</label>
            <input
              placeholder="Memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              style={inputStyle}
            />
          </>
        )}

      {/* Texto y CompID solo cuando ES Portabilidad */}
      {modoPortabilidad && (
                <>
                  <label>Portabilidad:</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={portabilidadNumero}
                      onChange={(e) => {
                        const soloDigitos = e.target.value.replace(/\D/g, '');
                        setPortabilidadNumero(soloDigitos.slice(0, 10));
                      }}
                      style={inputStyle}
                    />

                  <label>Comp ID:</label>
                  <input
                    value="80925 INSIGHT"
                    disabled
                    style={inputStyle}
                  />
                </>
        )}

      <label>BAN:</label>
      <input
            type="text"
            inputMode="numeric"
            value={ban}
            onChange={(e) => {
                const soloDigitos = e.target.value.replace(/\D/g, '');
                setBan(soloDigitos.slice(0, 9));
            }}
            style={inputStyle}
      />
      <label>Titular:</label>
      <input placeholder="Titular" value={titular} onChange={(e) => setTitular(e.target.value)} style={inputStyle}/>
          
      <label>Equipo:</label>
      <input placeholder="Equipo" value={equipo} onChange={(e) => setEquipo(e.target.value)} style={inputStyle}/>
        
      <label>Item Code:</label>
      <input placeholder="Item Code" value={itemCode} onChange={(e) => setItemCode(e.target.value)} style={inputStyle}/>

      <CampoMoneda
            value={costoRegular}
            setValue={setCostoRegular}
            label="Costo Regular"
            style={inputStyle}
      />

      <CampoMoneda
            value={costoOferta}
            setValue={setCostoOferta}
            label="Costo Oferta"
            style={inputStyle}
      />

      <CampoMoneda
            value={costoPlazos}
            setValue={setCostoPlazos}
            label="Costo Plazos"
            style={inputStyle}
      />

      <label>Código Tarifa:</label>
      <input placeholder="Código Tarifa" value={codigoTarifa} onChange={(e) => setCodigoTarifa(e.target.value)} style={inputStyle}/>

      <CampoMoneda
            value={precioTarifa}
            setValue={setPrecioTarifa}
            label="Precio Tarifa"
            style={inputStyle}
        />

      <label>Seguro:</label>
      <select
              value={seguro}
              onChange={(e) => setSeguro(e.target.value)}
              style={inputStyle}
            >
              <option value="">Seleccione...</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>

      {/* PLAZO UPDATE - SIEMPRE EDITABLE */}
        <label>Plazo Update:</label>
        <input
          type="text"
          placeholder="Plazo Update"
          value={plazoUpdate}
          onChange={(e) => setPlazoUpdate(e.target.value)}
          style={inputStyle}
        />

        {/* PRICE CODE - SIEMPRE EDITABLE */}
        <label>Price Code:</label>
        <input
          placeholder="Price Code"
          value={priceCode}
          onChange={(e) => setPriceCode(e.target.value)}
          style={inputStyle}
        />

      {/* CAMPOS PORTABILIDAD */}
      {mostrarCamposPortabilidad && (
        <>
          <hr />
          <h4>Datos Portabilidad:</h4>
          <input placeholder="BAN Nuevo" type="text"
            inputMode="numeric"
            value={banNuevo}
            onChange={(e) => {
                const soloDigitos = e.target.value.replace(/\D/g, '');
                setBanNuevo(soloDigitos.slice(0, 9));
            }}
            style={inputStyle} 
          />
          <input placeholder="Titular Nuevo" value={titularNuevo} onChange={(e) => setTitularNuevo(e.target.value)} style={inputStyle}/>
          <input placeholder="Número a portar" type="text"
                      inputMode="numeric"
                      value={numeroPortar}
                      onChange={(e) => {
                        const soloDigitos = e.target.value.replace(/\D/g, '');
                        setNumeroPortar(soloDigitos.slice(0, 10));
                      }}
                      style={inputStyle}/>
          <input placeholder="Compañía" value={compania} onChange={(e) => setCompania(e.target.value)} style={inputStyle}/>
          <input placeholder="Número de cuenta" value={numeroCuenta} onChange={(e) => setNumeroCuenta(e.target.value)} style={inputStyle}/>
          
          <label>PIN:</label>
            <input
              type="text"
              inputMode="numeric"
              value={pin}
              onChange={(e) => {
                const soloDigitos = e.target.value.replace(/\D/g, '');
                setPin(soloDigitos.slice(0, 4));
              }}
              maxLength={4}
              style={inputStyle}
            />
        </>
      )}

        <label>Canal:</label>
                <select
                    value={canal}
                    onChange={(e) => setCanal(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Seleccione...</option>
                    <option value="80925">80925</option>
                    <option value="60083">60083</option>
                    <option value="60123">60123</option>
                </select>

      <hr />

      <button
        style={{
                    marginTop: "15px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#39B54A",
                    color: "#fff",
                    cursor: "pointer"
                }} onClick={handleGenerar}>
        Generar Nota
      </button>

    </div>
  );
};

export default VentaMovilBase;



