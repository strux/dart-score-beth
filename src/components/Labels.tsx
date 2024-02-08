interface LabelsProps {
  targets: TTargets;
}

export default function Labels({ targets }: LabelsProps) {
  return (
    <div class="">
      <div class="border-b-2 flex items-center justify-center font-rozha text-4xl text-center h-16">
        vs
      </div>
      {Array.from(targets.keys()).map((target) => (
        <div class="block font-rozha text-4xl leading-[4rem] border-r-2 px-4">
          {target}
        </div>
      ))}
    </div>
  );
}
