document.addEventListener("DOMContentLoaded", () => {
    
    const inputProducto = document.getElementById("producto");
    const inputPrecioInicial = document.getElementById("precio-inicial");
    const inputPrecioActual = document.getElementById("precio-actual");
    const inputCantidadSemana = document.getElementById("cantidad-semana");
    const inputSemanas = document.getElementById("semanas");
    const btnCalcular = document.getElementById("btn-calcular");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const seccionResultados = document.getElementById("resultados");
    
    const resIncremento = document.getElementById("res-incremento");
    const resPorcentaje = document.getElementById("res-porcentaje");
    const resGastoAnterior = document.getElementById("res-gasto-anterior");
    const resGastoActual = document.getElementById("res-gasto-actual");
    const resClasificacion = document.getElementById("res-clasificacion");
    const resDiferencia = document.getElementById("res-diferencia");

    btnCalcular.addEventListener("click", () => {
        
        const producto = inputProducto.value.trim();
        const precioInicial = parseFloat(inputPrecioInicial.value);
        const precioActual = parseFloat(inputPrecioActual.value);
        const cantidadSemana = parseInt(inputCantidadSemana.value);
        const semanas = parseInt(inputSemanas.value);

        if (producto === "" || isNaN(precioInicial) || isNaN(precioActual) || isNaN(cantidadSemana) || isNaN(semanas)) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        if (precioInicial <= 0 || precioActual <= 0 || cantidadSemana <= 0 || semanas <= 0) {
            alert("Los valores numéricos deben ser mayores que cero.");
            return;
        }

        const incrementoUnidad = precioActual - precioInicial;
        const porcentajeAumento = (incrementoUnidad / precioInicial) * 100;
        
        const cantidadTotalPeriodo = cantidadSemana * semanas;
        const gastoTotalAnterior = precioInicial * cantidadTotalPeriodo;
        const gastoTotalActual = precioActual * cantidadTotalPeriodo;
        const diferenciaGasto = gastoTotalActual - gastoTotalAnterior;


        resIncremento.textContent = `${incrementoUnidad.toFixed(2)} Bs`;
        resPorcentaje.textContent = `${porcentajeAumento.toFixed(2)}%`;
        resGastoAnterior.textContent = `${gastoTotalAnterior.toFixed(2)} Bs`;
        resGastoActual.textContent = `${gastoTotalActual.toFixed(2)} Bs`;
        
        resDiferencia.textContent = `¡Estás gastando ${diferenciaGasto.toFixed(2)} Bs más en total por comprar ${producto}!`;


        seccionResultados.classList.remove("oculto", "estado-normal", "estado-alerta", "estado-critico");
        
        if (porcentajeAumento <= 15) {
            resClasificacion.textContent = "Bajo (Afectación Mínima)";
            resClasificacion.style.color = "#155724";
            seccionResultados.classList.add("estado-normal"); 
        } else if (porcentajeAumento > 15 && porcentajeAumento <= 35) {
            resClasificacion.textContent = "Medio (Alerta de Incremento)";
            resClasificacion.style.color = "#856404"; 
            seccionResultados.classList.add("estado-alerta");
        } else {
            resClasificacion.textContent = "Alto (Impacto Crítico)";
            resClasificacion.style.color = "#721c24"; 
            seccionResultados.classList.add("estado-critico"); 
        }
    });

    btnLimpiar.addEventListener("click", () => {
        document.getElementById("formulario-simulador").reset();
        
        seccionResultados.classList.add("oculto");
        seccionResultados.classList.remove("estado-normal", "estado-alerta", "estado-critico");
    });
});