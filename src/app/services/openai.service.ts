// 文件名: src/app/services/openai.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  // 这里更新为最新的ChatGPT模型API的URL
  private openaiUrl = 'https://zhh.liangzhili.com/openai/v1/chat/completions'; 
  private apiKey = 'kjzbcxnIG#icng35ksDSFGJDK24'; // 你需要从OpenAI网站获取API key

  constructor(private http: HttpClient) { }

  // 更新方法名以更好地反映其功能
  getChatCompletion(messages: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
    // 更新请求体结构以匹配Chat Completions API的要求
    const body = {
      model: "gpt-4", // 指定模型
      messages: messages, // 这里应该传递一个消息数组
      temperature: 0.0,
    };
    return this.http.post(this.openaiUrl, body, { headers: headers });
  }
}
