import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiUser } from 'src/app/API/api-user';
import { FormAsset, FormNewActiviy } from 'src/app/model/form';
import { ActivityModel } from '../../model/model';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  constructor(private api: ApiUser){}
  @Input('is_update') is_update:boolean = false
  @Output('succeed') succeed = new EventEmitter()
  @Output('show') showPopup = new EventEmitter();
  @Input('data') form!:FormNewActiviy|ActivityModel 
  newActivityName: string = "";
  menu1 : boolean = false
  urlFiles:any[] =[]
  warn = {
    id: false,
    nameActivity:false,
    location: false,
    details:false,
    participants:false,
    dateTimeStart:false,
    dateTimeEnd:false,
    addBy:false,
    type:false,
  }
  
  ngOnInit(): void {
    if (!this.is_update){
      this.form = new FormNewActiviy("user","64021700")
    }
    console.log(this.form.id)
  }

  closePopup() {
    // this.showPopup = false;
    this.form = new FormNewActiviy('user','')
    this.showPopup.emit()
  } 
  checkDateStartAndDateAnd():boolean{
    if (this.form.dateTimeEnd != ""){
      let start = new Date(this.form.dateTimeStart)
      let end = new Date(this.form.dateTimeEnd)
      if (start.getTime() >= end.getTime()){
        return false
      }
    }
    else {
      // ทำเพื่อให้ผ่านการตรวจจับของหลังบ้าน
      this.form.dateTimeEnd = this.form.dateTimeStart
    }
    return true
  }
  addActivity() {
    let result = this.checkDateStartAndDateAnd()
    if (this.form.id <= 0 && result){
      // call api activity
      this.api.create_activity(this.form).subscribe((data:any)=>{
        let activity_id = data.id
        // call api asset
        this.api.create_asset(this.form.asset,activity_id).subscribe((data:any)=>{
          console.log("update file : ")
          console.log(data)
          this.closePopup()
        })
        // this.succeed.emit()
      },
      (error:any)=>{
        let massege:string[] = error.error.message
        // console.log(massege)
        for(let i of massege){
          if (i.includes('nameActivity')) this.warn.nameActivity = true
          else if (i.includes('dateTimeStart')) this.warn.dateTimeStart = true
          else if (i.includes('dateTimeEnd')) this.warn.dateTimeEnd= true
          else if (i.includes('location')) this.warn.location = true
          else if (i.includes('details')) this.warn.details = true
          else if (i.includes('participants')) this.warn.participants = true
        }
      }
      )
    }
    else if (result && this.form.id >= 0) {
      this.api.update_activity(this.form.id,this.form).subscribe((data:any)=>{
        console.log('update ok')
      })
    }
  }

  onSelectFiles(event:any){
    let lenghtImg = 0
    for(let file of event.target.files){
      this.readURL(file)
      if (lenghtImg>=4){
        break
      }
    }
  }
  readURL(file: any): void {
    if (file) {
      this.form.asset.push(new FormAsset(file,1))
      // this.form.asset.push({id:0,path:file,activityId:1,type:2})
      const reader = new FileReader();

      reader.onload = (e) => {
        let url:any = reader.result;
        this.urlFiles?.push(url)
      };

      reader.readAsDataURL(file);
    }
  }
  removeImage(index:number){
    this.urlFiles.splice(index,1)
  }
}
