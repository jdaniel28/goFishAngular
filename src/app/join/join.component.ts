import { Component, OnInit } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  formModel = {
    roomId: "",
    name: ""
  }

  roomIdVal: string = "";

  constructor(private gameService: GameService) { }

  onSubmit() {
    this.gameService.joinGame(this.formModel.roomId, this.formModel.name).subscribe(data => {
      this.roomIdVal = data.roomId;
      var currentPlayers = data.currentPlayers;
      document.cookie = "goFishDanny = " + this.roomIdVal + currentPlayers;
      alert("Joined Game!")
    }, error => {
      alert("All players have already joined")
    })
  }

  ngOnInit(): void {
  }

}
