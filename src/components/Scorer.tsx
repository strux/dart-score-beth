import CricketMarker from "./CricketMarker";
import PlayerName from "./PlayerName";

interface ScorerProps {
  player: IPlayer;
}

export default function Scorer({ player }: ScorerProps) {
  return (
    <div class="player-score [&>*]:last:border-r-0">
      <PlayerName player={player} />
      {player.score.map(([target, score]) => (
        <button
          class="odd:bg-slate-700 border-r-2 block w-full h-16 text-8xl leading-[4rem]"
          hx-put={`./player-score/${player.id}?target=${target}`}
          hx-swap="outerHTML"
          hx-target="closest .player-score"
          hx-trigger="mousedown"
        >
          <CricketMarker score={score} />
        </button>
      ))}
    </div>
  );
}
