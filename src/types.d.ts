type TTargets = Array<Array<string, number>>;

interface IPlayer {
  id: string;
  name: string;
  score: TTargets; 
}