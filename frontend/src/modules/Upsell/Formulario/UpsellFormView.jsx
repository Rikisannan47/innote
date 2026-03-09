import { useState } from "react"; //Importamos useState para manejar los estados del formulario
import Logo from "../../../assets/Insight-Logo.png"; //Importamos el logo de insight
//Se importan los componentes de No Venta
import NoContesta from "../NoVentaUpsell/components/NoContesta";
import BuzonVoz from "../NoVentaUpsell/components/BuzonVoz";
import NoDisponible from "../NoVentaUpsell/components/NoDisponible";
import NoInteresPrecio from "../NoVentaUpsell/components/NoInteresPrecio";
import NoInteresSatisfecho from "../NoVentaUpsell/components/NoInteresSatisfecho";
import NoInteresTiempo from "../NoVentaUpsell/components/NoInteresTiempo";
import NoInteresPermanencia from "../NoVentaUpsell/components/NoInteresPermanencia";
import Seguimiento from "../NoVentaUpsell/components/Seguimiento";
import Upsell3PlaySin from "../VentaUpsell/components/Upsell3PlaySinRenovacion";
import Upsell3PlayCon from "../VentaUpsell/components/Upsell3PlayConRenovacion";
import ClaroTVNuevo from "../VentaUpsell/components/ClaroTVNuevo";
import Upsell2Play from "../VentaUpsell/components/Upsell2Play";
import UpsellMovil from "../VentaUpsell/components/UpsellMovil";
import Venta2PlayNuevo from "../VentaUpsell/components/Venta2PlayNuevo";
import Venta3PlayNuevo from "../VentaUpsell/components/Venta3PlayNuevo";
import VentaRenovacion from "../VentaUpsell/components/VentaRenovacion";
import VentaLineaNueva from "../VentaUpsell/components/VentaLineaNueva";
import VentaPortabilidad from "../VentaUpsell/components/VentaPortabilidad";
import DespachoEquipo from "../VentaUpsell/components/DespachoEquipo";
import MemoAccesorios from "../VentaUpsell/components/MemoAccesorios";
import MasivoNoVenta from "../NoVentaMasivo/components/NoVenta";
import MasivoClienteCuelga from "../NoVentaMasivo/components/Cuelga";
import LlamadaOutbound from "../NoVentaMasivo/components/LlamadaOutbound";
import LlamadaInbound from "../NoVentaMasivo/components/LlamadaInbound";
import SeguimientoOutbound from "../NoVentaMasivo/components/SeguimientoOutbound";
import SeguimientoInbound from "../NoVentaMasivo/components/SeguimientoInbound";
import BuzonDeVoz from "../NoVentaMasivo/components/BuzonVoz";
import NumeroCancelado from "../NoVentaMasivo/components/NumeroCancelado";
import ClienteDeuda from "../NoVentaMasivo/components/ClienteDeuda";
import ClienteFallecido from "../NoVentaMasivo/components/ClienteMurio";
import ConvergenteClaroOtroTitular from "../NoVentaMasivo/components/ConvergenteClaro";
import Transferencia from "../NoVentaMasivo/components/Transferencia";
import MemoVenta from "../VentaMasivo/components/notas/MemoVenta";
import RenovacionVenta from "../VentaMasivo/components/notas/RenovacionVenta"; 
import LineaNuevaVenta from "../VentaMasivo/components/notas/LineaNuevaVenta";
import PortabilidadVenta from "../VentaMasivo/components/notas/PortabilidadVenta";
import Despacho from "../VentaMasivo/components/notas/Despacho"
import DoblePlayVenta from "../VentaMasivo/components/notas/2PlayVenta";
import TriplePlayVenta from "../VentaMasivo/components/notas/3PlayVenta";
import ClaroHogarVenta from "../VentaMasivo/components/notas/ClaroHogarVenta";
import ClaroTVPlusVenta from "../VentaMasivo/components/notas/ClaroTVPlusVenta";
import FWA5GVenta from "../VentaMasivo/components/notas/FWA5Venta";
import ClaroTVNowVenta from "../VentaMasivo/components/notas/ClaroTVNow";
import AccesoriosVenta from "../VentaMasivo/components/notas/AccesoriosVentas";



