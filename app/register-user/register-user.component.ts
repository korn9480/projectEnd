import { Component } from '@angular/core';
import { ApiUser } from '../API/api-user';
import { Router } from '@angular/router';

class Register {
  code_student: string = "64021700";
  password: string = "Tub@0885591425";
  confirm_password: string = "Tub@0885591425";
  first_name: string = "ทินกร";
  last_name: string = "เเซ่เล้า";
  nick_name: string = "กร";
  faculty: string = "";
  major: string = "";
  phone: string = "0885591425";
  religion: string = "";
  blood_group: string = "";
  allergics :[] = []
  roleId : number = 1
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  form: Register = new Register();
  selectedReligion: any;
  customReligion: any;
  error_code_student: boolean = false;

  error ={
    conde_already_exist:false,
    code_student: false,
    password: false,
    confirm_password: false,
    first_name: false,
    last_name: false,
    nick_name: false,
    faculty: false,
    major: false,
    phone: false,
    religion: false,
    blood_group: false,
    food_allergy : false,
  }
  have_allergy:string = 'not'
  resetError(){
    this.error ={
      conde_already_exist: false,
      code_student: false,
      password: false,
      confirm_password: false,
      first_name: false,
      last_name: false,
      nick_name: false,
      faculty: false,
      major: false,
      phone: false,
      religion: false,
      blood_group: false,
      food_allergy : false,
    }
  }
  checkStudentCodeLength(): boolean {
    return this.form.code_student.length === 8;
  }

  submit() {
    this.resetError()
    console.log(this.form)
    if (this.form.religion == "อื่นๆ") {
      this.form.religion = this.customReligion;
    }
    if (!this.checkStudentCodeLength()) {
      this.error_code_student = true;
    } else {
      this.error_code_student = false;

      this.Api.register_user(this.form).subscribe(
        (data:any)=>{
          this.router.navigate(['/login']);
        },
        (r_error:any)=>{
          console.log(r_error)
          if (r_error.error.message==`User [${this.form.code_student}] already exist`){
            this.error.conde_already_exist = true
            return;
          }
          let text_error = "format is incorrect"
          let message:[] = r_error.error.message
          console.log(message)
          for(let i of message){
            if (i == "password too weak") this.error.password = true
            else if (i == "confirm_password must match password") this.error.confirm_password = true
            else if (i == "first name "+text_error)this.error.first_name = true
            else if (i == "last name "+text_error) this.error.last_name = true
            else if (i == "nick name "+text_error) this.error.nick_name = true
            else if (i == "faculty "+text_error) this.error.faculty = true
            else if (i == "major "+text_error) this.error.major =true
            else if (i == "phone "+text_error) this.error.phone = true
            else if (i == "religion "+text_error) this.error.religion = true
            else if (i == "blood group "+text_error) this.error.blood_group = true
          }
        }
      )
    }
  }

  constructor(private router :Router , private Api: ApiUser) {}
}
