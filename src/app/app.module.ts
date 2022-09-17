import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CodeOrgComponent } from './code-org/code-org.component';
import { CanvasComponent } from './canvas/canvas.component';
import { SlothComponent } from './sloth/sloth.component';
import { SpacePirateHuntersComponent } from './space-pirate-hunters/space-pirate-hunters.component';
import { HourglassComponent } from './hourglass/hourglass.component';
import { CodeOrgHomeComponent } from './code-org/code-org-home/code-org-home.component';
import { CanvasHomeComponent } from './canvas/canvas-home/canvas-home.component';
import { BounceUpComponent } from './bounce-up/bounce-up.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { UnityComponent } from './unity/unity.component';
import { UnityhomeComponent } from './unity/unityhome/unityhome.component';
import { SlimemageComponent } from './slimemage/slimemage.component';

const firebaseConfig = {
  apiKey: "AIzaSyATJiJTJhtu1_5vYv1_FxrroYPhap8w0nM",
  authDomain: "bounceup-1eabd.firebaseapp.com",
  projectId: "bounceup-1eabd",
  storageBucket: "bounceup-1eabd.appspot.com",
  messagingSenderId: "625846739265",
  appId: "1:625846739265:web:3e3e3a2faffdf54a8001c0",
  measurementId: "G-1V344W9KF1"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CodeOrgComponent,
    CanvasComponent,
    SlothComponent,
    SpacePirateHuntersComponent,
    HourglassComponent,
    CodeOrgHomeComponent,
    CanvasHomeComponent,
    BounceUpComponent,
    UnityComponent,
    UnityhomeComponent,
    SlimemageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
