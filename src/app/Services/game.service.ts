import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../Types/Game';
import { PlayerTurn } from '../Types/PlayerTurn';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url: string = "http://localhost:8090/"
  model: Game = {
    roomId: "",
    numPlayers: 0,
    playerNames: '',
    playerCards: [],
    deckCards: [],
    playerTurn: 0,
    currentPlayers: 0,
    lobbyFull: false,
    numSetsDeclared: 0,
    setsDeclared: [],
    log: ""
  }

  constructor(private http: HttpClient) { }

  hostGame(numPlayers: number, name: string) {
    const headers = { 'content-type': 'application/json' }
    var request = {
      numPlayers: numPlayers,
      playerNames: name + ";"
    }
    const body = JSON.stringify(request);
    return this.http.post<Game>(this.url + "create", body, { 'headers': headers });
  }

  joinGame(roomId: string, name: string) {
    const headers = { 'content-type': 'application/json' }
    var request = {
      roomId: roomId,
      playerName: name
    }
    const body = JSON.stringify(request);
    return this.http.post<Game>(this.url + "addPlayer", body, { 'headers': headers });
  }

  getGame(roomId: string) {
    return this.http.get<Game>(this.url + "get/" + roomId);
  }

  createGame(roomId: string) {
    const headers = { 'content-type': 'application/json' }
    var request = {
      roomId: roomId,
    }
    const body = JSON.stringify(request);
    return this.http.post<Game>(this.url + "create", body, { 'headers': headers });
  }

  askCard(playRequest: PlayerTurn) {
    const headers = { 'content-type': 'application/json' }
    var request = playRequest;
    const body = JSON.stringify(request);
    return this.http.put<Game>(this.url + "askCard", body, { 'headers': headers });
  }

  declareSet(playRequest: PlayerTurn) {
    const headers = { 'content-type': 'application/json' }
    var request = playRequest;
    const body = JSON.stringify(request);
    return this.http.put<Game>(this.url + "declareCard", body, { 'headers': headers });
  }

}
