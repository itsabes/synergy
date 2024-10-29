function sumArray(numArray, limit) {
  var total = 0;
  for (var i = 0; i < numArray.length; i++) {
    if (limit !== null && i >= limit) break;
    var num = numArray[i];
    if (isNaN(num)) total += parseInt(num);
    else total += num;
  }
  return total;
}
