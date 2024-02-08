interface SettingsProps {
  open?: boolean;
  players: IPlayer[];
}

export default function Settings({ open = false, players }: SettingsProps) {
  return (
    <div class="settings-wrapper text-xl flex justify-end">
      <button
        class="w-6 h-6"
        hx-get="./settings/edit"
        hx-swap="outerHTML"
        hx-target="closest .settings-wrapper"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
        >
          <g>
            <path
              class="fill-slate-200"
              d="M409.6,25.6V128c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6V25.6c0-14.14-11.46-25.6-25.6-25.6   C421.06,0,409.6,11.46,409.6,25.6z M460.8,486.4v-256c0-14.14-11.46-25.6-25.6-25.6c-14.14,0-25.6,11.46-25.6,25.6v256   c0,14.14,11.46,25.6,25.6,25.6C449.34,512,460.8,500.54,460.8,486.4z M230.4,25.6v307.2c0,14.14,11.46,25.6,25.6,25.6   c14.14,0,25.6-11.46,25.6-25.6V25.6C281.6,11.46,270.14,0,256,0C241.86,0,230.4,11.46,230.4,25.6z M281.6,486.4v-51.2   c0-14.14-11.46-25.6-25.6-25.6c-14.14,0-25.6,11.46-25.6,25.6v51.2c0,14.14,11.46,25.6,25.6,25.6   C270.14,512,281.6,500.54,281.6,486.4z M51.2,25.6v51.2c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6V25.6   C102.4,11.46,90.94,0,76.8,0C62.66,0,51.2,11.46,51.2,25.6z M102.4,486.4V179.2c0-14.14-11.46-25.6-25.6-25.6   c-14.14,0-25.6,11.46-25.6,25.6v307.2c0,14.14,11.46,25.6,25.6,25.6C90.94,512,102.4,500.54,102.4,486.4z"
            />
            <path
              class="fill-slate-200"
              d="M486.4,179.2h-25.6c-0.03,14.13-11.47,25.57-25.6,25.6c-14.13-0.03-25.57-11.47-25.6-25.6   c0.03-14.13,11.47-25.57,25.6-25.6c14.13,0.03,25.57,11.47,25.6,25.6H486.4H512c-0.02-42.43-34.37-76.78-76.8-76.8   c-42.43,0.02-76.78,34.37-76.8,76.8c0.02,42.43,34.37,76.78,76.8,76.8c42.43-0.02,76.78-34.37,76.8-76.8H486.4z"
            />
            <path
              class="fill-slate-200"
              d="M307.2,384h-25.6c-0.03,14.13-11.47,25.57-25.6,25.6c-14.13-0.03-25.57-11.47-25.6-25.6c0.03-14.13,11.47-25.57,25.6-25.6   c14.13,0.03,25.57,11.47,25.6,25.6H307.2h25.6c-0.02-42.43-34.37-76.78-76.8-76.8c-42.43,0.02-76.78,34.37-76.8,76.8   c0.02,42.43,34.37,76.78,76.8,76.8c42.43-0.02,76.78-34.37,76.8-76.8H307.2z"
            />
            <path
              class="fill-slate-200"
              d="M128,128h-25.6c-0.03,14.13-11.47,25.57-25.6,25.6c-14.13-0.03-25.57-11.47-25.6-25.6c0.03-14.13,11.47-25.57,25.6-25.6   c14.13,0.03,25.57,11.47,25.6,25.6H128h25.6c-0.02-42.43-34.37-76.78-76.8-76.8C34.37,51.22,0.02,85.57,0,128   c0.02,42.43,34.37,76.78,76.8,76.8c42.43-0.02,76.78-34.37,76.8-76.8H128z"
            />
          </g>
        </svg>
      </button>
      {open ? (
        <div
          class="fixed w-full h-full bottom-0 left-0 flex flex-col justify-between bg-slate-900/75 border p-8 pt-24 items-center"
          hx-target="closest .settings-wrapper"
        >
          {/* remove form and create separate endpoints for actions
           * "save" should only re-render specific action
           * will need sub-components or props to drive the above
           */}
          <button
            name="newPlayer"
            hx-post="./player"
            class="bg-teal-700 hover:bg-emerald-900 text-slate-200 font-bold py-2 px-4 rounded w-max mb-4"
          >
            Add Player
          </button>
          {players.map((player) => (
            <button
              class="bg-rose-700 hover:bg-rose-900 text-slate-200 font-bold py-2 px-4 rounded w-max mb-2"
              hx-delete={`./player/${player.id}`}
            >
              Remove {player.name}
            </button>
          ))}
          <button
            hx-post="./game"
            class="bg-orange-700 hover:bg-orange-900 text-slate-200 font-bold py-2 px-4 rounded w-max mt-2 mb-4"
          >
            New game
          </button>
          <button
            class="bg-slate-500 hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded w-max"
            hx-get="./settings"
            hx-swap="outerHTML"
            hx-target="closest .settings-wrapper"
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
