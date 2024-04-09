export class CreateRaceDto {
  idClient: number;
  km: string;
  vehicleType: string;
  initial: string;
  finish: string;
  value: string;
  origin: string;
  destination: string;
  create_at?: string;
  codeInitial?: string;
  codeFinish?: string;
  isVisible?: string;
}
