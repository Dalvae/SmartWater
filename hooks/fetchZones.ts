// app/hooks/fetchZones.ts
"use server";
import smartwaterApi from "@/lib/SmartWaterApi";
import useAppStore from "@/store/appStore";
import { Zone } from "@/types/Zones/Zones";

export const fetchZones = async (): Promise<Zone[]> => {
  try {
    const response = await smartwaterApi.get("/zones?pageSize=3000");
    const data = response.data;
    const zones: Zone[] = data.data.map((zone: any) => ({
      _id: zone._id,
      name: zone.name,
      districts: zone.districts.map((district: any) => ({
        _id: district._id,
        name: district.name,
      })),
    }));
    console.log(zones);
    return zones;
  } catch (error) {
    console.error(error);
    return [];
  }
};
