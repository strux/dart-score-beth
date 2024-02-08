import { nanoid } from "nanoid";

let players: IPlayer[] = [];
let history: IPlayer[][] = [];
let future: IPlayer[][] = [];

const cricketTargets: TTargets = [
  ["20", 0],
  ["19", 0],
  ["18", 0],
  ["17", 0],
  ["16", 0],
  ["15", 0],
  ["B", 0],
];

function pushHistory(players: IPlayer[]): void {
  history.push(
    players.slice().map((p) => {
      const newP = Object.assign({}, p);
      newP.score = p.score.slice();
      return newP;
    })
  );
}

function undo() {
  if (history.length) {
    future.push(players);
    players = history.pop();
  }
}

function newGame(players: IPlayer[]): void {
  history = [];
  players = players.map((player: IPlayer) => {
    player.score = cricketTargets.slice(); // slice to clone
    return player;
  });
  pushHistory(players);
}

function getTargets(): TTargets[] {
  return cricketTargets;
}

function createPlayer(): IPlayer {
  return {
    id: nanoid(),
    name: `Player ${players.length + 1}`,
    score: cricketTargets.slice(), // slice to clone
  };
}

function addPlayer(): IPlayer[] {
  pushHistory(players);
  players.push(createPlayer());
  return players;
}

function removePlayer(id: string): void {
  pushHistory(players);
  players = players.filter((player) => player.id !== id);
}

function getPlayers(): IPlayer[] {
  return players;
}

function getPlayerById(id: string): IPlayer {
  const player = players.find((p) => p.id === decodeURIComponent(id));
  if (!player) throw new NotFoundError();
  return player;
}

function getPlayerByName(name: string): IPlayer {
  const player = players.find((p) => p.name === decodeURIComponent(name));
  if (!player) throw new NotFoundError();
  return player;
}

function updatePlayerName(id: string, newName: string): IPlayer {
  pushHistory(players);
  const player = getPlayerById(id);
  player.name = newName;
  return player;
}

function updatePlayerScore(id: string, target: string): IPlayer | null {
  pushHistory(players);
  const player = getPlayerById(id);
  player.score = player.score.map(([t, s]) => {
    if (t === target && s < 3) return [t, s + 1];
    return [t, s];
  });
  return player;
}

function getWinner(): string | null {
  let winner = null;
  players.find((player) => {
    const isWinner = player.score.every(([_, score]) => score >= 3);
    if (isWinner) winner = player.name;
  });
  return winner;
}

export {
  pushHistory,
  undo,
  newGame,
  getTargets,
  createPlayer,
  addPlayer,
  removePlayer,
  getPlayers,
  getPlayerById,
  getPlayerByName,
  updatePlayerName,
  updatePlayerScore,
  getWinner,
};
