let test = 'anulalalunapaisajemontanaguaamoraromacomidaluzazulsillagatobotellacamarayosoypalindromocasaverdebanderaventanacangrejolarutanosaportootropasonaturaliniciaracaestoseralodoodolaresdonasbarcosmarcieloaviontierrapaisbicicletaestonoespalindromojugarseverlasalrevesusandounradarenelojorejero'

let aux = '';

let list = []

let ind = 0;
let ind2 = 0;

while(ind < test.length){
    ind2 = ind
    while(ind2 < test.length){
        if(aux.length > 3){
            if(palindromo(aux)){
                list.push(aux)
                aux = '';
                ind = ind2;
                break;
            }
        }
        aux = aux + test[ind2]
        ind2++;
    }
    aux = '';
    ind++;
}

function palindromo(str){
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
}

console.log(list);