//Componente principar del formulario Upsell
const UpsellFormView = () => {
    //Estado de campañas entre Masivo y Grupo Especializado
    const [campaña, setCampaña] = useState("");
    //Estado para saber si es venta o no venta
    const [tipoGestion, setTipoGestion] = useState("");
    //Estado del motivo seleccionado (Para No Venta Upsell)
    const [motivoNoVenta, setMotivoNoVenta] = useState("");
    //EStado del motivo seleccionado (Para Venta Upsell)
    const [motivoVentaUpsell, setMotivoVentaUpsell] = useState("");
    //Estado del motivo seleccioando para NO venta Masivo
    const [motivoNoVentaMasivo, setMotivoNoVentaMasivo] = useState("");
    //Estado del motivo seleccionado para Venta Masivo
    const [motivoVentaMasivo, setMotivoVentaMasivo] = useState("");
    //Estado para guardar la nota generada final
    const [notaFinal, setNotaFinal] = useState("");
    //Estado para mostrar modal popup
    const [mostrarModal, setMostrarModal] =useState(false);

    const [formKey, setFormKey] = useState(0);

        const limpiarTodo = () => {
            setMotivoNoVenta("");
            setMotivoVentaUpsell("");
            setMotivoNoVentaMasivo("");
            setMotivoVentaMasivo("");
            setNotaFinal("");
            setMostrarModal(false);

            setFormKey(prev => prev + 1);
    };
    //Esta función que recibe la nota fenerada desde cualquier componente hijo
    const generarNota = (texto) => {
        setNotaFinal(texto); //Guardamos el texto final
        setMostrarModal(true); //Abrimos modal        
    };

    //Esta función es la de seleccionar las campañas
    const mostrarTipoGestion = 
        campaña === "grupo_especializado" || campaña === "masivo";

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0F2444, #13294B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Century Gothic, Arial, sans-serif"
        }}>
        
        {/* Tarjeta central */}

        <div style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "16px",
            width: "500px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
        }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "20px"}}>
            <img src={Logo} alt="Insight" style={{ width: "140px"}} />
            <h2 style={{ color: "#0F2444"}}>Generador de Notas</h2>
        </div>

        {/* Selector de campaña*/}
        <label>Campaña:</label>

        <select
            value={campaña}
            onChange={(e) => {
                setCampaña(e.target.value);
                setTipoGestion("");
                limpiarTodo(""); //Esto es lo que me limpia los campos al devolverme a campaña
            }}
            style={{ width: "100%", padding: "10px", marginTop: "5px"}}
            >
            <option value="">Seleccione campaña... </option>
            <option value="masivo">Masivo</option>
            <option value="grupo_especializado">Upsell</option>
        </select>

        {/* ====================================== */}
        {/* TIPO GESTIÓN SOLO SI ES GRUPO ESPECIAL */}
        {/* ====================================== */}
        {mostrarTipoGestion && (
            <>
            <label style={{marginTop: "20px", display: "block"}}>
                Tipo de gestión:
            </label>

        <select
            value= {tipoGestion}
            onChange={(e) => {
                setTipoGestion(e.target.value);
                limpiarTodo(); //Limpia todo lo hecho
            }}
            style={{ width: "100%", padding: "10px", marginTop: "5px"}}
            >
                <option value="">Seleccione...</option>
                <option value="venta">Venta</option>
                <option value="no_venta">No Venta</option>
        </select>
        
            </>
        )}

        {/* Motivos de Venta Upsell */}
        {campaña === "grupo_especializado" && tipoGestion === "venta" && (
            <>
            <label style={{marginTop: "20px", display: "block"}}>
                Motivo de Venta Upsell:
            </label>

            <select value={motivoVentaUpsell}

            onChange={(e) => {
                    const nuevoValor = e.target.value;
                    limpiarTodo();
                    setMotivoVentaUpsell(nuevoValor);
                }}
            
                style={{width: "100%", padding:"10px", marginTop:"5px"}}
            >
                <option value="">Seleccione tipo de Venta...</option>
                <option value="upsell_3play_sin">Upsell 3 Play - Sin renovación</option>
                <option value="upsell_3play_con">Upsell 3 Play - Con renovación</option>
                <option value="claro_tv">Claro TV+ nuevo</option>
                <option value="upsell_2play">Upsell 2 Play</option>
                <option value="upsell_movil">Upsell Móvil</option>
                <option value="venta_2play">Venta 2 Play nuevo</option>
                <option value="venta_3play">Venta 3 Play nuevo</option>
                <option value="venta_renovacion">Venta Renovación</option>
                <option value="linea_nueva">Venta Línea Nueva</option>
                <option value="portabilidad">Venta Portabilidad</option>
                <option value="despacho">Despacho Equipo</option>
                <option value="memo_accesorios">Memo / Accesorios</option>
            </select>
            </>
        )}

        {/* Motivos VENTA MASIVO */}

        {campaña === "masivo" && tipoGestion === "venta" && (
            <>
            <label style={{marginTop: "20px", display: "block"}}> Motivo de Venta Masivo: </label>

            <select
                value={motivoVentaMasivo}
                onChange={(e) => {
                const nuevoValor = e.target.value;
                limpiarTodo();
                setMotivoVentaMasivo(nuevoValor);
                }}
                style={{width: "100%", padding:"10px", marginTop:"5px"}}    
            >
                <option value="">Seleccione motivo...</option>
                <option value="memo_venta">Memo de Venta CH//FWA//Movil</option>
                <option value="renovacion_venta">Renovación Venta:</option>
                <option value="linea_nueva">Línea Nueva Venta:</option>
                <option value="portabilidad_venta">Portabilidad Venta:</option>
                <option value="despacho">Despacho:</option>
                <option value="venta_2play">Venta 2Play:</option>
                <option value="venta_3play">Venta 3Play:</option>
                <option value="claro_hogar">Claro Hogar:</option>
                <option value="clarotv+">Claro TV+:</option>
                <option value="venta_fwa5">Venta FWA5</option>
                <option value="clarotv+now">Claro TV+ NOW</option>
                <option value="accesorio">Accesorio:</option>
            </select>
            
            </>
        )}

        {/* Notivos No Venta Masivo */}

        {campaña === "masivo" && tipoGestion === "no_venta" && (
            <>
                <label style={{margintTop:"20px", display: "block"}}>Motivo de NO Venta:</label>

                <select
                    value={motivoNoVentaMasivo}
                    onChange={(e) => {
                        const nuevoValor = e.target.value;
                        limpiarTodo();
                        setMotivoNoVentaMasivo(nuevoValor);
                    }}
                    style={{width: "100%", padding:"10px", marginTop:"5px"}}
                >
                    <option value="">Seleccione motivo...</option>
                    <option value="no_venta">No Venta</option>
                    <option value="cliente_cuelga">Cliente Cuelga</option>
                    <option value="consulta_outbound">Consulta Outbound</option>
                    <option value="consulta_inbound">Consulta Inbound</option>
                    <option value="seguimiento_outbound">Seguimiento Outbound</option>
                    <option value="seguimiento_inbound">Seguimiento Inboud</option>
                    <option value="buzon">Buzon de Voz</option>
                    <option value="numero_cancelado">Número Cancelado</option>
                    <option value="cliente_deuda">Cliente con deuda</option>
                    <option value="cliente_murió">Cliente Falleció</option>
                    <option value="convergente">Convergente Claro otro Titular</option>
                    <option value="transferencia">Transferencia</option>
                </select>
            </>
        )}


        {/* Motivos No venta UPSELL */}
        {campaña === "grupo_especializado" && tipoGestion === "no_venta" && (
            <>
                <label style={{ marginTop: "20px", display: "block"}}>
                    Motivo de NO Venta:
                </label>

                <select value={motivoNoVenta} 
                onChange={(e) => {
                    const nuevoValor = e.target.value;
                    limpiarTodo();
                    setMotivoNoVenta(nuevoValor);
                }}

                    style={{ width: "100%", padding: "10px", marginTop: "5px"}}>
                        <option value="">Seleccione motivo...</option>
                        <option value="no_contesta">No contesta</option>
                        <option value="buzon">Buzón de voz</option>
                        <option value="no_disponible">No Disponible</option>
                        <option value= "satisfecho">No interesado (Satisfecho con lo actual)</option>
                        <option value="precio">No interesado por precio  (Objeción Económica)</option>
                        <option value="tiempo">No interesado por falta de tiempo (Llamada en mal momento)</option>
                        <option value="permanencia">Rechazo por permanencia o competencia</option>
                        <option value="seguimiento">Seguimiento</option>
                </select>
            </>
        )}

        {/* Render dinámico */}
        <div key={formKey}style={{ marginTop: "25px"}}>


            {motivoNoVenta === "no_contesta" && (
                <NoContesta onGenerar={generarNota}/>
            )}

            {motivoNoVenta === "buzon" && (
                <BuzonVoz onGenerar={generarNota}/>
            )}

            {motivoNoVenta === "no_disponible" && (
                <NoDisponible onGenerar={generarNota}/>
            )}

            {motivoNoVenta === "precio" && (
                <NoInteresPrecio onGenerar={generarNota}/>
            )}

            {motivoNoVenta === "satisfecho" && (
                <NoInteresSatisfecho onGenerar={generarNota} />
            )}

            {motivoNoVenta === "tiempo" && (
                <NoInteresTiempo onGenerar={generarNota}/>
            )}
            {motivoNoVenta === "permanencia" && (
                <NoInteresPermanencia onGenerar={generarNota}/>
            )}
            {motivoNoVenta === "seguimiento" && (
                <Seguimiento onGenerar={generarNota}/>
            )}


            {/* No Venta Masivo */}


            {motivoNoVentaMasivo === "no_venta" && (
                <MasivoNoVenta onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "cliente_cuelga" && (
                <MasivoClienteCuelga onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "consulta_outbound" && (
                <LlamadaOutbound onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "consulta_inbound" && (
                <LlamadaInbound onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "seguimiento_outbound" && (
                <SeguimientoOutbound onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "seguimiento_inbound" && (
                <SeguimientoInbound onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "buzon" && (
                <BuzonDeVoz onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "numero_cancelado" && (
                <NumeroCancelado onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "cliente_deuda" && (
                <ClienteDeuda onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "cliente_murió" && (
                <ClienteFallecido onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "convergente" && (
                <ConvergenteClaroOtroTitular onGenerar={generarNota}/>
            )}

            {motivoNoVentaMasivo === "transferencia" && (
                <Transferencia onGenerar={generarNota}/>
            )}





            {/* Ventas Upsell*/}

            {motivoVentaUpsell === "upsell_3play_sin" && (
                <Upsell3PlaySin onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "upsell_3play_con" && (
                <Upsell3PlayCon onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "claro_tv" && (
                <ClaroTVNuevo onGenerar={generarNota}/>
            )}

             {motivoVentaUpsell === "upsell_2play" && (
                <Upsell2Play onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "upsell_movil" && (
                <UpsellMovil onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "venta_2play" && (
                <Venta2PlayNuevo onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "venta_3play" && (
                <Venta3PlayNuevo onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell ==="venta_renovacion" && (
                <VentaRenovacion onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell ==="linea_nueva" && (
                <VentaLineaNueva onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell ==="portabilidad" && (
                <VentaPortabilidad onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "despacho" && (
            < DespachoEquipo onGenerar={generarNota}/>
            )}

            {motivoVentaUpsell === "memo_accesorios" && (
                <MemoAccesorios onGenerar={generarNota}/>
            )}


            {/* VENTAS MASIVO */}

            {motivoVentaMasivo === "memo_venta" && (
                <MemoVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "renovacion_venta" && (
                <RenovacionVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "linea_nueva" && (
                <LineaNuevaVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "portabilidad_venta" && (
                <PortabilidadVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "despacho" && (
                <Despacho onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "venta_2play" && (
                <DoblePlayVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "venta_3play" && (
                <TriplePlayVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "claro_hogar" && (
                <ClaroHogarVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "clarotv+" && (
                <ClaroTVPlusVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "venta_fwa5" && (
                <FWA5GVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "clarotv+now" && (
                <ClaroTVNowVenta onGenerar={generarNota}/>
            )}

            {motivoVentaMasivo === "accesorio" && (
                <AccesoriosVenta onGenerar={generarNota}/>
            )}


        </div>

        {/* MODAL */}
        {mostrarModal && (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <div style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                width: "400px",
                position: "relative"
            }}>

            {/* Botón cerrar */}
            <button
                onClick={() => setMostrarModal(false)}
                style={{position: "absolute", 
                        right: "12px", 
                        top: "12px",
                        background: "#e53935",    
                        color: "#fff",              
                        border: "none",
                        borderRadius: "50%",        
                        width: "20px",
                        height: "20px",
                        fontWeight: "bold",         
                        fontSize: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        transition: "0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.background = "#c62828"}
                        onMouseOut={(e) => e.target.style.background = "#e53935"}
                        >
                    X
            </button>

            <h3>Nota Generada</h3>

            <textarea
                value={notaFinal}
                readOnly
                style={{
                    width: "100%", 
                    height: "140px",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    fontFamily: "Century Gothic, Arial, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    display: "flex",
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    resize: "none",
                    boxSizing: "border-box",
                    background: "#f7f7f7"
                    }}/>

                <button
                    onClick={() => {
                        try {
                        const textarea = document.createElement("textarea");
                        textarea.value = notaFinal;
                        document.body.appendChild(textarea);

                        textarea.select();
                        textarea.setSelectionRange(0, 99999);

                        document.execCommand("copy");
                        document.body.removeChild(textarea);

                        alert("Nota copiada al portapapeles ✅");
                        } catch (err) {
                        alert("No se pudo copiar automáticamente. Copia manual.");
                        }
                    }}
                    style={{ 
                        marginTop: "15px", 
                        background: "#39B54A", 
                        color: "#fff", 
                        padding: "12px", 
                        border: "none", 
                        borderRadius: "8px", 
                        cursor: "pointer", 
                        fontWeight: "bold" }}
                    >
                    📋 Copiar
                </button>

            
                </div>
            </div>
        )}

            </div>
        </div>
    );
};

export default UpsellFormView;