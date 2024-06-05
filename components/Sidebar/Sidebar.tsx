"use client";
import { useState, useEffect } from "react";
import { Baloo_Bhai_2 } from "next/font/google";
import { AsideItem, AsideSubMenu } from "./AsideComponents";
import {
  InicioIcon,
  ClientesIcon,
  MapaIcon,
  EnviosIcon,
  VentasIcon,
  PedidosIcon,
  PrestamosIcon,
  FinanzasIcon,
  ReportesIcon,
  ConfigIcon,
  SalirIcon,
} from "@/components/icons/Icons";
import { CircleEqual } from "lucide-react";

const balooBhai2 = Baloo_Bhai_2({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar sidebar al hacer clic fuera de él
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        isOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      1;
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 min-h-screen bg-[#1d4db0] p-6 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50 sidebar w-[75%] xl:w-[15%] md:w-[20%] overflow-y-auto`}
      >
        <div
          className={`mb-10 flex justify-center text-2xl font-extrabold ${balooBhai2.className}`}
        >
          <h1 className="text-[#52A5F5]">Smart</h1>
          <h1>Water</h1>
        </div>
        <div className="space-y-2">
          <AsideItem tituloItem="Inicio" to="/" icon={<InicioIcon />} />
          <AsideItem
            tituloItem="Clientes"
            icon={<ClientesIcon />}
            to="/clientes"
          />
          <AsideItem
            tituloItem="Mapa de clientes"
            to="/mapa"
            icon={<MapaIcon />}
          />
          <AsideItem
            tituloItem="Monitoreo de Distribuidores"
            to="/monitoreodistribuidores"
            icon={<EnviosIcon />}
          />
          <AsideItem tituloItem="Ventas" to="/Ventas" icon={<VentasIcon />} />
          <AsideItem
            tituloItem="Pedidos"
            to="/pedidos"
            icon={<PedidosIcon />}
          />
          <AsideItem
            tituloItem="Préstamos"
            to="/prestamos"
            icon={<PrestamosIcon />}
          />
          <AsideSubMenu
            tituloItem="Finanzas"
            icon={<FinanzasIcon />}
            to="/finanzas/arqueodecajas"
            opciones={[
              {
                id: 0,
                titulo: "Arqueo de cajas",
                to: "/finanzas/Arqueodecajas",
              },
              {
                id: 1,
                titulo: "Cuentas por cobrar - cobros",
                to: "/finanzas/cuentasporcobrarcobros",
              },
              {
                id: 2,
                titulo: "Egresos y gastos (listado)",
                to: "/finanzas/egresosgastos",
              },
              {
                id: 3,
                titulo: "Proveedores (listados)",
                to: "/finanzas/proveedores",
              },
              {
                id: 4,
                titulo: "Cuentas por pagar",
                to: "/finanzas/cuentasporpagar",
              },
            ]}
          />
          <AsideSubMenu
            tituloItem="Reportes"
            icon={<ReportesIcon />}
            to="/Reportes/Ingresos"
            opciones={[
              {
                titulo: "Ingresos (cuentas por cobrar)",
                to: "/Reportes/Ingresos",
                id: 0,
              },
              {
                titulo: "Egresos (cuentas por pagar)",
                to: "/Reportes/Egresos",
                id: 1,
              },
              { titulo: "Resultados", to: "/Reportes/Resultados", id: 2 },
            ]}
          />
          <AsideSubMenu
            tituloItem="Configuración"
            icon={<ConfigIcon />}
            to="/Configuración/ConfiguraciónGeneral"
            opciones={[
              {
                id: 0,
                titulo: "Configuración general",
                to: "/Configuracion/General",
              },
              { titulo: "Usuarios", to: "/Configuracion/Usuarios", id: 1 },
              { titulo: "Barrios", to: "/Configuracion/Barrios", id: 2 },
              { titulo: "Zonas", to: "/Configuracion/Zonas", id: 3 },
              { titulo: "Productos", to: "/Configuracion/Productos", id: 4 },
              { titulo: "Items", to: "/Configuracion/Items", id: 5 },
            ]}
          />
        </div>
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 flex w-1/2 items-center justify-between rounded-xl bg-white text-black px-5 py-2.5 transition-all duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <SalirIcon />
          <span>Salir</span>
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      <button
        className="md:hidden fixed top-4 left-4 text-black z-50 menu-button"
        onClick={toggleSidebar}
      >
        <CircleEqual className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;
