import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {
  @ViewChild('selfie') selfie: any;
  video: any;
  displayControls: any;
  imageReady: boolean;
  imageURL: string;

  constructor() {
  }

  ngOnInit() {
    this.video = this.selfie.nativeElement;
  }

  initCamera(config: any) {
    var browser = <any>navigator;

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

  toggleControls() {
    this.video.controls = this.displayControls;
    this.displayControls = !this.displayControls;
  }

  resume() {
    this.video.play();
  }

  takePhoto() {
    console.log('>>>')
    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    var ctx = canvas.getContext('2d');
    //draw image to canvas. scale to target dimensions
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
this.imageReady = true;
//convert to desired file format
    this.imageURL = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
    // console.log('data url: ', dataURI);

  }

}
