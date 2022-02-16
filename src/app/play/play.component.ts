import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CardService } from '../Services/card.service';
import { GameService } from '../Services/game.service';
import { ParseService } from '../Services/parse.service';
import { Cookie } from '../Types/Cookie,';
import { Game } from '../Types/Game';

import { PlayerTurn } from '../Types/PlayerTurn';
import { PlayerDetails } from '../Types/PlayerDetails';
import { flatMap, fromEvent, interval, map, mapTo, Observable, startWith, switchMap, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  decksDeclaredPlayersNum: number[] = [];
  thisPlayer: number = 0;
  currentTurn: number = 0;
  logString: string = "Hi! Log here";
  playerAsked: number = 0;
  decksDeclared: number = 0;
  decksDeclaredStrings: string[] = [];
  confirmAsk: boolean = false;
  declareDeckConfirm: string = "";
  askCardConfirm: string = "";
  declareConfirmCheck: boolean = false;
  gameModel !: Observable<any>;
  gameStarted: boolean = false;
  buttonText: string = 'Collapse';
  isExpanded: boolean = true;
  playerDetails: PlayerDetails[] = [
    { playerName: 'Kaladin', numCard: 1 },
    { playerName: 'Danny', numCard: 5 },
  ]
  cardDetails: string[] = ['assets/svg/AS.svg', 'assets/svg/KS.svg',
    'assets/svg/QS.svg', 'assets/svg/JS.svg']

  askEnabled: boolean = false;
  declareEnabled: boolean = false;
  sameDeckCards: string[] = [];
  sameDeckVisible: boolean = false;

  constructor(private cardService: CardService, private gameService: GameService, private parseService: ParseService) {

  }

  onPlay() {
    let cookie = document.cookie;
    var cookieObj: Cookie = this.cardService.readCookie(cookie);
    this.thisPlayer = cookieObj.playerNum;
    interval(500).pipe(mapTo(this.gameService.getGame(cookieObj.roomId))).subscribe(val => {
      val.subscribe(data => {
        var playerNamesString = data.playerNames;
        var playerNames: string[] = this.parseService.nameStringToList(data.playerNames);
        var playerCards: string[] = data.playerCards;
        var playerDetails: PlayerDetails[] = [];
        for (var i = 0; i < playerNames.length; i++) {
          var numCardsTemp = playerCards[i].length / 2;
          if (numCardsTemp == 1 && playerCards[i] === "WE") {
            numCardsTemp = 0;
          }
          var playerDetail: PlayerDetails = {
            playerName: playerNames[i],
            numCard: numCardsTemp
          }
          playerDetails.push(playerDetail);
        }
        this.decksDeclaredPlayersNum = [];
        var playerSetsDeclared = data.setsDeclared;
        for (var i = 0; i < playerSetsDeclared.length; i++) {
          if (playerSetsDeclared[i].length == 1 && playerSetsDeclared[i] == "W") {
            this.decksDeclaredPlayersNum.push(0);
          } else {
            this.decksDeclaredPlayersNum.push(playerSetsDeclared[i].length);
          }
        }
        this.playerDetails = playerDetails;
        var currentPlayerCardsStr = playerCards[cookieObj.playerNum - 1]
        var listCurrentPlayerCards = this.parseService.cardsStringToList(currentPlayerCardsStr);
        for (var i = 0; i < listCurrentPlayerCards.length; i++) {
          listCurrentPlayerCards[i] = this.cardService.addSource(listCurrentPlayerCards[i]);
        }
        var setsDeclared = data.setsDeclared;
        var setsDeclaredStrings: string[] = [];
        this.decksDeclaredStrings = [];
        for (var i = 0; i < setsDeclared.length; i++) {
          for (var j = 0; j < setsDeclared[i].length; j++) {
            if (setsDeclared[i].slice(j, j + 1) != "W") {
              setsDeclaredStrings.push(setsDeclared[i].slice(j, j + 1));
              var setName = this.cardService.getSetName(setsDeclared[i].slice(j, j + 1));
              this.decksDeclaredStrings.push(setName);
            }
          }
        }

        this.currentTurn = data.playerTurn - 1;
        this.logString = data.log;
        this.decksDeclared = data.numSetsDeclared;
        this.cardDetails = listCurrentPlayerCards;
        this.gameStarted = true;
      })

    })

  }

  onExpandCollapse() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) {
      this.buttonText = "Expand";
    } else {
      this.buttonText = "Collapse";
    }
  }

  askDeck(src: string) {
    var card = this.cardService.removeSource(src);
    this.askCardConfirm = this.cardService.getSetName(card);
    this.sameDeckVisible = true;
  }

  askCard(player: number) {
    this.playerAsked = player;
    this.confirmAsk = true;
  }
  confirmAskBtn() {
    var card: string = this.cardService.getAbbSetName(this.askCardConfirm);
    var playerAsked: number = this.playerAsked;
    let cookie = document.cookie;
    var cookieObj = this.cardService.readCookie(cookie);
    var roomId = cookieObj.roomId;
    var playRequest: PlayerTurn = {
      roomId: roomId,
      playerAsked: playerAsked,
      set: card
    }
    this.gameService.askCard(playRequest).subscribe(data => {
      data = data;
    });
  }

  declareDeck(src: string) {
    this.declareConfirmCheck = true;
    var card = this.cardService.removeSource(src);
    this.declareDeckConfirm = this.cardService.getSetName(card);
  }

  declareConfirm() {
    var card: string = this.cardService.getAbbSetName(this.declareDeckConfirm);
    let cookie = document.cookie;
    var cookieObj = this.cardService.readCookie(cookie);
    var playerAsked = this.thisPlayer;
    var roomId = cookieObj.roomId;
    var playRequest: PlayerTurn = {
      roomId: roomId,
      playerAsked: playerAsked,
      set: card
    }
    this.gameService.declareSet(playRequest).subscribe(data => {
      data = data;
    });
  }

  onAsk() {
    this.declareConfirmCheck = false;
    this.declareEnabled = false;
    this.askEnabled = true;
    this.confirmAsk = false;
  }

  onDeclare() {
    this.declareConfirmCheck = false;
    this.sameDeckVisible = false;
    this.askEnabled = false;
    this.confirmAsk = false;
    this.declareEnabled = true;
  }

  ngOnInit(): void {
  }

}
