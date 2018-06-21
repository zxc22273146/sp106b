var fs = require("fs");
var c  = console;
var file = process.argv[2];

var dtable = {
  ""   :0b000,
  "M"  :0b001,
  "D"  :0b010,
  "MD" :0b011,
  "A"  :0b100,
  "AM" :0b101,
  "AD" :0b110,
  "AMD":0b111
}

var jtable = {
  ""   :0b000,
  "JGT":0b001,
  "JEQ":0b010,
  "JGE":0b011,
  "JLT":0b100,
  "JNE":0b101,
  "JLE":0b110,
  "JMP":0b111
}

var ctable = {
  "0"   :0b0101010,
  "1"   :0b0111111,
  "-1"  :0b0111010,
  "D"   :0b0001100,
  "A"   :0b0110000, 
  "M"   :0b1110000,
  "!D"  :0b0001101,
  "!A"  :0b0110001, 
  "!M"  :0b1110001,
  "-D"  :0b0001111,
  "-A"  :0b0110011,
  "-M"  :0b1110011,
  "D+1" :0b0011111,
  "A+1" :0b0110111,
  "M+1" :0b1110111,
  "D-1" :0b0001110,
  "A-1" :0b0110010,
  "M-1" :0b1110010,
  "D+A" :0b0000010,
  "D+M" :0b1000010,
  "D-A" :0b0010011,
  "D-M" :0b1010011,
  "A-D" :0b0000111,
  "M-D" :0b1000111,
  "D&A" :0b0000000,
  "D&M" :0b1000000,
  "D|A" :0b0010101,
  "D|M" :0b1010101
}

var symTable = {
  "R0"  :0,
  "R1"  :1,
  "R2"  :2,
  "R3"  :3,
  "R4"  :4,
  "R5"  :5,
  "R6"  :6,
  "R7"  :7,
  "R8"  :8,
  "R9"  :9,
  "R10" :10,
  "R11" :11,
  "R12" :12,
  "R13" :13,
  "R14" :14,
  "R15" :15,
  "SP"  :0,
  "LCL" :1,
  "ARG" :2,
  "THIS":3, 
  "THAT":4,
  "KBD" :24576,
  "SCREEN":16384
};

assemble(file+'.asm', file+'.hack');

function assemble(asmFile, objFile) {
  var asmText = fs.readFileSync(asmFile, "utf8");
                          
  var lines = asmText.split(/\r?\n/);
  var sss = JSON.stringify(lines, null, 2);
  c.log(sss);
  //var x = lines.toString();
  var x = lines.join("");
  c.log(x);
  var count = 0;
  var r = [];

  while(count<x.length){
    if(x[count] == "@" && x[count+1] != ","){
      r.push(x[count+1]);
      insA(r);
    }
    else if(x[count] == "A"){
        r.push(x[count]);
      while(x[count+1] != "@" && count<x.length){
        r.push(x[count+1]);
        count++;
      }
      insC(r);
    }
    else if(x[count] == "D" || x[count] == "M"){
      r.push(x[count]);
      r.push(x[count+1]);
      count++;
    while(x[count+1] != "@" && count<x.length){
      r.push(x[count+1]);
      count++;
    }
    insC(r);
  }
    count++;
    //c.log(r);
  }
}

function insA(r){

  while(r.length >= 1){
    var n = r.shift();
    x1 = parseInt(n);
    x1 = x1.toString(2);
    while(x1.length < 16){
      x1 = "0" + x1;
    }
  }
  return c.log(x1);
}

function insC(r){
  c.log("====== "+r+" ======");
  r1 = r.join("");
  r2 = r1.split("=");
  //c.log(r2);
  var x2 = "111" + ctable[r2[1]] + dtable[r2[0]] + "000";
  return c.log(x2);
  r = [];
}
