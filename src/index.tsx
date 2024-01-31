import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import clsx from "clsx";

const cricketTargets = {
  "20": 0,
  "19": 0,
  "18": 0,
  "17": 0,
  "16": 0,
  "15": 0,
  B: 0,
};

let players = [
  { name: "Brian", score: Object.assign({}, cricketTargets) },
  { name: "Danielle", score: Object.assign({}, cricketTargets) },
];

function Page({ children }: any) {
  return (
    <html>
      <head>
        <title>Dart Score</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kolker+Brush&display=swap"
          rel="stylesheet"
        ></link>
        <link href="./public/output.css" rel="stylesheet" />
        <script src="./public/htmx.min.js"></script>
      </head>
      <body class="bg-slate-800 text-slate-300 font-sans flex flex-col justify-center items-center text-center font-script text-6xl">
        {children}
      </body>
    </html>
  );
}

function Board({ players }) {
  const colCount = players.length * 2 - 1;
  const content = [];
  for (let i = 0; i < colCount; i++) {
    if (i % 2 === 0) {
      const player = players[i / 2];
      content[i] = <Score player={player} />;
    } else {
      content[i] = <Labels targets={cricketTargets} />;
    }
  }
  return (
    <div class="border p-[6px]">
      <div class="border-[4px] p-[6px]">
        <div class="border p-6">
          <Winner />
          <div class="flex">{content}</div>
        </div>
      </div>
    </div>
  );
}

function CricketMarker({ score }) {
  if (score === 0) {
    return <div>&nbsp;</div>;
  }
  const marks = [];
  if (score > 0) {
    marks.push(
      <div class="absolute translate-y-[5px] left-[45%] translate-x-[-50%]">
        /
      </div>
    );
  }
  if (score > 1) {
    marks.push(
      <div class="absolute translate-y-[5px] left-[55%] translate-x-[-50%]">
        \
      </div>
    );
  }
  if (score > 2) {
    marks.push(<div class="absolute left-[52%] translate-x-[-50%]">0</div>);
  }
  return <div class="relative h-full">{marks}</div>;
}

function Score({ player }) {
  return (
    <div class="player-score">
      <div class="border-b-2 w-40 flex items-center justify-center text-center ">
        {player.name}
      </div>
      {Object.keys(player.score).map((target) => (
        <button
          class="block w-full h-[4rem] text-8xl leading-[4rem]"
          hx-put={`./player-score/${player.name}?target=${target}`}
          hx-swap="outerHTML"
          hx-target="closest .player-score"
        >
          <CricketMarker score={player.score[target]} />
        </button>
      ))}
    </div>
  );
}

function Labels({ targets }) {
  return (
    <div class="">
      <div class="border-b-2">vs</div>
      {Object.keys(targets).map((target) => (
        <div class="block leading-[4rem] border-x-2 px-4">{target}</div>
      ))}
    </div>
  );
}

function Winner({ name }) {
  return (
    <h1
      hx-get="./winner"
      hx-trigger="score-updated from:body once"
      hx-swap="outerHTML"
      class="min-h-8"
    >
      {name}
    </h1>
  );
}

function getPlayerByName(name) {
  return players.find((p) => p.name === name);
}

function updatePlayerScore(playerName, target) {
  const player = getPlayerByName(playerName);
  if (player?.score[target] < 3) player.score[target] += 1;
  return player;
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
  .put(
    "/player-score/:playerName",
    ({ set, params: { playerName }, query: { target } }) => {
      set.headers["HX-Trigger"] = "score-updated";
      return <Score player={updatePlayerScore(playerName, target)} />;
    }
  )
  .get("/winner", () => {
    const winner =
      players.find((p) => Object.values(p.score).every((s) => s >= 3))?.name ||
      null;
    return <Winner name={winner} />;
  })
  .listen(3000);

process.on("SIGINT", () => {
  console.log("Ctrl-C was pressed");
  process.exit();
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
