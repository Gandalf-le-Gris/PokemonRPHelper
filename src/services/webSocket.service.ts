import { BattleCharacter, Room } from "@/types/Room";
import { snackbarService } from "./instances/snackbarService.instance";
import { Character } from "@/types/pokemon";

export class WebSocketService {
  private URL: string = import.meta.env.VITE_WS_URL;
  private ws: WebSocket | undefined;
  private room: Ref<Room | undefined> = ref();

  public isConnected(): boolean {
    return !!this.ws;
  }

  public connect: () => void = () => {
    if (!this.ws) {
      this.ws = new WebSocket(this.URL);
      this.ws.onmessage = this.onMessage;
      this.ws.onerror = this.onError;
    }
  }

  public connectThen: (callback: () => any) => void = (callback) => {
    if (!this.ws) {
      this.ws = new WebSocket(this.URL);
      this.ws.onmessage = this.onMessage;
      this.ws.onerror = this.onError;
      this.ws.onopen = callback;
    } else {
      callback();
    }
  }

  private onMessage: (ev: MessageEvent<any>) => void = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data);
    switch (data.event) {
      case 'post-room':
        console.log(data.room);
        this.room.value = data.room;
        break;
      case 'error':
        snackbarService.setError(data.message);
        break;
      case 'connected':
        break;
      case 'ping':
        this.ws?.send(JSON.stringify({ event: 'pong' }));
        break;
      default:
        console.log('Uncaught message:', data);
    }
  }

  private onError = () => {
    snackbarService.setError('Non connecté');
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

  public regenerateRoom = (options: { size: number, difficulty: number, crammed: number }, environment: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'regenerate-room', uuid: this.room.value?.uuid, options: { ...options, environment } }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }

  public addCharacter = (character: Character, isPlayer: boolean) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'add-character', uuid: this.room.value?.uuid, character, isPlayer }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }

  public updateCharacter = (character: BattleCharacter) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'update-character', uuid: this.room.value?.uuid, character }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }

  public removeCharacter = (uuid: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'remove-character', uuid: this.room.value?.uuid, character: uuid }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }

  public updateInitiative = () => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: 'update-initiative',
        uuid: this.room.value?.uuid,
        initiativeList: this.room.value?.initiativeList,
        activeCharacter: this.room.value?.activeCharacter,
      }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }
}
