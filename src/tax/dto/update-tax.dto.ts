export class UpdateTaxDto{
    default?:number;
    km_motorcycle?: number;
    km_tour?: number;
    km_util?: number;
    km_van?: number;
    km_vuc?: number;
    motorcycle_min?:number;
    tour_min? : number;
    util_min? : number;
    van_min?  : number;
    vuc_min?  : number;
    pix_clientPaid?: number;
    pix_clientRetrieve?: number;
    pix_driverRetrieve?: number;
    pix_driverTaxPixRetrieve?: number;
    pix_driverPaymentDefault?: number;
    driver_cancel?: number;
    update_at?: string;
}
