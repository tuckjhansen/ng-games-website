import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanvasComponent } from "./canvas/canvas.component";
import { CodeOrgHomeComponent } from "./code-org/code-org-home/code-org-home.component";
import { CodeOrgComponent } from "./code-org/code-org.component";
import { HomeComponent } from "./home/home.component";
import { HourglassComponent } from "./hourglass/hourglass.component";
import { SlothComponent } from "./sloth/sloth.component";
import { SpacePirateHuntersComponent } from "./space-pirate-hunters/space-pirate-hunters.component";
import { CanvasHomeComponent } from "./canvas/canvas-home/canvas-home.component";
import { BounceUpComponent } from "./bounce-up/bounce-up.component";
import { UnityComponent } from "./unity/unity.component";
import { UnityhomeComponent } from "./unity/unityhome/unityhome.component";
import { SlimemageComponent } from "./slimemage/slimemage.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'code-org',
        component: CodeOrgComponent,
        children: [
            {
                path: 'sloth',
                component: SlothComponent
            },
            {
                path: 'pirate-hunters',
                component: SpacePirateHuntersComponent
            },
            {
                path: 'hourglass',
                component: HourglassComponent
            },
            {
                path: 'home',
                component: CodeOrgHomeComponent
            }
        ]
    },
    {
        path: 'canvas',
        component: CanvasComponent,
        children: [
            {
                path: 'home',
                component: CanvasHomeComponent
            },
            {
                path: 'bounce-up',
                component: BounceUpComponent
            }
        ]
    },
    {
        path: 'unity',
        component: UnityComponent,
        children: [
            {
                path: 'home',
                component: UnityhomeComponent
            },
            {
                path: 'slime-mage',
                component: SlimemageComponent
            }
            
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }