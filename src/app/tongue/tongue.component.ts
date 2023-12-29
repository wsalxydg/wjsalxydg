import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-tongue',
  templateUrl: './tongue.component.html',
  styleUrls: ['./tongue.component.scss'],
})
export class TongueComponent implements OnInit {
  photoData:any;
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  constructor(
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initiakVideo()
  }
  async initiakVideo() {
  
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          const video = this.videoElement.nativeElement;
          video.srcObject = stream;
          video.play();
        })
        .catch(error => console.error('Error accessing camera:', error));
  }
  async takePhoto() {
    // 获取视频元素和画布元素
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    
    // 设置画布尺寸与视频尺寸一致
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 在画布上绘制当前视频帧
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 将画布内容转换为图像 URL
    // const photoUrl = canvas.toDataURL();
  ;
    this.photoData=canvas.toDataURL();
     
    // 在这里可以将 photoUrl 发送到服务器，或者进行其他处理

    // 输出图像
    // const link = document.createElement('a');
    // link.href = photoUrl;
    // console.log(link)
    // link.download = 'photo.png';
    // link.click();
  }
  async goback(){
    this.router.navigate(['/home',{photoData:this.photoData}])
  }

}
