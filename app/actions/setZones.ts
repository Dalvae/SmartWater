// app/actions/setZones.ts
import { useZones } from "@/hooks/useZones";
import useAppStore from "@/store/appStore";

export default async function setZones() {
  const zones = await useZones();
  useAppStore.getState().setZones(zones);
}
