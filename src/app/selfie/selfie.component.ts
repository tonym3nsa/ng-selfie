import {Component, OnInit, ViewChild} from '@angular/core';
import {st} from '@angular/core/src/render3';


@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {
  @ViewChild('selfie') selfie: any;
  @ViewChild('staging') staging: any;
  video: any;
  displayControls: any;
  imageReady: boolean;
  imageURL: string;
  filterList: any;
  filters: any;
  appliedFilter: any;


  constructor() {
  }

  ngOnInit() {
    this.video = this.selfie.nativeElement;
    this.getFilters();
    this.startCamera();

  }

  getFilters() {
    const stylesheets  = document.styleSheets;
    console.log('sheets: ', stylesheets[0])
    // @ts-ignore
    const filterList = stylesheets[1].rules;

    this.filters = [];
    console.log('filter list: ', filterList);
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].selectorText.includes('.filter-') && !filterList[i].selectorText.includes('before')) {
        this.filters.push(filterList[i].selectorText);
      }
    }

    for (let i = 0; i < this.filters.length; i++) {

      this.filters[i] = this.filters[i].replace('.', '');

    }

    console.log('stylesheet : ', this.filters);
  }

  selectFilter(event) {
    console.log(event.srcElement.value)
    this.appliedFilter = event.srcElement.value;
  }

  startCamera() {
    const config = {video: true, audio: false};
    this.initCamera(config);
  }

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {

      this.video.srcObject = stream;
      this.video.play();
    });
  }

  start() {
    this.initCamera({video: true, audio: false});
  }

  sound() {
    this.initCamera({video: true, audio: true});
  }

  pause() {
    this.video.pause();
  }


  resume() {
    this.video.play();
  }

  takePhoto() {
    console.log('>>>');
    let canvas = document.createElement('canvas');
    console.log('staging', this.staging.nativeElement.offsetWidth)
const canvasWidth = this.staging.nativeElement.offsetWidth;
    canvas.width = canvasWidth;
    canvas.height = 500;
    var ctx = canvas.getContext('2d');
    //draw image to canvas. scale to target dimensions
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    this.imageReady = true;
//convert to desired file format
    this.imageURL = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
    // console.log('data url: ', dataURI);

  }

}
