import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInput } from '../../model/models';
import { WeatherAPIService } from '../../service/weather-api.service';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  fb = inject(FormBuilder)
  form!: FormGroup

  constructor(private weatherAPIService: WeatherAPIService) {}
  fromApi: any
  errorMessage: any

  ngOnInit(): void {

    this.form =  this.createForm()

  }

  createForm(): FormGroup {

    return this.fb.group({
      city: this.fb.control<string>("", [ Validators.required ])
    })

  }

  processForm(): void {

    // const values = this.form.value
    const values: FormInput = this.form.value
    console.log(">>>Values: ", values)

    const cityName = this.form.value.city

    this.weatherAPIService.getAPI(cityName).subscribe({
      next: (data) => { 
        this.fromApi = data, 
        this.errorMessage = ""
      }, 
      error: (err) => {
      // error: (err) => console.error(err)
        this.errorMessage = err,
        this.fromApi = null
      }

    })

  }

  isCtrlValid(ctrl: string): boolean {

    const control = this.form.get(ctrl)
    return !!control && control.valid && (control.dirty || control.touched)

  }

  isCtrlInvalid(ctrl: string): boolean { 

    const control = this.form.get(ctrl)
    return !!control && control.invalid && (control.dirty || control.touched)

  }

  get cityCtrl() {
    return this.form.get('city')
  }

}
