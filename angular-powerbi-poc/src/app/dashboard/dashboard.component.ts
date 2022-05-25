import { Component, ElementRef, OnInit } from '@angular/core';
import { IReportEmbedConfiguration, models, service } from 'powerbi-client';

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
  }

  eventHandlersMap = new Map<string, (event?: service.ICustomEvent<any>) => void>([
    ['loaded', () => console.log('Report has loaded')],
    ['rendered', () => console.log('Report rendered')],
    ['error', (event?: service.ICustomEvent<any>) => console.error(event ? event.detail : "no event obj")],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
  ]);


  constructor(private element: ElementRef<HTMLDivElement>) { }

  ngOnInit(): void {
    let reportConfigResponse = {
      Id: "f6bfd646-b718-44dc-a378-b73e6b528204",
      EmbedUrl: "https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204\u0026groupId=be8908da-da25-452e-b220-163f52476cdd\u0026w=2\u0026config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJhbmd1bGFyT25seVJlcG9ydEVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBab25lUGF0Y2giOnRydWV9fQ%3d%3d",
      EmbedToken: {
        Token: "H4sIAAAAAAAEAC1Wxw7syBH7l3eVAaVRMrAH5RxGWbop55xl-N89xu65qwsoFsnif_5YydNPSf7n339QZVs-MpKjWIfNFXpkR9ZISwyACuXjOE4esJZltsiohueWUEmxxbU5ZKE_cxtjQkeSLENM1eZep5iAoyd98Q_T6_3W1Jj6PaJvD-z3KZRfEtwp87Ps62ovM8ozWatuRUoEyQPo9tqCot1DfMQbDTZGAyXZDiPZGYTt25Bf5NZKTPxr9zBEkWVIDwaU4nezzkiPokxlfgOHhClB5e4wK9vVo6TzCbJcecckpG5jptluFvYjofF0A0SxKSS3uhRuKTRlmpDsZeQS2VoUELlEdCzhe6NVq3PXoAaU04EZDib32IuG6GfM7c1GXnKkcbu9iC_CuTgIOsBVQSdQIwZyZX7rSZylbcdw8lXvnFou8aRF5uOuiGCN47dWUUGTmsGXQa5FR2grbL8NsW7lzL1pGwuKA-CTYUjOJt966bqCaVMlOL_yDXBo65NkI7-_KX7t8A5-ErOBCEyQd1tY5Xn4qmph0jCq3DSTiZlADNDtgIxv8596Xl6qRcmVoW7B6Xs7q2HsJQcxQIyqUFBqZRjqCaurWkhU-6RNRJEayBSfgsQDc662JseFzQwik1AyNrClXvOz3uV7faiabxEYXN8UfFGarGNYJAW92IQxMUI1VNcguf8bEHdOJzBRtlnbR5mbhDeE8977fo2qsrSyXZ1-u1Y1hPwyX1pptzXtc80e1n1gjwP9IgPK0aj3IbDiw5AfU2m-2MqGfY4kfL-NgFTEU6EXhFK2bk9D70bwrqKszhTIQzVeiE9T7uMqXc-8l3mcRnSncG_GMYwwWEZNlI8OnxogqxLMTXnEL75ft0Z3OwD8ZMWhK8RO3K1qOaHQOmDuhq1trLEydojXqCg3gFodNNyMOkdwS-NNF-eXX0EqmVY7OnRY_fRLB4tSb00Vxqp9UcHWZzMOOR-S06PEwK8PvYOKlm9BbL6ON3H0WdmSGG0gUSnVOtv9KxTYp-F8RZb0KqGdlMRZ9yUfrS4hLhNFzhML66UbqNSgrnSQuyTU8_QBa7kDxGeMeU4iW3ybAHYhv9AYu8rH7VTrzooANRJIaqUAFn8FL7jQCvaOaq1bwL-ka8S5d2YPrmeqJGN-329siRRdgHgSjjG0NZfhep5t73FT-uCUnaN5fjjbtzR8vGQdz7IEQW7vGL9kYNsVVtSb11VwtIjz8tE6jKJO0PBh-Ky1K4HVQNAMSTHRHSFOvD0Dx3gSJiW6UtENFgomf-zqqo3tZ5JvkE6r3hsowTx0n-rM8rYNviEtNuK4EXa_Ogk_Vo1B_aMhvOObJrV9UbFnHr_GTct-kPDGbhvAe6Yjfe9l669n6tbFuqwUymutDVfdZxb8OUDtp6f3baFc5wh8Izak8RGxPTfMKBiHQZcCKYsRBht0MvNxnmLtPRXOzYz9un0ex0S9xvIFwo5Y54zOwZtLtc0i5o7QmDMEXwNasMANQr3ZCQ-AkcH-CrwDxAE-ud_FOwi-UI2WAhFy4A0lJMlsA068SBfsp55jvq5XRpgixxnOyAbGYWd0JYIGeMUA6qsmeOY1Vt-7fS_AW86GVa-4aIM9e4sWQV0s7pLaqoEd3csztgnmI_CdZtGar4okEsUr_Vzkz9k9OH7IEJ5tlC84mdTH6qHEwzwBuSwkgtUvYXo_r-0Mb3m9IIfmsDfoVWo7glaOcMtSIxKzgjGEF66M2KUmWLfdKnOFaAd8avfB-CvlALCDIAhcgyOA5y468lc0dt8-LTe935pzvhT7PT2ujBiR-R4egDkGuI8LwRZFbSKEVQ_yfMn3k2hgFjJHOMHjfaETfRJ9WJDE9_WQJR4bz6yrrVQOipjUyIdvX7HyhOEKqQaNoVxBlTRgdqlHa6gYO_n5iCpwXcETHEmauu2tFnE6DDk2PRhKmedAJUc9Iz0Yh_adlbOVAgVQ91jQF4QKmKU2VwjfuOzzU78ED93uvyxhdVIBS2lscD-ahYu25TMylk5Py5zND1s-cXx-9vsuw3zgQBratVsspDKDQlZApPIeezCS_E7bx_qMyohrkFWOvf-4lpyn1AuKtEQO5kzUFJIIMnYmB2YoJzPr_vymVISycHVSlfewZyvDmyVD2_D1EphuvBArBTrVIn94RlVYg9y-elfepgCUe7w2IJV2iyYERjAqoU6BY3Rpay212agrUZqTjL1sGxCLcwmzZv_L4Wh73j9-muBF4qcIlNoLThTvbJw3HOjjonysM_5uLRpRxKmRWMz9Hr03WRfINHSCQI2XzHd4FKf78Kc6zdlGDG6PkTtba0shofTkK4_LwS1cteSSm4FeRqVXowtb3fwVncZIX4jTR-uTQQ9tEa7B-j6uhule3cJIzTa9TxccvFQxy7SwyFmzbITbCzCbSbUXD9Z80Wm3c1tRYsUYg4jZmiM-mzW6bvemwNdKTH4wcjcSiNxF__XXn3_9Yddn3ie1eH4xCx5l6WytMfPoOuLhAs9QokmGURuG3kvs8gOGbdVPqcupH6uVeTwRWCyX5zDoK0LWd-HhAHmf6F8U8BnQG-F6D76S-klYi8N7lBK_sadxc-QyHh43UjZ8gnjrSuB7iPRt5eX_vdsiJPlMezMtQUdJgkT4wIqjN6gJeFb0YUlJcqsfEAkLPBmMpiNU2cBXNhUJFigrrFIiRRmmEZtEzxlq4W7cKsmp11WK_urYAtCkgUnuOGXyx_WVr0-BA9nR5nzXD86l1O-Rv0104qGGSFwHjlJIu8McGOTQi5rcZhnwE2K68aCPUop-97Hn9DdE8WMclpc3Eb5Y8pWpaUZc7SpsoBehf2B-5rpYZf-HsljUAss_fMrUX3xFIFj-cNbfVU5Tjcl-rMWvbHp48vpFzCoHXDKS2UHEjm7hpGzsMTozucgxZRCChK6TLs6DA1st43BqtLz-HWzV-ajszZJTZVwrNcl1g8cz9ZXOB2tW_Zd3QWLn4rSMVycaF5vic5SgbyY83AyZhZ8f9F_LrGXmYn4n8yRUNipma6_HtXWYnlep3T3E1J831_C-j1gud4eY5S_GSGOTjSEIhz8kcQu8k1EzPHWv3917IStPPb9hkOf205CHnoiuSysPILo12Zj01puUinKMpJ2_xnZRnYHMYd84s4bIF5lMlLkOrYIJHKrU9YZdEBjXwO6sUgenrh3WKBuq-mFgIkJDwLLxlYCQP7-QxG5XvKsDSBvmXv1g_u__ANz0feNaDAAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19"
      }
    }

    this.reportConfig = {
      ...this.reportConfig,
      id: reportConfigResponse.Id,
      embedUrl: reportConfigResponse.EmbedUrl,
      accessToken: reportConfigResponse.EmbedToken.Token,
    };

    // Get the reference of the report-container div
    const reportDiv = this.element.nativeElement.querySelector('.report-container');
    console.log("element->nativeElement->report-container:", reportDiv);

    if (reportDiv) {
      // When Embed report is clicked, show the report container div
      reportDiv.classList.remove('hidden');
    }
  }

}
