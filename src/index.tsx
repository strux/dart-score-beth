import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

const cricketTargets = new Map([
  ["20", 0],
  ["19", 0],
  ["18", 0],
  ["17", 0],
  ["16", 0],
  ["15", 0],
  ["B", 0],
]);

let players = [
  { name: "Brian", score: new Map(cricketTargets) },
  { name: "Danielle", score: new Map(cricketTargets) },
];

function Page({ children }: any) {
  return (
    <html>
      <head>
        <title>Dart Score</title>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=144, initial-scale=0.5, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kolker+Brush&family=Rozha+One&display=swap"
          rel="stylesheet"
        ></link>
        <link href="./public/output.css" rel="stylesheet" />
        <script src="./public/htmx.min.js"></script>
        <script src="./public/resize.js"></script>
      </head>
      <body class="bg-slate-800 text-slate-300 font-rozha flex flex-col justify-center items-center text-center text-6xl w-fit overflow-hidden">
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
    <div id="main-content-wrapper" class="scale-[1vw] border p-[6px]">
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
  return <div class="relative h-full overflow-hidden font-brush">{marks}</div>;
}

function Score({ player }) {
  return (
    <div class="player-score">
      <div class="border-b-2 w-40 h-16 flex items-center justify-center font-brush text-center">
        {player.name}
      </div>
      {Array.from(player.score).map(([target, score]) => (
        <button
          class="odd:bg-slate-700 block w-full h-16 text-8xl leading-[4rem]"
          hx-put={`./player-score/${player.name}?target=${target}`}
          hx-swap="outerHTML"
          hx-target="closest .player-score"
        >
          <CricketMarker score={score} />
        </button>
      ))}
    </div>
  );
}

function Labels({ targets }) {
  return (
    <div class="">
      <div class="border-b-2 flex items-center justify-center font-rozha text-4xl text-center h-16">
        vs
      </div>
      {Array.from(targets.keys()).map((target) => (
        <div class="block font-rozha text-4xl leading-[4rem] border-x-2 px-4">
          {target}
        </div>
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

function Settings() {
  return (
    <div class="absolute top-0 right-0 w-12 h-12 mt-14 mr-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style="enable-background:new 0 0 512 512;"
        xml:space="preserve"
      >
        <g>
          <path
            class="fill-slate-200"
            d="M409.6,25.6V128c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6V25.6c0-14.14-11.46-25.6-25.6-25.6   C421.06,0,409.6,11.46,409.6,25.6z M460.8,486.4v-256c0-14.14-11.46-25.6-25.6-25.6c-14.14,0-25.6,11.46-25.6,25.6v256   c0,14.14,11.46,25.6,25.6,25.6C449.34,512,460.8,500.54,460.8,486.4z M230.4,25.6v307.2c0,14.14,11.46,25.6,25.6,25.6   c14.14,0,25.6-11.46,25.6-25.6V25.6C281.6,11.46,270.14,0,256,0C241.86,0,230.4,11.46,230.4,25.6z M281.6,486.4v-51.2   c0-14.14-11.46-25.6-25.6-25.6c-14.14,0-25.6,11.46-25.6,25.6v51.2c0,14.14,11.46,25.6,25.6,25.6   C270.14,512,281.6,500.54,281.6,486.4z M51.2,25.6v51.2c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6V25.6   C102.4,11.46,90.94,0,76.8,0C62.66,0,51.2,11.46,51.2,25.6z M102.4,486.4V179.2c0-14.14-11.46-25.6-25.6-25.6   c-14.14,0-25.6,11.46-25.6,25.6v307.2c0,14.14,11.46,25.6,25.6,25.6C90.94,512,102.4,500.54,102.4,486.4z"
          />
          <path
            class="fill-slate-200"
            d="M486.4,179.2h-25.6c-0.03,14.13-11.47,25.57-25.6,25.6c-14.13-0.03-25.57-11.47-25.6-25.6   c0.03-14.13,11.47-25.57,25.6-25.6c14.13,0.03,25.57,11.47,25.6,25.6H486.4H512c-0.02-42.43-34.37-76.78-76.8-76.8   c-42.43,0.02-76.78,34.37-76.8,76.8c0.02,42.43,34.37,76.78,76.8,76.8c42.43-0.02,76.78-34.37,76.8-76.8H486.4z"
          />
          <path
            class="fill-slate-200"
            d="M307.2,384h-25.6c-0.03,14.13-11.47,25.57-25.6,25.6c-14.13-0.03-25.57-11.47-25.6-25.6c0.03-14.13,11.47-25.57,25.6-25.6   c14.13,0.03,25.57,11.47,25.6,25.6H307.2h25.6c-0.02-42.43-34.37-76.78-76.8-76.8c-42.43,0.02-76.78,34.37-76.8,76.8   c0.02,42.43,34.37,76.78,76.8,76.8c42.43-0.02,76.78-34.37,76.8-76.8H307.2z"
          />
          <path
            class="fill-slate-200"
            d="M128,128h-25.6c-0.03,14.13-11.47,25.57-25.6,25.6c-14.13-0.03-25.57-11.47-25.6-25.6c0.03-14.13,11.47-25.57,25.6-25.6   c14.13,0.03,25.57,11.47,25.6,25.6H128h25.6c-0.02-42.43-34.37-76.78-76.8-76.8C34.37,51.22,0.02,85.57,0,128   c0.02,42.43,34.37,76.78,76.8,76.8c42.43-0.02,76.78-34.37,76.8-76.8H128z"
          />
        </g>
      </svg>
    </div>
  );
}

function getPlayerByName(name) {
  return players.find((p) => p.name === name);
}

function updatePlayerScore(playerName, target) {
  const player = getPlayerByName(playerName);
  const score = player?.score.get(target);
  if (score < 3) player.score.set(target, score + 1);
  return player;
}

function getWinner() {
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
        <Board players={players} />
        <Settings />
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
    const winner = getWinner();
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
