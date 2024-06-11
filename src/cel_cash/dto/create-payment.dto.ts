export class CreatePaymentDto {
    idUser:number
    value :number
    myId :string
    name :string
    type :string
    cpf  :string
    phone:string
    email:string
    additionalInfo?       :string
    payedOutsideGalaxPay? :boolean
    numberCard?     :string
    nameCard?       :string
    expiresAtCard?  :string
    cvvCard?        :string
    qtdInstallments?:number
}