import { Elysia, NotFoundError } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
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

let players: IPlayer[] = [
  { id: "1", name: "Player 1", score: new Map(cricketTargets) },
  { id: "2", name: "Player 2", score: new Map(cricketTargets) },
];

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
  if (player) {
    player.name = newName;
    return player;
  }
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

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => {
    return (
      <Page>
        <Board players={players} targets={cricketTargets} />
        <Settings />
      </Page>
    );
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
  .put("/player/:id", ({ set, params: { id }, body: { newPlayerName } }) => {
    return (
      <PlayerName edit={false} player={updatePlayerName(id, newPlayerName)} />
    );
  })
  .get("/winner", () => {
    const winner = getWinner() || "";
    return <Winner name={winner} />;
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
