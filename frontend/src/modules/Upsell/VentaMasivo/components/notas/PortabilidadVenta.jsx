import { useState } from "react";
import VentaMovilBase from "../base/VentaMovilBase";

const PortabilidadVenta = ({ onGenerar }) => {

  
  const handleGenerar = (data) => {

    const {
      fecha,
      cliente,
      equipo,
      tarifa,
      adicionales,
      portabilidad,
      canal
    } = data;

    if (
    !fecha?.diaInicio ||
    !fecha?.diaFinal ||
    !fecha?.mes ||
    !fecha?.anio ||
    !cliente?.ban ||
    !cliente?.titular ||
    !equipo?.equipo ||
    !equipo?.itemCode ||
    !equipo?.costoRegular ||
    !equipo?.costoOferta ||
    !equipo?.costoPlazos ||
    !equipo?.plazoFinal ||
    !equipo?.priceFinal ||
    !tarifa?.codigoTarifa ||
    !tarifa?.precioTarifa ||
    !adicionales?.seguro ||
    !canal
  ) {
    alert("Completa todos los campos obligatorios");
    return;
  }

    const nota = `OFERTA APLICA DEL ${fecha.diaInicio} AL ${fecha.diaFinal} DE ${fecha.mes} DE ${fecha.anio}

• Portabilidad: ${portabilidad?.portabilidadNumero || ""}
• Comp ID (80925 INSIGHT)
• BAN: ${cliente.ban}
• Titular: ${cliente.titular}
• Equipo: ${equipo.equipo}
• Item Code: ${equipo.itemCode}
• Costo De Equipo Regular: ${equipo.costoRegular}
• Costo De Equipo en Oferta: ${equipo.costoOferta}
• Costo de los plazos: ${equipo.costoPlazos}
• Plazo Update: ${equipo.plazoFinal}
• Price Code: ${equipo.priceFinal}
• Código De Tarifa: ${tarifa.codigoTarifa}
• Precio de tarifa: ${tarifa.precioTarifa}
• Seguro: ${adicionales.seguro}

• BAN Nuevo: ${portabilidad?.banNuevo || ""}
• Titular Nuevo: ${portabilidad?.titularNuevo || ""}
• Número a portar: ${portabilidad?.numeroPortar || ""}
• Compañía: ${portabilidad?.compania || ""}
• Número de cuenta: ${portabilidad?.numeroCuenta || ""}
• PIN: ${portabilidad?.pin || ""}

Términos y Condiciones:
7 días para cambios y devoluciones, 1 año de garantía, equipo se recibe en casa dentro de 24 a 48 horas laborables por Island Wide, se le orienta de prorrateo y que deberá pagar el total del equipo en caso de cancelación. Se le orienta al cliente que la persona a recibir equipo debe presentar ID para la entrega del mismo y que en caso de querer devolver o cambiar el equipo debe de pagar la totalidad de $30.00 que se le reflejara en su factura por cada equipo.
***** CANAL(${canal})*****.
`;

    onGenerar(nota); // 👈 AQUÍ usamos tu sistema actual
  };

  return (
    <VentaMovilBase
      onGenerar={handleGenerar}
      mostrarCamposPortabilidad={true}
      modoPortabilidad={true}
    />
  );
};

export default PortabilidadVenta;