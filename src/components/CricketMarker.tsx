export default function CricketMarker({ score }) {
  if (score === 0) {
    return (
      <div class="absolute translate-y-[5px] left-[45%] translate-x-[-50%]">
        &nbsp;
      </div>
    );
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
