import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  recipeForm!: FormGroup;
  withoutIng: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  get ingriedientsFormArray() {
    return this.recipeForm.controls['ingriedients'] as FormArray;
  }

  get ingriedientsFormGroup() {
    return this.ingriedientsFormArray.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.recipeForm = this.createForm();
  }

  ngAfterViewInit(): void {}

  addNextIngriedient() {
    this.ingriedientsFormArray.push(
      new FormGroup({
        ingName: this.formBuilder.control('', [Validators.required]),
        ingValue: this.formBuilder.control('', [Validators.required]),
      })
    );
  }

  removeIngriedient(index: number) {
    this.ingriedientsFormArray.removeAt(index);
  }

  onSubmit() {
    this.recipeForm.markAllAsTouched();
    if (this.recipeForm.invalid) return;
    console.log(this.recipeForm.value);
  }

  private createForm(): FormGroup {
    const form = (this.recipeForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      description: this.formBuilder.control('', [Validators.required]),
      ingriedients: this.formBuilder.array([
        this.formBuilder.group({
          ingName: this.formBuilder.control('', [Validators.required]),
          ingValue: this.formBuilder.control('', [Validators.required]),
        }),
      ]),
    }));

    return form;
  }
}
