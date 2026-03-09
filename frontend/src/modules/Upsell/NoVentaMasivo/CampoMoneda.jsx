import React from "react";

function CampoMoneda({ label, value, setValue }) {

    const inputStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%"
    };

    const formatearConMiles = (numero) => {
        const partes = numero.split('.');
        let enteros = partes[0];
        const decimales = partes[1] || '';

        const enterosFormateados = parseInt(enteros, 10)
            .toLocaleString("en-US");

        return decimales
            ? `${enterosFormateados}.${decimales}`
            : enterosFormateados;
    };

    return (
        <>
            <label>{label}</label>

            <input
                type="text"
                inputMode="decimal"
                pattern="[0-9,]*\.?[0-9]*"
                placeholder="ej: 199.99"
                value={value}

                onChange={(e) => {

                    let valordecimal = e.target.value
                        .replace(/,/g, '') // quitar comas primero
                        .replace(/[^\d.]/g,'')
                        .replace(/(\..*)\./g,'$1');

                    if (valordecimal === '' || valordecimal === '.') {
                        setValue(valordecimal);
                        return;
                    }

                    const partes = valordecimal.split('.');
                    let enteros = partes[0];
                    let decimales = partes[1] || '';

                    if (enteros.length > 5) {
                        enteros = enteros.slice(0, 5);
                    }

                    if (decimales.length > 2) {
                        decimales = decimales.slice(0, 2);
                    }

                    const tienePunto = valordecimal.includes('.');
                    const nuevoValor = tienePunto
                        ? `${enteros}.${decimales}`
                        : enteros;

                    setValue(nuevoValor);
                }}

                onBlur={(e) => {

                    let valor = e.target.value.replace(/,/g, '');

                    if (valor === '' || valor === '.')
                        return;

                    if (!valor.includes('.')){
                        valor = `${parseInt(valor, 10)}.00`;
                    }

                    const partes = valor.split('.');
                    let enteros = partes[0];
                    let decimales = partes[1] || '';

                    if (enteros === '') {
                        enteros = decimales;
                        decimales = '00';
                    } else {
                        enteros = enteros.replace(/^0+/, '') || '0';
                        decimales = decimales.padEnd(2, '0').slice(0, 2);
                    }

                    const valorFinal = `${enteros}.${decimales}`;

                    setValue(formatearConMiles(valorFinal));
                }}

                style={inputStyle}
            />
        </>
    );
}

export default CampoMoneda;