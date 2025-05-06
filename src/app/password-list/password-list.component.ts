import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordmanagerService } from '../passwordmanager.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Site } from '../site';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
  siteForm!: FormGroup
  state:string = 'Add'
  isSuccess:boolean = false
  credentials!: Observable<Array<any>>
  siteId!:string
  siteData!: Site
  length!:number
  constructor(private passwordManagerService:PasswordmanagerService,private formBuilder: FormBuilder,private route:ActivatedRoute){
    this.siteForm = this.formBuilder.group({
      id: [''],
      username: [''],
      password: ['',[Validators.required]],
    })
  }
  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('id')!;
    console.log('Received ID:', this.siteId);
    this.passwordManagerService.getSiteDetails(this.siteId).subscribe(data => {
      this.siteData = data;
      console.log('Site Data:', this.siteData);
    });
    this.credentials = this.passwordManagerService.loadPasswords(this.siteId)
    this.credentials.subscribe((array) => {
      console.log('Length of the array:', array.length);
      this.length = array.length
    });
  }
 
  onSubmit(): void{
    this.passwordManagerService.addPassword(this.siteId,this.siteForm.value).then(()=>{
      console.log("Password Added")
      this.isSuccess = true
      this.siteForm.reset()
    })
  }
  onEdit(id:string,userName:string,password:string):void{
    this.state = 'Edit'
    this.siteForm.patchValue({
      id: id,
      username: userName,
      password: password
    })
  }
  onDelete(id:string):void{
    console.log("Delete",id)
  }

}
