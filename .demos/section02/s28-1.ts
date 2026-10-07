console.log(+"20.5", +"555.25abc", +"abc");                                    // 20.5 NaN NaN
console.log(parseInt("20.5"), parseInt("555.25abc"), parseInt("abc"));         // 20 555 NaN
console.log(parseFloat("20.5"), parseFloat("555.25abc"), parseFloat("abc"));   // 20.5 555.25 NaN
console.log(Number("20.5"), Number("555.25abc"), Number("abc"));               // 20.5 NaN NaN
console.log(Number(true), Number(false));                                      // 1 0
