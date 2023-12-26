import "./PaginaPrincipal.css";
import { FC } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { InicioWrapper } from "../Contenido/Inicio/InicioWrapper";
import { ClientesWrapper } from "../Contenido/Clientes/ClientesWrapper";
import { MapaClientesWrapper } from "../Contenido/MapaClientes/MapaClientesWrapper";
import { MonitoreoDistribuidoresWrapper } from "../Contenido/MonitoreoDistribuidores/MonitoreoDistribuidoresWrapper";
import { VentasWrapper } from "../Contenido/Ventas/VentasWrapper";
import { PedidosWrapper } from "../Contenido/Pedidos/PedidosWrapper";
import { PrestamosWrapper } from "../Contenido/Préstamos/PrestamosWrapper";
import { ArqueoDeCajaWrapper } from "../Contenido/Finanzas/ArqueoDeCaja/ArqueoDeCajaWrapper";
import { CuentasPorCobrarWrapper } from "../Contenido/Finanzas/CuentasPorCobrar/CuentasPorCobrarWrapper";
import { EgresosGastosWrapper } from "../Contenido/Finanzas/EgresosGastos/EgresosGastosWrapper";
import { ProveedoresWrapper } from "../Contenido/Finanzas/Proveedores/ProveedoresWrapper";
import { CuentasPorPagarWrapper } from "../Contenido/Finanzas/CuentasPorPagar/CuentasPorPagarWrapper";
import { ReportesIngresosWrapper } from "../Contenido/Reportes/ReportesIngresos/ReportesIngresosWrapper";
import { ReportesGraficosWrapper } from "../Contenido/Reportes/ReportesIngresos/ReportesGraficos/ReportesIngresosWrapper";

const PaginaPrincipal: FC = () => {

    return (
        <>
            <Router>
                <div style={{ display: "flex" }}>
                    <Sidebar />
                    <div className="Contenedor">
                        <Routes>
                            <Route path="" element={<Navigate to='/Inicio' />} />

                            <Route path='/Inicio' element={<InicioWrapper />} />

                            <Route path='/Clientes' element={<ClientesWrapper />} />

                            <Route path='/MapaClientes' element={<MapaClientesWrapper />} />

                            <Route path='/MonitoreoDistribuidores' element={<MonitoreoDistribuidoresWrapper />} />

                            <Route path='/Ventas' element={<VentasWrapper />} />

                            <Route path='/Pedidos' element={<PedidosWrapper />} />

                            <Route path='/Prestamos' element={<PrestamosWrapper />} />

                            <Route path='/Finanzas/ArqueoDeCajas' element={<ArqueoDeCajaWrapper/>} />

                            <Route path='/Finanzas/CuentasPorCobrarCobros/*' element={<CuentasPorCobrarWrapper/>} />

                            <Route path='/Finanzas/EgresosGastos' element={<EgresosGastosWrapper/>} />

                            <Route path='/Finanzas/Proveedores' element={<ProveedoresWrapper/>} />

                            <Route path='/Finanzas/CuentasPorPagar/*' element={<CuentasPorPagarWrapper/>} />

                            <Route path='/Reportes/Ingresos/*' element={<ReportesIngresosWrapper/>} />

                            <Route path='/Reportes/Ingresos/Graficos/*' element={<ReportesGraficosWrapper/>} />

                            <Route path="*" element={<Navigate to='/Inicio' />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    )
}

export { PaginaPrincipal }