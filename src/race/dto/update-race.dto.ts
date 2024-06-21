export class UpdateRaceDto {
    isVisible? : string
    idPayment? : string
    idDriver ?: number | null;
    delete_at?:string;
    value?: string;
    idClientIo?: string;
    plate?:string;
    confirmCodeInitial?: string;
    confirmCodeFinish?: string;
    retrieve? : boolean
}
