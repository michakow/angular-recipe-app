import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormData } from 'src/app/interfaces/form-data';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeApiService } from 'src/app/services/recipe-api.service';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  recipeForm!: FormGroup;
  newRecipe!: Recipe;
  descriptionPlaceholder: string = `Jak przygotować? (wg wzoru)\n1. obrać ziemniaki\n2. wstawić na średni ogień\n3. czekać 20 minut`;
  showModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private recipeDetailsService: RecipeDetailsService,
    private router: Router,
    private recipeApiService: RecipeApiService,
    private userService: UserService
  ) {}

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

  closeModal(rating: number): void {
    this.newRecipe.rating = rating;
    this.showModal = false;
    this.recipeDetailsService.selectedRecipe.next(this.newRecipe);

    this.recipeApiService.addRecipe(this.newRecipe).subscribe((res) => this.router.navigate(['recipes', 'details', res.id]));
  }

  addNextIngriedient(): void {
    this.ingriedientsFormArray.push(
      new FormGroup({
        name: this.formBuilder.control('', [Validators.required]),
        value: this.formBuilder.control('', [Validators.required]),
      })
    );
  }

  removeIngriedient(index: number): void {
    this.ingriedientsFormArray.removeAt(index);
  }

  onSubmit(): void {
    this.recipeForm.markAllAsTouched();
    if (this.recipeForm.invalid) return;
    this.newRecipe = this.formatFormData(this.recipeForm.value);
    this.showModal = true;
  }

  formatFormData(formData: FormData): Recipe {
    const uuid: number = parseInt(new Date().getTime().toString().substring(8));
    const recipeWithoutRating: Recipe = {
      name: formData.name,
      description: formData.description.split('\n'),
      ingriedients: formData.ingriedients,
      id: uuid,
      rating: 0,
      author: this.userService.getName(),
    };
    return recipeWithoutRating;
  }

  private createForm(): FormGroup {
    const form = (this.recipeForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      description: this.formBuilder.control('', [Validators.required]),
      ingriedients: this.formBuilder.array([
        this.formBuilder.group({
          name: this.formBuilder.control('', [Validators.required]),
          value: this.formBuilder.control('', [Validators.required]),
        }),
      ]),
    }));

    return form;
  }
}
