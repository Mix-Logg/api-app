export class SendEmail {
    to: string
    subject: string 
    text: string
    content?:Uint8Array
    contentBlob?:Uint8Array
    oneFile:boolean
}
