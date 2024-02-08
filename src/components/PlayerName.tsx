interface PlayerNameProps {
  player: IPlayer;
  edit?: boolean;
}

export default function PlayerName({ player, edit = false }: PlayerNameProps) {
  return (
    <div
      class="player-name border-b-2 w-40 h-16 flex items-center justify-center font-brush text-center"
      hx-on-htmx-after-settle="htmx.find('input')?.select()"
    >
      {edit ? (
        <input
          class="w-40 text-slate-800"
          type="text"
          name="newPlayerName"
          value={player.name}
          hx-swap="outerHTML"
          hx-trigger="blur, keyup[keyCode==13]"
          hx-target="closest .player-name"
          hx-put={`./player/${player.id}`}
        />
      ) : (
        <div
          hx-swap="outerHTML"
          hx-trigger="click"
          hx-target="closest .player-name"
          hx-get={`./player/${player.id}/edit`}
        >
          {player.name}
        </div>
      )}
    </div>
  );
}
