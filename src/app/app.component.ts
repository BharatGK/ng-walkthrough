import { Component } from '@angular/core';
import {
  WalkthroughText,
  WalkthroughContainerComponent,
  WalkthroughEvent,
  WalkthroughComponent
} from 'angular-walkthrough';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  frenchText: WalkthroughText = {
    previous: 'Précédent',
    next: 'Suivant',
    close: 'Fermer'
  };

  testClickCount = 0;
  testClickTexts = ['click me', 'it\'s ok!', 'realy ok', 'ok ok...', 'stop that!'];
  testPosition = 'center';
  alignContent = 'left';
  verticalAlignContent = 'top';
  valignHeight = '600px';
  contentSpacing = 200;
  verticalContentSpacing = 50;

  // disabled flags
  step1flowDisabled = false;
  step2flowDisabled = false;
  step3flowDisabled = false;
  step4flowDisabled = false;

  hideCount = 3;
  private _count = 3;
  private _start = false;

  get isMobile(): boolean {
    return window.innerWidth < 768;
  }

  buttonAction() {
    if (this.testClickCount < this.testClickTexts.length - 1) {
      this.testClickCount++;
    }
  }

  focusClickAction(event: Event, contenaire: WalkthroughContainerComponent) {
    contenaire.next();
  }

  walk3IsReady(event: WalkthroughEvent) {
    // tslint:disable-next-line:no-console
    console.log('walk3IsReady', event);
    setTimeout(() => {
      event.component.arrowColor = 'red';
    }, 1000);
    setTimeout(() => {
      event.component.arrowColor = 'blue';
    }, 2000);
    setTimeout(() => {
      event.component.arrowColor = 'yellow';
    }, 3000);
  }

  hideWalkthrough() {
    if (this.hideCount === this._count && !this._start) {
      this._start = true;
      const int = setInterval(() => {
        this.hideCount--;
        if (this.hideCount === 0) {
          clearInterval(int);
          if (WalkthroughComponent.walkthroughHasShow() && !WalkthroughComponent.walkthroughHasPause()) {
            WalkthroughComponent.walkthroughStop();
          } else {
            console.warn('Not walkthrough showing');
            this._start = false;
            this.hideCount = this._count;
          }
        }
      }, 1000);
    } else if (this.hideCount === 0) {
      this._start = false;
      this.hideCount = this._count;
      WalkthroughComponent.walkthroughContinue();
    }
  }

  walk1Closed(finishButton: boolean) {
    // tslint:disable-next-line:no-console
    console.log('walk1 has been closed with value : ' + (finishButton ? 'true' : 'false'));
  }

  walk1Finished() {
    // tslint:disable-next-line:no-console
    console.log('walk1 has been finished');
  }

  flowClosed(finishButton: boolean) {
    // tslint:disable-next-line:no-console
    console.log('flow has been closed with value : ' + (finishButton ? 'true' : 'false'));
  }

  flowFinished() {
    // tslint:disable-next-line:no-console
    console.log('flow has been finished');
  }

  pause() {
    WalkthroughComponent.walkthroughStop();
  }

  continue() {
    WalkthroughComponent.walkthroughContinue();
  }

  rename() {
    const list: any = document.querySelectorAll('.rename');
    list.forEach((elt: HTMLElement) => {
      if (elt.id.endsWith('-rename')) {
        elt.id = elt.id.replace('-rename', '');
      } else {
        elt.id += '-rename';
      }
    });
  }
}
