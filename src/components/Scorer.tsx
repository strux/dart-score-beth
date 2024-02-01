import CricketMarker from "./CricketMarker";

export default function Scorer({ player }) {
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
