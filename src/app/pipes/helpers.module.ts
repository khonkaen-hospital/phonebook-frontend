import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDateAbbrPipe } from './thai-date-abbr.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThaiDateAbbrPipe
    ],
    exports: [
        ThaiDateAbbrPipe
    ]
})
export class HelperModule { }