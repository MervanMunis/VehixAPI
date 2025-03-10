// /types/carRequestJson.ts

export interface vehicleJson {
  vehicleType: string;
  brand: string;
  model: string;
  bodyType: string;
  package: string;
  transmission: string;
  fuelType: string;
  driveType: string;
  enginePower?: string;
  engineCapacity?: string;
  year: string;
  isClassic: boolean;
}
