import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketServiceService } from './shared/services/web-socket-service.service';
import { FormsModule } from '@angular/forms';

interface MSG {
  time_stamp: string;
  acc: string;
  temp: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'micro_dashboard';
  message = '';
  messages: MSG[] = [];

  constructor(private websocketService: WebSocketServiceService) {}

  ngOnInit(): void {
    // Subscribe to incoming messages from the WebSocket server
    this.websocketService.getMessages().subscribe((msg) => {
      console.log("get MSG", msg);
      
      this.messages.push(msg);
    });
  }
}
