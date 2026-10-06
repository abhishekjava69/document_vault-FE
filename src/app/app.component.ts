import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
constructor() {
    this.lockPortrait();
  }

  async lockPortrait() {
    try {
      await ScreenOrientation.lock({
        orientation: 'portrait'
      });
    } catch (error) {
      console.log('Screen orientation lock failed:', error);
    }
  }

}

