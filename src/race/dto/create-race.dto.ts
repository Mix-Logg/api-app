export class CreateRaceDto {
    idClient: number;
    km: number;
    vehicleType: string;
    initial: string;
    finish: string;
    value: string;
    origin: string;
    destination: string;
    create_at?:string;
    isVisible: string;
}
  