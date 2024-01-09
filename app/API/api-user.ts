import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from '../Cookie/cookie';
import { ActivityModel, AssetModel } from '../model/model';
import { FormAsset } from '../model/form';
@Injectable({
    providedIn : 'root'
})
export class ApiUser{
    constructor(public http: HttpClient,private cookie:Cookie){

    }
    private localhost = "http://localhost:3000"

    get_header(){
        return {
            headers:{
                'authorization':this.cookie.get_token(),
            }
        }
    }
    // api auth
    login_user(form:any){
        return this.http.post(this.localhost+"/auth/sign-in",form)
    }
    register_user(form:any){
        return this.http.post(this.localhost+"/auth/sign-up",form)
    }
    // api activity
    create_activity(form:any){
        return this.http.post(this.localhost+"/activity",form,this.get_header())
    }
    get_activity_open_join(){
        console.log(this.get_header())
        return this.http.get<ActivityModel[]>(this.localhost+"/activity/open_join",this.get_header())
    }
    delete_activity(activity_id:number){
        return this.http.delete(this.localhost+"/activity/"+activity_id,this.get_header())
    }
    update_activity(activity_id:number,form:any){
        console.log(form)
        form.type = form.type.id
        return this.http.put(this.localhost+"/activity/"+activity_id,form,this.get_header())
    }
    // api asset
    create_asset(assets:FormAsset[],activity_id:number){
        let formData = new FormData()
        let type = assets[0].type
        console.log('asset')
        console.log(assets)
        let number = 1
        assets.forEach((asset:any)=>{
            asset.activityId = activity_id
            asset.path.name = `${activity_id}-${number}-${type}`
            formData.append('path',asset.path)
            number += 1
        })
        formData.append('activityId',activity_id+"")
        formData.append('type',assets[0].type+"")
        console.log('api console')
        return this.http.post(this.localhost+"/asset",formData,this.get_header())
    }
    update_asset(assets:FormAsset[], activity_id:number){
        let formData = new FormData()
        let type = assets[0].type
        let number = 1
        assets.forEach((asset:any)=>{
            asset.activityId = activity_id
            asset.path.name = `${activity_id}-${number}-${type}`
            formData.append('path',asset.path)
            number += 1
        })
        formData.append('activityId',activity_id+"")
        formData.append('type',assets[0].type+"")
        console.log('api console')
        return this.http.post(this.localhost+"/asset",formData,this.get_header())
    }
}