import { BattleCharacter, Room } from '@/types/Room';
import { snackbarService } from './instances/snackbarService.instance';
import { Character } from '@/types/pokemon';

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
      this.ws.addEventListener('message', this.onMessage);
      this.ws.addEventListener('error', this.onError);
    }
  };

  public connectThen: (callback: () => any) => void = (callback) => {
    if (!this.ws) {
      this.ws = new WebSocket(this.URL);
      this.ws.addEventListener('message', this.onMessage);
      this.ws.addEventListener('error', this.onError);
      this.ws.addEventListener('open', callback);
    } else {
      callback();
    }
  };

  private onMessage: (ev: MessageEvent) => void = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data);
    switch (data.event) {
      case 'post-room':
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
  };

  private onError = () => {
    snackbarService.setError('Non connecté');
  };

  public do: (callback: (...args: any[]) => Promise<any>, ...args: any[]) => Promise<any> = async (callback: (...args: any[]) => Promise<any>, ...args: any[]) => {
    if (this.ws && this.ws.OPEN) {
      return await callback(...args);
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public getRoom: () => Ref<Room | undefined> = () => {
    return this.room;
  };

  public createRoom: (persistent: boolean) => Promise<void> = async (persistent: boolean) => {
    if (this.room.value?.uuid) {
      this.ws?.send(JSON.stringify({ event: 'close-room', uuid: this.room.value.uuid }));
    }
    this.ws?.send(JSON.stringify({ event: 'create-room', persistent }));
  };

  public leaveRoom: () => void = () => {
    this.room.value = undefined;
  };

  public joinRoom: (uuid: string) => Promise<void> = async (uuid: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'get-room', uuid }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public regenerateRoom = (options: { size: number, difficulty: number, crammed: number }, environment: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'regenerate-room', uuid: this.room.value?.uuid, options: { ...options, environment } }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public addCharacter = (character: Character, isPlayer: boolean) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'add-character', uuid: this.room.value?.uuid, character, isPlayer }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public updateCharacter = (character: BattleCharacter) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'update-character', uuid: this.room.value?.uuid, character }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public removeCharacter = (uuid: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({ event: 'remove-character', uuid: this.room.value?.uuid, character: uuid }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

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
  };

  public updateEnvironment = (environment: string) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: 'update-environment',
        uuid: this.room.value?.uuid,
        environment,
      }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public updateTile = (i: number, j: number) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: 'update-tile',
        uuid: this.room.value?.uuid,
        i,
        j,
        tile: this.room.value?.map[i][j],
      }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public moveAsset = (uuid: string, i: number, j: number) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: 'move-asset',
        uuid: this.room.value?.uuid,
        i,
        j,
        assetUuid: uuid
      }));
    } else {
      snackbarService.setError('Non connecté');
    }
  };

  public rollDice = (characterId: string, value: number) => {
    if (this.ws && this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: 'roll-dice',
        uuid: this.room.value?.uuid,
        characterId,
        value
      }));
    } else {
      snackbarService.setError('Non connecté');
    }
  }
}
