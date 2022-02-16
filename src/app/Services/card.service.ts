import { Injectable } from '@angular/core';
import { Cookie } from '../Types/Cookie,';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  decks = [
    ['2C', '2S', '2D', '2H'],
    ['3C', '3S', '3D', '3H'],
    ['4C', '4S', '4D', '4H'],
    ['5C', '5S', '5D', '5H'],
    ['6C', '6S', '6D', '6H'],
    ['7C', '7S', '7D', '7H'],
    ['8C', '8S', '8D', '8H'],
    ['9C', '9S', '9D', '9H'],
    ['TC', 'TS', 'TD', 'TH'],
    ['JC', 'JS', 'JD', 'JH'],
    ['QC', 'QS', 'QD', 'QH'],
    ['KC', 'KS', 'KD', 'KH'],
    ['AC', 'AS', 'AD', 'AH'],
  ]

  addSource(card: string) {
    return "assets/svg/" + card + ".svg";
  }

  removeSource(card: string) {
    return card.slice(11, 13);
  }

  getSameSetCards(card: string) {
    var cardString: string = card.slice(0, 1);
    var cards: string[] = [cardString + 'C', cardString + 'S', cardString + 'D', cardString + 'H'];
    return cards;
  }

  getSetName(card: string) {
    var setName = "Set of ";
    if (card.charAt(0) == '2') {
      setName += "Twos";
    } else if (card.charAt(0) == '3') {
      setName += "Threes";
    } else if (card.charAt(0) == '4') {
      setName += "Fours";
    } else if (card.charAt(0) == '5') {
      setName += "Fives";
    } else if (card.charAt(0) == '6') {
      setName += "Sixes";
    } else if (card.charAt(0) == '7') {
      setName += "Sevens";
    } else if (card.charAt(0) == '8') {
      setName += "Eights";
    } else if (card.charAt(0) == '9') {
      setName += "Nines";
    } else if (card.charAt(0) == 'T') {
      setName += "Tens";
    } else if (card.charAt(0) == 'J') {
      setName += "Jacks";
    } else if (card.charAt(0) == 'Q') {
      setName += "Queens";
    } else if (card.charAt(0) == 'K') {
      setName += "Kings";
    } else if (card.charAt(0) == 'A') {
      setName += "Aces";
    }
    return setName;
  }

  getAbbSetName(card: string) {
    var abbCard = "";
    if (card.includes("Two")) {
      abbCard = "2";
    } else if (card.includes("Three")) {
      abbCard = "3"
    } else if (card.includes("Four")) {
      abbCard = "4"
    } else if (card.includes("Five")) {
      abbCard = "5"
    } else if (card.includes("Six")) {
      abbCard = "6"
    } else if (card.includes("Seven")) {
      abbCard = "7"
    } else if (card.includes("Eight")) {
      abbCard = "8"
    } else if (card.includes("Nine")) {
      abbCard = "9"
    } else if (card.includes("Ten")) {
      abbCard = "T"
    } else if (card.includes("Jack")) {
      abbCard = "J"
    } else if (card.includes("Queen")) {
      abbCard = "Q"
    } else if (card.includes("King")) {
      abbCard = "K"
    } else if (card.includes("Ace")) {
      abbCard = "A"
    }
    return abbCard;
  }

  readCookie(cookie: string) {
    var roomId = cookie.slice(12, 22);
    var playerId = parseInt(cookie.slice(22, 24));
    var cookieObj: Cookie = {
      roomId: roomId,
      playerNum: playerId
    }
    return cookieObj;
  }

  getCardName(card: string) {
    var firstLetter = card[0];
    var cardName: string = '';
    if (firstLetter == '2') {
      cardName += 'Two';
    } else if (firstLetter == '3') {
      cardName += 'Three';
    } else if (firstLetter == '4') {
      cardName += 'Four';
    } else if (firstLetter == '5') {
      cardName += 'Five';
    } else if (firstLetter == '6') {
      cardName += 'Six';
    } else if (firstLetter == '7') {
      cardName += 'Seven';
    } else if (firstLetter == '8') {
      cardName += 'Eight';
    } else if (firstLetter == '9') {
      cardName += 'Nine';
    } else if (firstLetter == 'T') {
      cardName += 'Ten';
    } else if (firstLetter == 'Q') {
      cardName += 'Queen';
    } else if (firstLetter == 'K') {
      cardName += 'King';
    } else if (firstLetter == 'J') {
      cardName += 'Jack';
    } else if (firstLetter == 'A') {
      cardName += 'Ace';
    }

    cardName += " of ";

    var secondLetter = card[1];
    if (secondLetter == 'H') {
      cardName += "Hearts"
    } else if (secondLetter == 'D') {
      cardName += "Diamonds"
    } else if (secondLetter == 'C') {
      cardName += 'Clubs'
    } else if (secondLetter == 'S') {
      cardName += 'Spades'
    }
    return cardName;
  }

}
