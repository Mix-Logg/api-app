export class CreateFreightDto {
    id: number;
    idClient: number;
    km: string;
    vehicleType: string;
    initial: string;
    finish: string;
    value: string;
    origin: string;
    destination: string;
}