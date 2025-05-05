import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordmanagerService } from '../passwordmanager.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewsites',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './viewsites.component.html',
  styleUrl: './viewsites.component.css'
})
export class ViewsitesComponent {
  allSites!: Observable<Array<any>>
  siteForm!: FormGroup
  state: string = 'Add'
  isSuccess:boolean = false
  constructor(private passwordManagerService: PasswordmanagerService,private formBuilder: FormBuilder) {
    this.loadSites()
    this.siteForm = this.formBuilder.group({
      id: [''],
      siteName: ['',[Validators.required]],
      siteURL : ['',[Validators.required]],
      siteImgURL: ['',[Validators.required]],
    })
  }
  loadSites(){
    console.log("Loading sites")
    this.allSites = this.passwordManagerService.loadSite()
  }
  onSubmit(){
    if(this.state == 'Edit'){
      this.passwordManagerService.updateSite(this.siteForm.value.id,this.siteForm.value).
      then(()=>{
        this.isSuccess = true
        console.log("Data updated Successfully")
        this.siteForm.reset()
        this.state = 'Add'
      }).
      catch(err=>{
        console.log("Error occured",err)
      })
    }
    else{
      this.passwordManagerService.addSite(this.siteForm.value).
      then(()=>{
        this.isSuccess = true
        console.log("Data updated Successfully")
        this.siteForm.reset()
        this.state = 'Add'
      })
      .catch(err=>{
        console.log("Error occured",err)
      })
    }
    }
    editSite(siteName:string,siteURL:string,siteImgURL:string,id:string){
      this.state = 'Edit'
      this.siteForm.patchValue({
        id: id,
        siteImgURL: siteImgURL,
        siteName: siteName,
        siteURL: siteURL
      })
    }
    deleteSite(id:string){
      this.passwordManagerService.deleteSite(id).
      then(()=>{
        console.log("Data deleted successfully")
      })
      .catch(err=>{
        console.log("Error occured",err)
      })
    }
}
