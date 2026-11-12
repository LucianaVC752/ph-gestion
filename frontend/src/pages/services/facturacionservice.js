import { api } from "../../api.js";

export const obtenerPeriodos = () => api("/api/facturacion/periodos");

export const obtenerFacturas = (periodo) =>
  api(`/api/facturacion?periodo=${periodo}`);

export const crearFacturacionMasiva = (periodo, conceptoId) =>
  api("/api/facturacion/masiva", {
    method: "POST",
    body: JSON.stringify({ periodo, concepto_id: Number(conceptoId) }),
  });