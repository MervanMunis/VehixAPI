// /types/car.ts

export interface IVehicle {
  VehicleId: string;
  VehicleType: string;
  Brand: string;
  Model: string;
  BodyType: string;
  Package: string;
  Transmission: string;
  FuelType: string;
  DriveType: string;
  EnginePower?: string;
  EngineCapacity?: string;
  Year: string;
  IsClassic: boolean;
  ImageUrl?: string;
}
