import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
// import * as echarts from 'echarts/core';
// import { GaugeChart} from 'echarts/charts';
// import {CalendarComponent, LegendComponent, TitleComponent, TooltipComponent, VisualMapComponent} from 'echarts/components';
// import {CanvasRenderer} from 'echarts/renderers';
// echarts.use(
//   [ GaugeChart, TitleComponent,TooltipComponent, LegendComponent, 
//     CalendarComponent, VisualMapComponent, CanvasRenderer]
// );
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), 
    }),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
