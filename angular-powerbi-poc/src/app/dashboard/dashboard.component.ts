import { Component, ElementRef, OnInit } from '@angular/core';
import { IReportEmbedConfiguration, models, service } from 'powerbi-client';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // CSS Class to be passed to the wrapper
  reportClass = 'report-container hidden';

  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;

  reportConfig: IReportEmbedConfiguration = {
    type: "report",
    id: undefined,
    embedUrl: undefined,
    accessToken: undefined,
    tokenType: models.TokenType.Embed,
    settings: {
      filterPaneEnabled: true,
      navContentPaneEnabled: true,
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToPage
      }
    }
  }

  eventHandlersMap = new Map<string, (event?: service.ICustomEvent<any>) => void>([
    ['loaded', () => console.log('Report has loaded')],
    ['rendered', () => console.log('Report rendered')],
    ['error', (event?: service.ICustomEvent<any>) => console.error(event ? event.detail : "no event obj")],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
  ]);


  constructor(public apiService: ApiService, private element: ElementRef<HTMLDivElement>) { }

  ngOnInit(): void {
    this.embedReport();
  }

  embedReport() {
    this.apiService.getPowerBIEmbedConfig().subscribe(
      res => {
        console.log(res);
        this.reportConfig = {
          ...this.reportConfig,
          id: res.Id,
          embedUrl: res.EmbedUrl,
          accessToken: res.EmbedToken.Token,
        };

        // Get the reference of the report-container div
        const reportDiv = this.element.nativeElement.querySelector('.report-container');
        console.log("element -> nativeElement -> report-container:", reportDiv);
        
        if (reportDiv) {
          // When Embed report is clicked, show the report container div
          reportDiv.classList.remove('hidden');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
