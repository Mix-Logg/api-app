export class CreateFreightDto {
    idClient: number;
    km: number;
    initial: string;
    finish: string;
    value: string;
    create_at?:string;
    isVisible: string;
}
