import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { Recipe } from 'src/app/models/recipe.model';
import { UtilsService } from 'src/app/services/utils.service';
import { setIngredientsPreparation, setSkillsOrder, addSkillPrepared, removeSkillPrepared } from 'src/app/store/game.actions';
import { selectGame, selectIndex, selectLookingIndexModifier } from 'src/app/store/game.selectors';
import { Ingredient } from 'src/app/types/ingredient.type';
import { Phase } from 'src/app/types/phase.type';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class HandComponent {

  store = inject(Store);
  utilsService = inject(UtilsService);
  phase!: Phase;
  skills: Recipe[] = [];
  skillsSelected: number[] = [];
  lim!: number;
  iamReady: boolean = false;

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.phase = game.currentPhase;
      this.iamReady = game.areReady[this.store.selectSignal(selectIndex)()];
      this.skillsSelected = [];
      for (let i = 0; i < game.playingAreas[this.store.selectSignal(selectIndex)()].skills.length; i++) this.skillsSelected.push(-1);
      this.store.select(selectLookingIndexModifier).subscribe((lim: number) => {
        const sk = game.playingAreas[this.utilsService.newIndexInArrayAfterRotation(
          this.store.selectSignal(selectIndex)(),
          game.playersName.length,
          lim
        )].skills;
        this.skills = [];
        for (const s of sk) this.skills.push(new Recipe(s.arcana.slice(), s.input.slice(), s.direction, s.output.slice()));
        this.lim = lim;
      });
    });
  }

  skillToggle(i: number) {
    const max = Math.max(...this.skillsSelected);
    if (this.skillsSelected[i] != -1) {
      this.skillsSelected[i] = -1;
      this.store.dispatch(removeSkillPrepared(this.skills[i]));
    }
    else {
      this.skillsSelected[i] = max + 1;
      this.store.dispatch(addSkillPrepared(this.skills[i]));
    }
    const newOrder = this.skillsSelected.slice();
    this.store.dispatch(setSkillsOrder({order: newOrder}));
    this.recalculateInOut();
  }

  private recalculateInOut() {
    let input: Ingredient[] = [];
    let output: Ingredient[] = [];
    for (let i = 0; i < this.skillsSelected.length; i++) {
      if (this.skillsSelected[i] !== -1) {
        input.push(...this.skills[i].input);
        output.push(...this.skills[i].output);
      }
    }
    input = this.utilsService.sortIngredientsLetter(input);
    output = this.utilsService.sortIngredientsLetter(output);
    this.store.dispatch(setIngredientsPreparation({in: input, out: output}));
  }

  onIngredientChanged(event: {recipeIndex: number, inputOutput: "input"|"output", index: number}) {
    if (this.skills[event.recipeIndex][event.inputOutput][event.index][1] === this.skills[event.recipeIndex][event.inputOutput][event.index][1].toUpperCase()) {
      this.skills[event.recipeIndex][event.inputOutput][event.index] = this.skills[event.recipeIndex][event.inputOutput][event.index][0].toUpperCase() + this.skills[event.recipeIndex][event.inputOutput][event.index][1].toLowerCase() as Ingredient;
    } else {
      this.skills[event.recipeIndex][event.inputOutput][event.index] = this.skills[event.recipeIndex][event.inputOutput][event.index][0].toLowerCase() + this.skills[event.recipeIndex][event.inputOutput][event.index][1].toUpperCase() as Ingredient;
    }
  }

}
