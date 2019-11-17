const LDI = 0b10000010;
const HLT = 0b00000001;
const PRA = 0b01001000;
const ADD = 0b10100000;
const XOR = 0b10101011;
const AND = 0b10101000;

export class CPU {
  constructor(program) {
    this.answer = "";
    this.program = program;
    this.running = true;
    this.ram = Array(256).fill(0);
    this.reg = Array(8).fill(0);
    this.pc = 0;
    this.branchtable = {
      HLT: this.handle_HLT,
      LDI: this.handle_LDI,
      PRA: this.handle_PRA,
      ADD: this.handle_ADD,
      XOR: this.handle_XOR,
      AND: this.handle_AND
    };
  }
  handle_PRA = (register_a, register_b) => {
    const value = this.reg[register_a];
    console.log(String.fromCharCode(value));
    this.answer += String.fromCharCode(value);
    this.pc += 2;
  };

  handle_HLT = (registera, registerb) => {
    this.running = false;
  };

  handle_LDI = (register, immediate) => {
    this.reg[register] = immediate;
    this.pc += 3;
    return;
  };

  handle_ADD = (register_a, register_b) => {
    this.reg[register_a] += this.reg[register_b];
    this.pc += 3;
  };

  handle_XOR = (register_a, register_b) => {
    this.reg[register_a] = this.reg[register_a] ^ this.reg[register_b];
    this.pc += 3;
  };

  handle_AND = (register_a, register_b) => {
    this.reg[register_a] = this.reg[register_a] & this.reg[register_b];
    this.pc += 3;
  };

  ram_read = MAR => {
    const MDR = this.ram[MAR].toString(2);
    return parseInt(MDR, 2);
  };

  ram_write = (MDR, MAR) => {
    this.ram[MAR] = MDR;
  };

  load() {
    let address = 0;
    for (let i = 0; i < this.program.length; i++) {
      this.ram_write(parseInt(this.program[i], 2), address);
      address += 1;
    }
  }
  run() {
    // """Run the CPU."""
    while (this.running) {
      let IR = this.ram_read(this.pc);
      if (IR === LDI) IR = "LDI";
      else if (IR === HLT) IR = "HLT";
      else if (IR === PRA) IR = "PRA";
      else if (IR === ADD) IR = "ADD";
      else if (IR === AND) IR = "AND";
      else if (IR === XOR) IR = "XOR";

      if (IR in this.branchtable) {
        const operand_a = this.ram_read(this.pc + 1);
        const operand_b = this.ram_read(this.pc + 2);
        this.branchtable[IR](operand_a, operand_b);
      } else {
        console.log("Instruction not valid");
        console.log(parseInt(IR, 2));
        break;
      }
    }
    return this.answer.substring(this.answer.length - 3);
  }
}
