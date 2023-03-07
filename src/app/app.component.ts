import { Component, OnInit } from '@angular/core';
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private window: Window) {


  }

  ngOnInit() {

  }


  generate() {
    var _self = this;

    domtoimage.toBlob(document.getElementById('qrc') as any)
    .then(function (blob) {
      saveAs(blob, 'Lysimeter-1.png');
        // (_self.window as any).saveAs(blob, 'Lysimeter-1.png');
    });
  }
}
