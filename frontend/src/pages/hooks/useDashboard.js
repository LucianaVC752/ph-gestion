// Obtiene el periodo actual en formato "YYYY-MM" respetando la zona horaria local
const obtenerPeriodoActual = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  return `${anio}-${mes}`;
};

// Genera los últimos 6 meses hasta el actual
const generarPeriodos = (cantidad = 6) => {
  const lista = [];
  const hoy = new Date();
  for (let i = cantidad - 1; i >= 0; i--) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    lista.push(`${anio}-${mes}`);
  }
  return lista;
};