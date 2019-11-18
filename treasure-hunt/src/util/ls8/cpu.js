// const LDI = 0b10000010;
// const HLT = 0b00000001;
// const PRA = 0b01001000;
// const ADD = 0b10100000;
// const XOR = 0b10101011;
// const AND = 0b10101000;
// const PRN = 0b01000111;
// const MUL = 0b10100010;
// const OR  = 0b10101010;

export class CPU {
  constructor(program) {
    this.answer = "";
    this.program = program;
    this.running = true;
    this.ram = Array(256).fill(0);
    this.reg = Array(8).fill(0);
    this.pc = 0;
    this.branchtable = {
      "00000001": this.handle_HLT,
      "10000010": this.handle_LDI,
      "01001000": this.handle_PRA,
      "10100000": this.handle_ADD,
      "10101011": this.handle_XOR,
      "10101000": this.handle_AND,
      "01000111": this.handle_PRN,
      "10100010": this.handle_MUL,
      "10101010": this.handle_OR
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
    this.reg[register] = parseInt(immediate, 2);
    this.pc += 3;
    return;
  };

  handle_PRN = (register_a, register_b) => {
    const value = this.reg[register_a];
    console.log(value);
    this.pc += 2;
  };

  handle_MUL = (register_a, register_b) => {
    this.reg[register_a] *= this.reg[register_b];
    this.pc += 3;
  };

  handle_OR = (register_a, register_b) => {
    this.reg[register_a] = this.reg[register_a] | this.reg[register_b];
    this.pc += 3;
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
    let MDR = this.ram[MAR].toString(2);
    MDR = "00000000".substr(MDR.length) + MDR; // add leading 0s
    // return parseInt(MDR, 2);
    return MDR;
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

      if (IR in this.branchtable) {
        const operand_a = this.ram_read(this.pc + 1);
        const operand_b = this.ram_read(this.pc + 2);
        this.branchtable[IR](operand_a, operand_b);
      } else {
        console.log("Instruction not valid");
        console.log(IR);
        break;
      }
    }
    return this.answer.substring(this.answer.length - 3);
  }
}
