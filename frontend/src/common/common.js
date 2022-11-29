
const addNum = (num1, num2) => {
  var sq1,sq2,m;
  try {
      sq1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
      sq1 = 0;
  }
  try {
      sq2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
      sq2 = 0;
  }
  m = Math.pow(10,Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
}
const mulNum = (arg1,arg2) => {  
  var m=0,s1=arg1.toString(),
  s2=arg2.toString();  
  try{
  m+=s1.split(".")[1].length}catch(e){}  
  try{
  m+=s2.split(".")[1].length}catch(e){}  
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m
)}
export default{
    addNum,
    mulNum
}
