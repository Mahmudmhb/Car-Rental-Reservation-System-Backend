export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  status?: "available" | "unavailable";
  pricePerHour: number;
  isDeleted?: boolean;
  AdditionalFeatures?: string[];
  carType?: ["SUV" | "Sedan" | "Hatchback" | "Convertible"];
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};
