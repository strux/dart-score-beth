import { Elysia, NotFoundError } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import * as state from "./state";
import Page from "./components/Page";
import Board from "./components/Board";
import Scorer from "./components/Scorer";
import Winner from "./components/Winner";
import Settings from "./components/Settings";
import PlayerName from "./components/PlayerName";

// Initial state
state.addPlayer();
state.addPlayer();

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => {
    return (
      <Page>
        <Board players={state.getPlayers()} targets={state.getTargets()} />
      </Page>
    );
  })
  .get("/board", () => {
    return <Board players={state.getPlayers()} targets={state.getTargets()} />;
  })
  .put("/player-score/:id", ({ set, params: { id }, query: { target } }) => {
    set.headers["HX-Trigger"] = "score-updated";
    if (!target) throw new NotFoundError();
    const player = state.updatePlayerScore(id, target)!;
    return <Scorer player={player} />;
  })
  .get("/player/:id/edit", ({ params: { id } }) => {
    return <PlayerName edit={true} player={state.getPlayerById(id)} />;
  })
  .put("/player/:id", ({ params: { id }, body: { newPlayerName } }) => {
    return (
      <PlayerName
        edit={false}
        player={state.updatePlayerName(id, newPlayerName)}
      />
    );
  })
  .post("/player", ({ set }) => {
    set.headers["HX-Trigger"] = "players-updated";
    state.addPlayer();
    return <Settings open={true} players={state.getPlayers()} />;
  })
  .delete("/player/:id", ({ set, params: { id } }) => {
    set.headers["HX-Trigger"] = "players-updated";
    state.removePlayer(id);
    return <Settings open={true} players={state.getPlayers()} />;
  })
  .get("/winner", () => {
    const winner = state.getWinner() || "";
    return <Winner name={winner} />;
  })
  .get("/settings", () => {
    return <Settings open={false} players={state.getPlayers()} />;
  })
  .get("/settings/edit", () => {
    return <Settings open={true} players={state.getPlayers()} />;
  })
  .post("/game", ({ set }) => {
    set.headers["HX-Trigger"] = "players-updated";
    state.newGame(state.getPlayers());
    return <Settings open={false} players={state.getPlayers()} />;
  })
  .get("/undo", () => {
    state.undo();
    return <Board players={state.getPlayers()} targets={state.getTargets()} />;
  })
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .listen(process.env.PORT ?? 3000);
process.on("SIGINT", () => {
  console.log("Ctrl-C was pressed");
  process.exit();
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
