//types/Zones/Zones.ts
interface District {
  _id: string;
  name: string;
}

interface Zone {
  _id: string;
  name: string;
  districts: District[];
}

export type { District, Zone };
