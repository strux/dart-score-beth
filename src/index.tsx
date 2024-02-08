import { Elysia, NotFoundError } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { nanoid } from "nanoid";
import Page from "./components/Page";
import Board from "./components/Board";
import Scorer from "./components/Scorer";
import Winner from "./components/Winner";
import Settings from "./components/Settings";
import PlayerName from "./components/PlayerName";

const cricketTargets: TTargets = new Map([
  ["20", 0],
  ["19", 0],
  ["18", 0],
  ["17", 0],
  ["16", 0],
  ["15", 0],
  ["B", 0],
]);

function newGame(players): void {
  players = players.map((player: IPlayer) => {
    player.score = new Map(cricketTargets);
    return player;
  });
}

function createPlayer(): IPlayer {
  return {
    id: nanoid(),
    name: `Player ${players.length + 1}`,
    score: new Map(cricketTargets),
  };
}

function addPlayer(): IPlayer[] {
  players.push(createPlayer());
  return players;
}

function removePlayer(id: string): void {
  players = players.filter((player) => player.id !== id);
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
  const player = getPlayerById(id);
  player.name = newName;
  return player;
}

function updatePlayerScore(id: string, target: string): IPlayer | null {
  const player = getPlayerById(id);
  const score = player?.score.get(target);
  if (typeof score === "number" && player && score < 3)
    player.score.set(target, score + 1);
  return player;
}

function getWinner(): string | null {
  let winner = null;
  players.find((player) => {
    const scores = Array.from(player.score.values());
    const isWinner = scores.every((score) => score >= 3);
    if (isWinner) winner = player.name;
  });
  return winner;
}

// Initial state
let players: IPlayer[] = [];
addPlayer();
addPlayer();

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => {
    return (
      <Page>
        <Board players={players} targets={cricketTargets} />
      </Page>
    );
  })
  .get("/board", () => {
    return <Board players={players} targets={cricketTargets} />;
  })
  .put("/player-score/:id", ({ set, params: { id }, query: { target } }) => {
    set.headers["HX-Trigger"] = "score-updated";
    if (!target) throw new NotFoundError();
    const player = updatePlayerScore(id, target)!;
    return <Scorer player={player} />;
  })
  .get("/player/:id/edit", ({ params: { id } }) => {
    return <PlayerName edit={true} player={getPlayerById(id)} />;
  })
  .put("/player/:id", ({ params: { id }, body: { newPlayerName } }) => {
    return (
      <PlayerName edit={false} player={updatePlayerName(id, newPlayerName)} />
    );
  })
  .post("/player", ({ set }) => {
    set.headers["HX-Trigger"] = "players-updated";
    addPlayer();
    return <Settings open={true} players={players} />;
  })
  .delete("/player/:id", ({ set, params: { id } }) => {
    set.headers["HX-Trigger"] = "players-updated";
    removePlayer(id);
    return <Settings open={true} players={players} />;
  })
  .get("/winner", () => {
    const winner = getWinner() || "";
    return <Winner name={winner} />;
  })
  .get("/settings", () => {
    return <Settings open={false} players={players} />;
  })
  .get("/settings/edit", () => {
    return <Settings open={true} players={players} />;
  })
  .post("/game", ({ set }) => {
    set.headers["HX-Trigger"] = "players-updated";
    newGame(players);
    return <Settings open={false} players={players} />;
  })
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .listen(3000);

process.on("SIGINT", () => {
  console.log("Ctrl-C was pressed");
  process.exit();
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
