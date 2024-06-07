// app/actions/setZones.ts
import { fetchZones } from "@/hooks/fetchZones";
import useAppStore from "@/store/appStore";

export default async function setZones() {
  const zones = await fetchZones();
  useAppStore.getState().setZones(zones);
}
