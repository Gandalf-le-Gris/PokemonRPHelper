import { Room } from "@/types/Room";
import { snackbarService } from "./instances/snackbarService.instance";

export class WebSocketService {
  private URL: string = 'ws://localhost:8080';
  private ws: WebSocket | undefined;
  private room: Ref<Room | undefined> = ref();

  public isConnected(): boolean {
    return !!this.ws;
  }

  public connect: () => void = () => {
    if (!this.ws) {
      this.ws = new WebSocket(this.URL);
      this.ws.onmessage = this.onMessage;
    }
  }

  private onMessage: (ev: MessageEvent<any>) => void = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data);
    switch (data.event) {
      case 'post-room':
        console.log(data.room)
        this.room.value = data.room;
        break;
      case 'error':
        snackbarService.setError(data.message);
        break;
      case 'connected':
        break;
      default:
        console.log('Uncaught message:', data);
    }
  }

  public do: (callback: () => Promise<any>) => Promise<any> = async (callback: () => Promise<any>) => {
    if (this.ws && this.ws.OPEN) {
      return await callback();
    } else {
      snackbarService.setError('Non connecté');
    }
  }

  public getRoom: () => Ref<Room | undefined> = () => {
    return this.room;
  }

  public createRoom: () => Promise<void> = async () => {
    if (this.room.value?.uuid) {
      this.ws?.send(JSON.stringify({ event: 'close-room', uuid: this.room.value.uuid }));
    }
    this.ws?.send(JSON.stringify({ event: 'create-room' }));
  }

  public leaveRoom: () => void = () => {
    this.room.value = undefined;
  }

  public joinRoom: (uuid: string) => Promise<void> = async (uuid: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'get-room', uuid }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }
}
