interface WinnerProps {
  name: string;
}

export default function Winner({ name }: WinnerProps): JSX.Element {
  return (
    <h1
      hx-get="./winner"
      hx-trigger="score-updated from:body once"
      hx-swap="outerHTML"
      class="min-h-0"
    >
      {name}
    </h1>
  );
}
