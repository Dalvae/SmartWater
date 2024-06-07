// app/hooks/useZones.ts
"use server";
import smartwaterApi from "@/lib/SmartWaterApi";
import useAppStore from "@/store/appStore";

interface District {
  _id: string;
  name: string;
}

interface Zone {
  _id: string;
  name: string;
  districts: District[];
}

export const useZones = async (): Promise<Zone[]> => {
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
