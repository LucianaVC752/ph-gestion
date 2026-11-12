import { money } from "../api.js";
import { useFacturacion } from "./hooks/usefacturacion.js";
export default function Facturacion() {
  const {
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
  } = useFacturacion();

  return (
    <>
      <div className="topbar"><h2>Facturación</h2></div>

      <div className="panel">
        <h3>Facturación masiva (cuota extraordinaria por coeficiente)</h3>
        <form className="row" onSubmit={generarMasiva}>
          <div className="field"><label>Concepto (id)</label><input value={conceptoId} onChange={(e) => setConceptoId(e.target.value)} /></div>
          <div className="field"><label>Periodo</label><input value={periodoMasiva} onChange={(e) => setPeriodoMasiva(e.target.value)} /></div>
          <button type="submit">Generar</button>
        </form>
        {err && <div className="err">{err}</div>}
        {resultado && (
          <div className="cards" style={{ marginTop: 14 }}>
            <div className="kpi"><div className="label">Total a repartir</div><div className="value">{money(resultado.total_a_repartir)}</div></div>
            <div className="kpi"><div className="label">Suma facturada</div><div className="value">{money(resultado.suma_facturada)}</div></div>
            <div className="kpi"><div className="label">Facturas generadas</div><div className="value">{resultado.facturas_generadas}</div></div>
          </div>
        )}
      </div>

      <div className="panel">
        <h3>Facturas del periodo</h3>
        <div className="row" style={{ marginBottom: 12 }}>
          <div className="field"><label>Periodo</label>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
              {periodos.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <table>
          <thead><tr><th>#</th><th>Inmueble</th><th>Vence</th><th className="right">Total</th><th className="right">Saldo</th><th>Estado</th></tr></thead>
          <tbody>
            {facturas.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td><td>{f.identificacion}</td><td>{String(f.fecha_vencimiento).slice(0, 10)}</td>
                <td className="right">{money(f.total)}</td><td className="right">{money(f.saldo)}</td>
                <td><span className={"badge " + f.estado.split(" ")[0]}>{f.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}