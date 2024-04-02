export class CreateRaceDto {
    idClient: number;
    idDriver: number;
    km: number;
    initial: string;
    finish: string;
    value: string;
    create_at?:string;
    isVisible: string;
}
  