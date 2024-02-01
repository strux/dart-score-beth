export default function Winner({ name }) {
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
