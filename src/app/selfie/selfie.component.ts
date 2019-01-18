import {Component, OnInit, ViewChild, Input} from '@angular/core';


@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {
  @ViewChild('selfie') selfie: any;
  @ViewChild('staging') staging: any;
  @Input() videoHeight: any;
  video: any;
  imageReady: boolean;
  imageURL: string;
  hideCamera: boolean;
  filters: any;
  appliedFilter: any;


  constructor() {
  }

  ngOnInit() {
    this.imageReady = false;
    this.video = this.selfie.nativeElement;
    this.getFilters();
    this.startCamera();

  }

  getFilters() {
    const stylesheets = document.styleSheets;

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

  }

  selectFilter(filter) {
    console.log(filter);
    this.appliedFilter = filter;
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
      console.log();
      this.video.play();

    });
  }

  reset() {
    this.imageReady = false;
  }



  downloadImg(dataurl) {
    const a = document.createElement('a');
    a.href = dataurl;
    a.setAttribute('download', 'NgSelfieImage.jpg');
    const b = document.createEvent('MouseEvents');
    b.initEvent('click', false, true);
    a.dispatchEvent(b);
    return false;
  }


  takePhoto() {
    const canvas = document.createElement('canvas');

    console.log('video: ', canvas.height);
    console.log('staging', this.staging.nativeElement.offsetWidth);
    const canvasWidth = this.staging.nativeElement.offsetWidth;
    canvas.width = canvasWidth;
    canvas.height = this.videoHeight;
    const ctx = canvas.getContext('2d');
    // draw image to canvas. scale to target dimensions
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    this.imageReady = true;
    // convert to desired file format
    this.imageURL = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
  }

}
