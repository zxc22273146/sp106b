/*var a = "@2D=A@3D=D+A@0M=D";
var b = [];
b.push(a[2]);
b.push(a[3]);
b.push(a[4]);
console.log(b);
c = b.join("");
console.log(c);
d = c.split("=");
console.log(d);*/

var x = [];
x.push('H');
x.push('I');
x = x.join("");
x = parseInt(x);
if(isNaN(x))
console.log("OK!");