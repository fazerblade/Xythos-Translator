const X={A:"'a",B:"bh",C:"ch",D:"da",E:"en",F:"f",G:"geh",H:"hst",I:"ihn",J:"j",K:"kah",L:"li",M:"m't",N:"n'te",O:"ou",P:"p",Q:"ql",R:"r",S:"sihn",T:"te",U:"un",V:"vh",W:"wh",X:"xad",Y:"yeh",Z:"z"};

const P={"DA":"d'a","GH":"gehst","KH":"kahst","LI":"lihn","MN":"m'nte","NM":"n'mt","OU":"oun","VH":"vhst","TE":"ten","WH":"whst","YH":"yehst","XD":"xda","SN":"sihn'te","QL":"qli","CT":"chst","IN":"ihn'te","IT":"ihnte","NT":"n'tte"};

const R=Object.fromEntries(Object.entries(X).map(([k,v])=>[v,k]));

const P2=Object.fromEntries(Object.entries(P).map(([k,v])=>[v,k]));

const D2=Object.fromEntries(Object.entries(X).map(([k,v])=>[k.toLowerCase()+v,k.toLowerCase()+k.toLowerCase()]));

const sortLong=o=>Object.keys(o).sort((a,b)=>b.length-a.length);

function enc(s){
 return s.split(/(\s+)/).map(w=>{
  if(!w.trim())return w;
  let o="",i=0;
  while(i<w.length){
   let c=w[i].toUpperCase(),n=(w[i+1]||"").toUpperCase(),p=c+n;
   if(c===n&&X[c]){
    o+=c.toLowerCase()+X[c];
    i+=2;
   }else if(P[p]){
    o+=P[p];
    i+=2;
   }else if(c==="A"&&i===0){
    o+="a'";
    i++;
   }else{
    o+=X[c]||w[i];
    i++;
   }
  }
  return o;
 }).join("");
}

function dec(s){
 const combos=sortLong(P2),letters=sortLong(R),doubles=sortLong(D2);
 let o="",i=0,start=true;
 while(i<s.length){
  if(/\s/.test(s[i])){o+=s[i++];start=true;continue}
  let part=s.slice(i).toLowerCase(),m;
  if(start&&part.startsWith("a'")){o+="a";i+=2;start=false;continue}
  if(!start&&part.startsWith("'a")){o+="a";i+=2;start=false;continue}
  m=combos.find(k=>part.startsWith(k));
  if(m){o+=P2[m].toLowerCase();i+=m.length;start=false;continue}
  m=doubles.find(k=>part.startsWith(k));
  if(m){o+=D2[m];i+=m.length;start=false;continue}
  m=letters.find(k=>part.startsWith(k.toLowerCase()));
  if(m){o+=R[m].toLowerCase();i+=m.length;start=false}
  else{o+=s[i++];start=false}
 }
 return o;
}

function b(){
 const p=document.getElementById("b");
 p.querySelector("textarea[readonly]").value=enc(p.querySelector(".engl").value);
}

function a(){
 const p=document.getElementById("a");
 p.querySelector("textarea[readonly]").value=dec(p.querySelector(".xyth").value);
}

function clr(){
 const p=document.getElementById("a").hidden?document.getElementById("b"):document.getElementById("a");
 p.querySelector("textarea:not([readonly])").value="";
 p.querySelector("textarea[readonly]").value="";
}

function cpy(){
 const p=document.getElementById("a").hidden?document.getElementById("b"):document.getElementById("a");
 const t=p.querySelector("textarea[readonly]");
 if(navigator.clipboard&&navigator.clipboard.writeText){
  navigator.clipboard.writeText(t.value).catch(()=>{t.select();document.execCommand("copy")});
 }else{
  t.select();
  document.execCommand("copy");
 }
}