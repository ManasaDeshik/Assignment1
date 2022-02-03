import { io } from 'socket.io-client';
import { Observable, Subscription } from 'rxjs';
import { SessionStorage } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

export class SocketService {
    private url = environment.ws_url;
    private socket;
    @SessionStorage('authenticationToken') public authenticationToken: string;

    constructor() {
        //this.socket = io(this.url,{reconnection : true,'reconnectionDelay': 50,
        //'reconnectionAttempts': 200,transports : ['websocket'],auth : {'token' : this.authenticationToken}});
        //console.log(this.socket)
    }

    reconnect(){
        //this.socket.disconnect()
       // this.socket.connect()
    }

    public sendMessage(message) {
       // this.socket.emit('fm_socket', message);
    }

    public getMessages = new Observable((subscriber) => {
        // this.socket.on('fm_socket', (message) => {
        //     subscriber.next(message);
        // });
    });
}