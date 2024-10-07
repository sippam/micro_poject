import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Define the WebSocket URL (replace with your own WebSocket server URL)
    this.socket$ = webSocket('ws://154.84.153.48:8080');
  }

  // Get a stream of messages from the WebSocket server
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Close the WebSocket connection
  closeConnection(): void {
    this.socket$.complete();
  }

}
