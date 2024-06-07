// app/clientes/page.tsx
import { PageTitle } from "@/components/ui/PageTitle";
import { ClientesIcon } from "@/components/icons/Icons";
import { useZones } from "@/hooks/useZones";
import useAppStore from "@/store/appStore";
import smartwaterApi from "@/lib/SmartWaterApi";
import { ClientResponse } from "@/types/Cliente/Client";
import { SearchAndFilterHOC } from "@/components/Clientes/SearchAndFilterHOC";
import { ClientesPaginados } from "@/components/Clientes/ClientesPaginados";
import { Zone } from "@/types/Zones/Zones";

export default async function Clientes() {
  const zones: Zone[] = await useZones();
  const zoneAndDistrictNames: Record<string, string> = zones.reduce(
    (acc, zone) => {
      acc[zone._id] = zone.name;
      return acc;
    },
    {} as Record<string, string>
  );
  const fetchClients = useAppStore.getState().fetchClients;

  try {
    const response = await smartwaterApi.get("/clients?pageSize=3000");
    const clients: ClientResponse = response.data;
    fetchClients(clients.data);
  } catch (error) {}

  const clients = useAppStore.getState().clients;

  return (
    <div>
      <PageTitle
        titulo="Clientes"
        icon={<ClientesIcon className="w-12 h-12" />}
      />
      <SearchAndFilterHOC clients={clients}>
        <ClientesPaginados zoneAndDistrictNames={zoneAndDistrictNames} />
      </SearchAndFilterHOC>
    </div>
  );
}
