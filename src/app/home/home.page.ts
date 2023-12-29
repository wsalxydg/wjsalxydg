import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OpenAIService } from "../services/openai.service";
import { FormsModule } from "@angular/forms";
import axios from "axios";
import { Router,ActivatedRoute  } from "@angular/router";



@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  mediaRecorder: MediaRecorder;
  //采集人像按钮控制
  isRecording: boolean;
  //再次采集按钮控制
  isRecordAgain:boolean;
  
  //上传按钮
  isUpload:boolean;
  //采集舌苔按钮
  istongue:boolean;
  //输入框禁用
  isInp:boolean;
  status_message: any;
  uploadMsg:any="上传";
  healthAdvice: string;
  spinner_show: boolean;
  record_time_duration: any;
  video_type: any;
  NameValue:any;
  ageValue:any;
  recordMsg:any="采集人像";
  isUploadMini:boolean;
  //摄像头值
  isOn:boolean;
  //切换摄像头按钮
  isIsOn:boolean;
  isOnMsg:any="去采集舌苔"
  // new_chartOption_HR: EChartsOption = {};
  // new_chartOption_BR: EChartsOption = {};
  // new_chartOption_SBP: EChartsOption = {};
  // new_chartOption_DBP: EChartsOption = {};
  heartValue: string = "";
  bpHeightValue: string = "";
  bpLowValue: string = "";
  videoBuffer:any="";
  selectedOption:string;
  photoData:any;
  tongueMsg:any="采集舌苔"
  // URL = "http://127.0.0.1:5000/"
  // URL = "https://3.0.109.248:5000/"
  // URL = "https://zhh.liangzhili.com/clone/";
  // URL = "https://faceai-ihpc.com/"
  // URL = "https://faceai-dummy-backend.vercel.app/"
  URL="https://zhh.liangzhili.com/clone/save"
  @ViewChild("firstVideo") firstVideo: ElementRef;
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  // //打印
  // @ViewChild('printButton') printButton: ElementRef;
  // print() {
  //   window.print();
  // }

  // chartOption_HR: EChartsOption = {
  //   grid: {
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //   },
  //   series: [
  //     {
  //       splitNumber: 4,
  //       min: 40,
  //       max: 120,
  //       type: "gauge",
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ["50%", "70%"],
  //       data: [{ value: 0 }],
  //       detail: {
  //         valueAnimation: true,
  //         formatter: "{value} bpm",
  //         fontSize: 15,
  //         offsetCenter: [0, "30%"],
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 23,
  //           color: [
  //             [0.25, "#FFA500"],
  //             [0.75, "#59EE76"],
  //             [1, "#FFA500"],
  //           ],
  //         },
  //       },
  //       radius: "110%",
  //       splitLine: {
  //         show: false,
  //         distance: -60,
  //         length: 30,
  //         lineStyle: {
  //           color: "#fff",
  //           width: 2,
  //         },
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         color: "black",
  //         distance: 16,
  //         fontSize: 12,
  //       },
  //     },
  //   ],
  // };

  // chartOption_BR: EChartsOption = {
  //   grid: {
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //   },
  //   series: [
  //     {
  //       splitNumber: 4,
  //       min: 5,
  //       max: 25,
  //       type: "gauge",
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ["50%", "70%"],
  //       data: [{ value: 0 }],
  //       detail: {
  //         valueAnimation: true,
  //         formatter: "{value} bpm",
  //         fontSize: 15,
  //         offsetCenter: [0, "30%"],
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 23,
  //           color: [
  //             [0.25, "#FFA500"],
  //             [0.75, "#59EE76"],
  //             [1, "#FFA500"],
  //           ],
  //         },
  //       },
  //       radius: "110%",
  //       splitLine: {
  //         show: false,
  //         distance: -60,
  //         length: 30,
  //         lineStyle: {
  //           color: "#fff",
  //           width: 2,
  //         },
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         color: "black",
  //         distance: 16,
  //         fontSize: 12,
  //       },
  //     },
  //   ],
  // };

  // chartOption_SBP: EChartsOption = {
  //   grid: {
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //   },
  //   series: [
  //     {
  //       splitNumber: 4,
  //       min: 65,
  //       max: 165,
  //       type: "gauge",
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ["50%", "70%"],
  //       data: [{ value: 0 }],
  //       detail: {
  //         valueAnimation: true,
  //         formatter: "{value} mmHg(SBP)",
  //         fontSize: 10,
  //         offsetCenter: [0, "30%"],
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 23,
  //           color: [
  //             [0.25, "#FFA500"],
  //             [0.75, "#59EE76"],
  //             [1, "#FFA500"],
  //           ],
  //         },
  //       },
  //       radius: "110%",
  //       splitLine: {
  //         show: false,
  //         distance: -60,
  //         length: 30,
  //         lineStyle: {
  //           color: "#fff",
  //           width: 2,
  //         },
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         color: "black",
  //         distance: 16,
  //         fontSize: 12,
  //       },
  //     },
  //   ],
  // };

  // chartOption_DBP: EChartsOption = {
  //   grid: {
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //   },
  //   series: [
  //     {
  //       splitNumber: 4,
  //       min: 45,
  //       max: 105,
  //       type: "gauge",
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ["50%", "70%"],
  //       data: [{ value: 0 }],
  //       detail: {
  //         valueAnimation: true,
  //         formatter: "{value} mmHg(DBP)",
  //         fontSize: 10,
  //         offsetCenter: [0, "30%"],
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 23,
  //           color: [
  //             [0.25, "#FFA500"],
  //             [0.75, "#59EE76"],
  //             [1, "#FFA500"],
  //           ],
  //         },
  //       },
  //       radius: "110%",
  //       splitLine: {
  //         show: false,
  //         distance: -60,
  //         length: 30,
  //         lineStyle: {
  //           color: "#fff",
  //           width: 2,
  //         },
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         color: "black",
  //         distance: 16,
  //         fontSize: 12,
  //       },
  //     },
  //   ],
  // };

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private openAIService: OpenAIService,
    private router:Router,
    private route: ActivatedRoute,
  ) {
 
  }

  ngOnInit(): void {
    this.isRecording = false;
    this.spinner_show = false;
    this.initialVideo();
    this.isRecordAgain=true
    this.isUpload=true
    this.istongue=true
    this.isInp=false
    this.isUploadMini=false
    this.isIsOn=true
    console.log("2222")
    this.initiakVideo()
  
  }

  async initialVideo() {
    // const stream = await navigator.mediaDevices.getUserMedia({
    //   video: {
    //     facingMode: 'user'
    //   },
    //   audio: false
    // });
    // this.captureElement.nativeElement.srcObject = stream;
    // const options = { mimeType: this.video_type };
    // this.mediaRecorder = new MediaRecorder(stream, options);

    //////////////// check supported video mineType ////////////
    if (MediaRecorder.isTypeSupported("video/webm")) {
      this.video_type = "video/webm";
    } else {
      this.video_type = "video/mp4";
    }
    console.log("-----------video type-----------");
    console.log(this.video_type);
    //////////////// check supported video mineType end ////////////

    //////////////////test external camera/////////////////////
    // let cameraId = null;
    // await navigator.mediaDevices.enumerateDevices()
    //   .then((devices) => {
    //     devices.forEach((device) => {
    //       console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
    //       if (device.kind === 'videoinput') {
    //         cameraId = device.deviceId;
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(`${err.name}: ${err.message}`);
    //   });

    // const constraints = {
    //   audio: false,
    //   video: {
    //     deviceId: cameraId
    //   }
    // };

    // (navigator.mediaDevices as any).getUserMedia(constraints).then((stream: any) => {
    //   this.captureElement.nativeElement.srcObject = stream;
    //   const options = { mimeType: this.video_type };
    //   this.mediaRecorder = new MediaRecorder(stream, options);
    // })
    /////////////test end//////////////////

    const desiredFps = 30; // 你想要的帧率
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          frameRate: { ideal: desiredFps, min: desiredFps },
        },
        audio: false,
      })
      .then((stream) => {
        this.firstVideo.nativeElement.srcObject = stream;
        const options = { mimeType: this.video_type };
        console.log(options,"opions")
        this.mediaRecorder = new MediaRecorder(stream, options);
      })
      .catch((error) => {
        // 处理错误，可能是设备不支持所需帧率
        console.log("video capturing error!!!");
      });
      
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
  ngAfterViewInit(): void {
    this.firstVideo.nativeElement.addEventListener("loadedmetadata", () => {
      const videoElement = this.firstVideo.nativeElement;
      const videoHeight = videoElement.clientHeight;
      const playerControlsWidth =
        videoElement.offsetWidth - videoElement.clientWidth;
      const visibleVideoWidth = videoElement.clientWidth - playerControlsWidth;

      let box: any = document.getElementById("circle-box");
      let box_width = visibleVideoWidth + "px";
      let box_height = videoHeight + "px";
      box.style.width = box_width;
      box.style.height = box_height;
      this.status_message = "点击按钮开始采集";
      this.healthAdvice = "请先进行测量";
    });
  }

  // 添加获取健康建议的新方法
  // getHealthAdvice(data: any) {
  //   // 构建消息数组
  //   const messages = `${data.hr}\n${data.bp_low} \n${data.bp_high}\n${data.br}`;
  //   // { role: "user", content: `I have measured my blood pressure and the values are systolic ${data.bp_high} mmHg and diastolic ${data.bp_low} mmHg. Can you provide health advice based on these readings?` }
  //   // console.log(messages)

  //   // 调用OpenAI服务
  //   this.openAIService.getChatCompletion(messages).subscribe({
  //     next: (response) => {
  //       // 假设返回的建议在这个属性中
  //       const advice = response.choices[0].message.content;
  //       this.healthAdvice = advice;
  //       this.changeDetectorRef.detectChanges(); // 更新视图
  //     },
  //     error: (error) => {
  //       console.error("Error:", error);
  //       this.healthAdvice = "获取建议时发生错误";
  //       this.changeDetectorRef.detectChanges(); // 更新视图
  //     },
  //   });
  // }

  async recordVideo() {
      console.log(this.selectedOption,"性别 男是male 女为female")
      console.log(this.NameValue,"这是名字")
      console.log(this.ageValue,"这是年龄")
      this.recordMsg="采集中..."
      this.record_time_duration = 12;
      this.spinner_show = true;
      this.isRecording = true;
      this.isRecordAgain=true
      this.istongue=true
      this.isIsOn=true
      
      this.status_message =
        "采样中...剩余时间：" + this.record_time_duration + "秒";

      this.mediaRecorder.start();
      let chunks: any = [];

      // this.new_chartOption_HR = {
      //   series: [{ data: [{ value: 0 }] }],
      // };
      // this.new_chartOption_BR = {
      //   series: [{ data: [{ value: 0 }] }],
      // };
      // this.new_chartOption_SBP = {
      //   series: [{ data: [{ value: 0 }] }],
      // };
      // this.new_chartOption_DBP = {
      //   series: [{ data: [{ value: 0 }] }],
      // };

      const countdown_timer = setInterval(() => {
        if (this.record_time_duration > 0) {
          this.record_time_duration -= 1;
          this.status_message =
            "检测中...剩余时间：" + this.record_time_duration + "秒";
        }
      }, 1000);

      setTimeout(() => {
        this.status_message = "检测成功";
        this.mediaRecorder.stop();
        clearInterval(countdown_timer);
      
        this.spinner_show=false
      
        this.recordMsg="重新采集"
        this.isRecording = false;
        this.isIsOn=false
        this.isRecordAgain=false
     
      }, 12000);

      this.mediaRecorder.ondataavailable = (event) => {
        console.log(event,"event")
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async (event) => {
         this.videoBuffer = new Blob(chunks, { type: this.video_type });
        console.log(this.video_type)
        console.log(this.videoBuffer, "video<<<<");
        //send video
        // this.postVideoToServer(videoBuffer)
       
      
       
    
      };
  
  }

  async recordAgain(){
    this.heartValue=''
    this.bpHeightValue=''
    this.bpLowValue=''
    this.isRecording=false
    this.spinner_show=false
    this.status_message='点击按钮开始采集'
    this.recordMsg="采集人像"
    this.isOnMsg="去采集舌苔"
    this.tongueMsg='采集舌苔'
    this.isUpload=true
    this.isInp=false
   this.istongue=true
    this.uploadMsg="上传"
    this.isOn=false
    this.isIsOn=true
    this.selectedOption=""
    this.NameValue=""
    this.ageValue=""
  }
  async upload(){
    if (
      this.heartValue.length &&
      this.bpHeightValue.length &&
      this.bpLowValue.length 
    ) {
    this.uploadMsg="上传中..."
    this.status_message="上传中..."
    this.isInp=true
    this.isUpload=true
    this.isRecordAgain=true
    this.isIsOn=true
    this.istongue=true
    axios({
      url: "https://zhh.liangzhili.com/clone/save ",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      data: {
        video:this.videoBuffer,
        hr: this.heartValue,
        bp_high: this.bpHeightValue,
        bp_low: this.bpLowValue,
      },
    }).then((res)=>{
     this.uploadMsg="上传成功"
     this.isRecordAgain=false
     this.istongue=true
     this.status_message="上传成功"
    })
  } else {
    alert("血压和心率值不能为空");
  }
  }
  async ToTongue(){
    this.isUpload=false
    this.tongueMsg='重新采集舌苔'
    // this.router.navigate(["/tongue"])
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
  }
  async changeIsOn(){
     this.isOn=!this.isOn
     if(this.isOn == false){
      this.isOnMsg= "重新采集舌苔"
      this.isRecording=false
      this.istongue=true
     }else if(this.isOn == true){
      this.isOnMsg= "重新采集人像"
      this.isRecording=true
      this.istongue=false
     }
  }
  async recognition(){

  }
  // stopRecord() {
  //   this.isRecording = false;
  //   console.log("stopRecord?????")
  //   this.mediaRecorder.stop();
  //   // this.captureElement.nativeElement.srcObject = null; //camera off
  // }

  // async postVideoToServer(recordedBlobs: any) {
  //   let headers = { headers: new HttpHeaders({ 'Content-Type': this.video_type }) };

  //   this.isRecording = false;
  //   this.spinner_show = false;

  //   this.http.post(this.URL + 'predict', recordedBlobs, headers)
  //     .subscribe({
  //       next: data => {
  //         let results = JSON.stringify(data)
  //         let res = JSON.parse(results)
  //         console.log(data,)

  //         this.new_chartOption_HR = {
  //           series: [{ data: [{ value: res.hr }] }]
  //         }
  //         this.new_chartOption_BR = {
  //           series: [{ data: [{ value: res.br }] }]
  //         }
  //         this.new_chartOption_SBP = {
  //           series: [{ data: [{ value: res.bp_high }] }]
  //         }
  //         this.new_chartOption_DBP = {
  //           series: [{ data: [{ value: res.bp_low }] }]
  //         }

  //         if (res.msg === 'Finish'){
  //           this.status_message = '已完成测量'
  //         }
  //         else{
  //           this.status_message = res.msg
  //         }
  //         this.changeDetectorRef.detectChanges();

  //         // 获取健康建议
  //         this.healthAdvice = "生成中...";
  //         this.getHealthAdvice(data); // 假设data包含了血压等信息
  //       },
  //       error: error => {
  //         console.log("error===================")
  //         console.log(error)
  //         this.status_message = "Error: " + error.name
  //         this.changeDetectorRef.detectChanges();
  //       }
  //     })
  //   // console.log("======postVideoToServer=======")
  //   // try{
  //   //   const response = await fetch(this.URL + 'predict', { method: "POST", body: recordedBlobs })
  //   //   console.log("===========response============")
  //   //   console.log(response)
  //   // }catch(e){
  //   //   console.log("===========error============")
  //   //   console.log(e)

  //   // }

  // }
}
