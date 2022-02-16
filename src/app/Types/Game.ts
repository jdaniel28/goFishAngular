export interface Game {
    roomId: string
    numPlayers: number
    playerNames: string
    playerCards: string[]
    deckCards: any[]
    playerTurn: number
    currentPlayers: number
    lobbyFull: boolean
    numSetsDeclared: number
    setsDeclared: string[]
    log: string
}

