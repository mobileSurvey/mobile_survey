let a = {x:[{"nama":"puka","alamat":"srondol"},{"nama":"bathara","alamat":"semarang"},{"nama":"cantoka","alamat":"bumi"}]}
// let x = [{"nama":"puka"},{"nama":"bathara"},{"nama":"cantoka"}]
let b = a.x.map(function(e){
    return e
})

Object.keys(b).forEach(function (key) {
    if(key.match("nama")) delete obj[key];
   });

console.log(b)

function removeKeyStartsWith(obj, letter) {
    Object.keys(obj).forEach(function (key) {
       if(key[0]==letter) delete obj[key];
    });
  }
  
  var map = new Object(); 
  map['XKey1'] = "Value1";
  map['XKey2'] = "Value2";
  map['YKey3'] = "Value3";
  map['YKey4'] = "Value4";
  console.log(map);
  removeKeyStartsWith(map, 'X');
  console.log(map);