export class FormNewActiviy{
    constructor(type_activity:string,code_student:string){
        if (type_activity=="user") this.type = 1
        else if (type_activity=='admin') this.type = 2
        this.addBy = code_student
    }
    id:number = 0
    nameActivity:string  = ''
    location: string = ''
    details:string = ''
    participants:number = 0
    dateTimeStart:string = ''
    dateTimeEnd:string = ''
    addBy:string = ''
    type:number = 0
    asset:FormAsset[] = []
}
export class FormAsset{
    constructor(path:any,type:number){
        this.path = path
        this.type = type
        console.log("model")
        console.log(path)
        console.log(this.type)
    }
    id:number = 0
    path:any = ""
    type:number = 0
    activityId:number = 5
}
  