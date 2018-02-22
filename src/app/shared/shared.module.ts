import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from '.';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
  providers: []
})
export class SharedModule { }
