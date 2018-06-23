// 作者為馮志揚 2018/06/23
var fs = require("fs"); // 讀檔
var c  = console;
var file = process.argv[2];

var dtable = { // 表格內容改成字串，因為好處理
  ""   :'000',
  "M"  :'001',
  "D"  :'010',
  "MD" :'011',
  "A"  :'100',
  "AM" :'101',
  "AD" :'110',
  "AMD":'111'
}

var jtable = {
  ""   :'000',
  "JGT":'001',
  "JEQ":'010',
  "JGE":'011',
  "JLT":'100',
  "JNE":'101',
  "JLE":'110',
  "JMP":'111'
}

var ctable = {
  "0"   :'0101010',
  "1"   :'0111111',
  "-1"  :'0111010',
  "D"   :'0001100',
  "A"   :'0110000', 
  "M"   :'1110000',
  "!D"  :'0001101',
  "!A"  :'0110001', 
  "!M"  :'1110001',
  "-D"  :'0001111',
  "-A"  :'0110011',
  "-M"  :'1110011',
  "D+1" :'0011111',
  "A+1" :'0110111',
  "M+1" :'1110111',
  "D-1" :'0001110',
  "A-1" :'0110010',
  "M-1" :'1110010',
  "D+A" :'0000010',
  "D+M" :'1000010',
  "D-A" :'0010011',
  "D-M" :'1010011',
  "A-D" :'0000111',
  "M-D" :'1000111',
  "D&A" :'0000000',
  "D&M" :'1000000',
  "D|A" :'0010101',
  "D|M" :'1010101'
}

var symTable = {
  "R0"  :'0',
  "R1"  :'1',
  "R2"  :'2',
  "R3"  :'3',
  "R4"  :'4',
  "R5"  :'5',
  "R6"  :'6',
  "R7"  :'7',
  "R8"  :'8',
  "R9"  :'9',
  "R10" :'10',
  "R11" :'11',
  "R12" :'12',
  "R13" :'13',
  "R14" :'14',
  "R15" :'15',
  "SP"  :'0',
  "LCL" :'1',
  "ARG" :'2',
  "THIS":'3', 
  "THAT":'4',
  "KBD" :'24576',
  "SCREEN":'16384'
};

var newsym = 16; // 新的符號從位置16開始
var sym = 0; // 記住新增幾個符號

assemble(file+'.asm',file+'.hack'); // 開檔案

function assemble(asmFile,objFile){ // 主程式
  var asmText = fs.readFileSync(asmFile,"utf8");
  var lines = asmText.split(/\r?\n/);

  /*var sss = JSON.stringify(lines, null, 2);
  c.log(sss);*/ //印出檔案全部內容

  var x = lines.join(" "); // 將陣列變成用空白符號分隔的字串，如"[a,b,c]"->"a b c"
  var count = 0;

  while(count<x.length){
    var r = [];

    if(x[count] == "@"){
      r.push(x[count]);
      while(x[count+1] != " "){
        r.push(x[count+1]);
        count++;
      }
      insA(r);
    }
    else if(x[count] == "A" || x[count] == "D" || x[count] == "M"){
      if(x[count+1] == "=" || x[count+2] == "=" || x[count+1] == ";"){
        r.push(x[count]);                              // D=A或MD=M-1或D;JGT
        r.push(x[count+1]);
        count++;
        while(x[count+1] != " " && count<x.length){
          r.push(x[count+1]);
          count++;
        }
        insC(r);
      }
    }
    else if(x[count] == "0"){ // 0;JMP
      if(x[count+1] == "=" || x[count+1] == ";"){
        r.push(x[count]);
        r.push(x[count+1]);
        count++;
        while(x[count+1] != " " && count<x.length){
          r.push(x[count+1]);
          count++;
        }
        insC(r);
      }
    }
    else if(x[count] == "("){ // 消除括號內容
      while(x[count+1] != ")"){
        r.push(x[count+1]);
        count++;
      }
      r.length = 0;
    }
    else if(x[count] == "/"){ // 將註解消除
      if(x[count+3] != " ")
        count = count+3;
        r.push(x[count])
        while(x[count+1] != " "){
          r.push(x[count+1]);
          count++;
        }
        r.length = 0;
    }
    count++;
  }
  c.log(" ");
  c.log("------符號表新增了 "+sym+" 個符號------")
}

function insA(r){ // A指令
  c.log(r.join(""))
    var n = r.shift(); // 移除陣列中的"@"符號
    x1 = r.join(""); // 陣列轉字串
    x1 = parseInt(x1); // 字串轉數字

    if(isNaN(x1)){ // 利用isNaN()判斷"@"後面接的是否是數字
      x1 = r.join("");
      if(symTable[x1] === undefined){ // 查symTable
        symTable[x1] = newsym; // 在字典新增
        newsym++;
        sym++;
      }
      var v = symTable[x1];
      v = parseInt(v); // 字串轉數字
      v = v.toString(2); // 數字轉二進位字串
      while(v.length < 16){ // 補零用迴圈
        v = "0" + v;
      }
      return c.log(v);
    }

    else // 當"@"後面是數字時執行這段
    x1 = x1.toString(2); // 數字轉二進位字串
    while(x1.length < 16){ // 補零用迴圈
      x1 = "0" + x1;
    }
    return c.log(x1);
}

function insC(r){ // C指令
  c.log(r.join(""));
  if(r[1] == "=" || r[2] == "="){
    r1 = r.join("");
    r2 = r1.split("="); // 用"="分隔字串內容並放入陣列
    var x2 = "111" + ctable[r2[1]] + dtable[r2[0]] + "000";
    return c.log(x2); // 指令形式為"111 ccccccc ddd jjj"
  }
  else if(r[1] == ";"){ // 跳躍指令
    r1 = r.join("");
    r2 = r1.split(";"); // 用";"分隔字串內容並放入陣列
    var x2 = "111" + ctable[r2[0]] + "000" + jtable[r2[1]];
    return c.log(x2);
  }
}