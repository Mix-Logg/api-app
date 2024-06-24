export class CreateRaceDto {
  idClient: number;
  idPayment:string;
  idClientIo: string;
  km: string;
  vehicleType: string;
  initial: string;
  finish: string;
  value: string;
  origin: string;
  tax: string;
  destination: string;
  codeInitial?: string;
  codeFinish?: string;
  create_at?: string;
  isVisible?: string;
  static codeInitial: any;
}
