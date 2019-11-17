import { CPU } from "./cpu";

export const ls8 = program => {
  const cpu = new CPU(program);
  cpu.load();
  const answer = cpu.run();
  return answer;
};
