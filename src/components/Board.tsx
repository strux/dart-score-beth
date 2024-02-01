import Scorer from "./Scorer";
import Labels from "./Labels";
import Winner from "./Winner";

export default function Board({ players, targets }) {
  const colCount = players.length * 2 - 1;
  const content = [];
  for (let i = 0; i < colCount; i++) {
    if (i % 2 === 0) {
      const player = players[i / 2];
      content[i] = <Scorer player={player} />;
    } else {
      content[i] = <Labels targets={targets} />;
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
