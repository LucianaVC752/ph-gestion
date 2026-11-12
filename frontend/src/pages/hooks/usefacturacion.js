import { useEffect, useState } from "react";
import {
  obtenerPeriodos,
  obtenerFacturas,
  crearFacturacionMasiva,
} from "../services/facturacionservice.js";

export function useFacturacion() {
  const mesActual = new Date().toISOString().slice(0, 7);

  const [facturas, setFacturas] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [conceptoId, setConceptoId] = useState("3");
  const [periodoMasiva, setPeriodoMasiva] = useState(mesActual);
  const [resultado, setResultado] = useState(null);
  const [err, setErr] = useState("");

  const cargar = async (p) => {
    if (!p) return;
    try {
      const data = await obtenerFacturas(p);
      setFacturas(data.facturas);
    } catch (e) {
      setErr(e.message);
    }
  };

  const cargarPeriodos = async (seleccionar = null) => {
    try {
      const data = await obtenerPeriodos();
      const lista = data.periodos.length > 0 ? data.periodos : [mesActual];
      setPeriodos(lista);
      setPeriodo(seleccionar || lista[0]);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => {
    cargarPeriodos();
  }, []);

  useEffect(() => {
    cargar(periodo);
  }, [periodo]);

  const generarMasiva = async (e) => {
    e.preventDefault();
    setErr("");
    setResultado(null);
    try {
      const r = await crearFacturacionMasiva(periodoMasiva, conceptoId);
      setResultado(r);
      await cargarPeriodos(periodoMasiva);
      if (periodo === periodoMasiva) {
        await cargar(periodoMasiva);
      }
    } catch (e) {
      setErr(e.message);
    }
  };

  return {
    facturas,
    periodos,
    periodo,
    setPeriodo,
    conceptoId,
    setConceptoId,
    periodoMasiva,
    setPeriodoMasiva,
    resultado,
    err,
    generarMasiva,
  };
}