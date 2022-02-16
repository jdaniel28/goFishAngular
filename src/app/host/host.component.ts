import { Component, OnInit } from '@angular/core';
import { GameService } from '../Services/game.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  constructor(private gameService: GameService) { }
  formModel = {
    name: "",
    numPlayer: 0
  }
  roomIdVal: string = "";
  roomCreated: boolean = false;

  ngOnInit(): void {
  }

  copyButton() {
    navigator.clipboard.writeText(this.roomIdVal).then(() => {
      alert("successfully copied");
    })
      .catch(() => {
        alert("something went wrong");
      });
  }


  onSubmit() {
    this.gameService.hostGame(this.formModel.numPlayer, this.formModel.name).subscribe(data => {
      this.roomIdVal = data.roomId;
      document.cookie = "goFishDanny = " + this.roomIdVal + data.currentPlayers;
      this.roomCreated = true;
    })
  }



}
