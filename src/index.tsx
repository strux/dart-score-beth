import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

let players = [
  { name: "test1", score: { "20": 0, "19": 0 } },
  { name: "test2", score: { "20": 0, "19": 0 } },
];

function Page({ children }: any) {
  return (
    <html>
      <head>
        <title>Dart Score</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./public/output.css" rel="stylesheet" />
        <script src="./public/htmx.min.js"></script>
      </head>
      <body class="bg-slate-900 text-slate-300 flex-col align-middle">
        {children}
      </body>
    </html>
  );
}

function Board({ players }) {
  return (
    <div class="flex justify-center">
      <Winner />
      {players.map((player) => (
        <div class="flex-col items-center justify-center text-center m-2">
          <div>{player.name}</div>
          {Object.keys(player.score).map((key) => (
            <Score player={player} target={key} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Score({ player, target }) {
  return (
    <form class="score" hx-put="./score" hx-sync="this:queue first">
      <input type="hidden" name="target" value={target} />
      <input type="hidden" name="player" value={player.name} />
      <button type="submit">{player.score[target]}</button>
    </form>
  );
}

function Winner({ name }) {
  return (
    <h1 hx-get="./winner" hx-trigger="score-updated from:body once" hx-sync="">
      {name}
    </h1>
  );
}

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => {
    return (
      <Page>
        <Board players={players} />
      </Page>
    );
  })
  .put("/score", ({ set, body }) => {
    const player = players.find((p) => p.name === body.player);
    const target = body.target;
    if (player?.score[target] < 3) player.score[target] += 1;

    set.headers["HX-Trigger"] = "score-updated";
    return <Score player={player} target={target} />;
  })
  .get("/winner", () => {
    const winner =
      players.find((p) => Object.values(p.score).every((s) => s >= 3))?.name ||
      null;
    return <Winner name={winner} />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
