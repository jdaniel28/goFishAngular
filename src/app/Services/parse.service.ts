import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() { }

  stringToList(str: string) {
    var strList: string[] = [];
    var start = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] === ';') {
        strList.push(str.slice(start, i));
      }
      start += 1;
    }
    return strList;
  }

  cardsStringToList(str: string) {
    var strList: string[] = [];
    for (var i = 0; i < str.length; i += 2) {
      strList.push(str.slice(i, i + 2));
    }
    return strList;
  }

  nameStringToList(str: string) {
    var strList: string[] = [];
    var start = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] == ';') {
        strList.push(str.slice(start, i));
        start = i + 1;
      }
    }
    return strList;
  }



  numberOfCards(str: string[]) {
    var numList: number[] = [];
    for (var i = 0; i < str.length; i++) {
      numList.push(str[i].length / 2);
    }
    return numList;
  }

}
