import { Component, ElementRef, QueryList, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordmanagerService } from '../passwordmanager.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-viewsites',
  imports: [ReactiveFormsModule,CommonModule,RouterLink,NavbarComponent,FontAwesomeModule],
  templateUrl: './viewsites.component.html',
  styleUrl: './viewsites.component.css'
})
export class ViewsitesComponent {
  @ViewChild('displayForm') displayForm: ElementRef | undefined
  @ViewChild('showResult') showResult!: QueryList<ElementRef>
  
  allSites!: Array<any>
  siteForm!: FormGroup
  state: string = 'Add'
  isSuccess:boolean = false
  showForm:boolean = false
  faArrow = faArrowRight
  searchTerm!:string
  ngOnInit() {
    this.passwordManagerService.loadSite().subscribe(data=>{
      this.allSites = data
    })
  }
  constructor(private passwordManagerService: PasswordmanagerService,private formBuilder: FormBuilder) {

    this.siteForm = this.formBuilder.group({
      id: [''],
      siteName: ['',[Validators.required]],
      siteURL : ['',[Validators.required]],
      siteImgURL: ['',[Validators.required]],
    })
  }
  onChange( term:string){
    this.searchTerm = term
    setTimeout(() => {
      this.scrollToResult();
    }, 300);
  }
  searchResult(data:any): boolean{
    return !this.searchTerm || data.siteName.toLowerCase().includes(this.searchTerm.toLowerCase())
  
  }
  onSubmit(){
    if(this.state == 'Edit'){
      this.passwordManagerService.updateSite(this.siteForm.value.id,this.siteForm.value).
      then(()=>{
        this.isSuccess = true
        
        this.siteForm.reset()
        this.state = 'Add'
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      }).
      catch(err=>{
        alert("Error occured"+err)
      })
    }
    else{
      this.passwordManagerService.addSite(this.siteForm.value).
      then(()=>{
        this.isSuccess = true
        this.siteForm.reset()
        this.state = 'Add'
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      })
      .catch(err=>{
        alert("Error occured"+err)
      })
      
    }
    this.toggle()
    }
    editSite(siteName:string,siteURL:string,siteImgURL:string,id:string){
      this.state = 'Edit'
      this.siteForm.patchValue({
        id: id,
        siteImgURL: siteImgURL,
        siteName: siteName,
        siteURL: siteURL
      })
      this.toggle()
    }
    deleteSite(id:string){
      this.passwordManagerService.deleteSite(id).
      then(()=>{
        console.log("Data deleted successfully")
      })
      .catch(err=>{
        alert("Error occured"+err)
      })
    }
    toggle(){
      this.showForm = !this.showForm
      if(this.showForm){
        this.scrollToForm()
      }
      
    }
    scrollToForm(){
      if(this.displayForm){
        this.displayForm.nativeElement.scrollIntoView({
          behavior: 'smooth', // smooth scroll
        block: 'start'
        })
      }
    }
    scrollToResult(){
        if (this.showResult) {
      const matchingResults = this.showResult.toArray();
      if (matchingResults.length > 0) {
        // Scroll to the first matching result
        matchingResults[0].nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }

    }
}
