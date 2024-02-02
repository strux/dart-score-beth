import CricketMarker from "./CricketMarker";
import PlayerName from "./PlayerName";

interface ScorerProps {
  player: IPlayer;
}

export default function Scorer({ player }: ScorerProps) {
  return (
    <div class="player-score">
      <PlayerName player={player} />
      {Array.from(player.score).map(([target, score]) => (
        <button
          class="odd:bg-slate-700 block w-full h-16 text-8xl leading-[4rem]"
          hx-put={`./player-score/${player.id}?target=${target}`}
          hx-swap="outerHTML"
          hx-target="closest .player-score"
        >
          <CricketMarker score={score} />
        </button>
      ))}
    </div>
  );
}
