var fs = require("fs");
var c  = console;
var file = process.argv[2];

assemble(file+'.asm', file+'.hack');

function assemble(asmFile, objFile) {
  var asmText = fs.readFileSync(asmFile, "utf8");
                          
  var lines = asmText.split(/\s/);
  var ss=JSON.stringify(lines, null, 2)
  c.log(ss);
  var x = lines.toString();
 
  var n = x.length;
  c.log("n=%d",n);
  var count = 0;
  var r = [];

  while (count < n) {
    if (ss[count] == "D") {
    r.push("find");
    }
    else
    count = count+1;
    c.log(count);
  }
  c.log(r);
}
