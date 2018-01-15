import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './services/dialog.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DialogService, CanDeactivateGuard]
})
export class SharedModule { }
