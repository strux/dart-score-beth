import Scorer from "./Scorer";
import Labels from "./Labels";
import Winner from "./Winner";
import Settings from "./Settings";

interface BoardProps {
  players: IPlayer[];
  targets: TTargets;
}

export default function Board({ players, targets }: BoardProps) {
  const middle = Math.ceil(players.length / 2);
  const content = [];
  for (let i = 0; i < players.length; i++) {
    if (i === middle) {
      content.push(<Labels targets={targets} />);
    }
    content.push(<Scorer player={players[i]} />);
  }

  return (
    <div
      id="main-content-wrapper"
      class="scale-[1vw] border p-[6px]"
      hx-trigger="players-updated from:body once"
      hx-swap="outerHTML"
      hx-get="./board"
    >
      <div class="border-[4px] p-[6px]">
        <div class="border p-4">
          <Winner name="" />
          <div class="flex">{content}</div>
          <div class="flex justify-between items-end mt-4">
            <button
              hx-get="./undo"
              hx-target="#main-content-wrapper"
              hx-swap="outerHTML"
              class="text-4xl mb-[-1rem]"
            >
              &larrhk;
            </button>
            <Settings open={false} players={players} />
          </div>
        </div>
      </div>
    </div>
  );
}
