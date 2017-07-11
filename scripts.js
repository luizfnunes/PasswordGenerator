function resetFields(){
    document.getElementById("amount").value = 1;
    document.getElementById("size").value = 4;
    document.getElementById("optNumber").checked = true;
    document.getElementById("optLetters").checked = false;
    document.getElementById("optCapital").checked = false;
    document.getElementById("optChars").checked = false;
    document.getElementById("notUse").value = "";
    document.getElementById("result").innerHTML = "Nenhuma senha gerada!";
}

function createPass(){
    var amount = document.getElementById("amount").value;
    var size = document.getElementById("size").value;
    var asNumbers = document.getElementById("optNumber").checked;
    var asLetters = document.getElementById("optLetters").checked;
    var asCapital = document.getElementById("optCapital").checked;
    var asChar = document.getElementById("optChars").checked;
    var notUseStr = document.getElementById("notUse").value;
    var notUse = notUseStr.split('');
    document.getElementById('result').innerHTML = "";
    if (!asNumbers && !asLetters && !asCapital && !asChar){
        asNumbers = true;
        document.getElementById("optNumber").checked = true;
    }
    if (size > 100){
        document.getElementById('size').value = 100;
        size = 100;
    }
    if (amount > 200){
        document.getElementById('amount').value = 200;
        amount = 200;
    }
    
    for (var i = 0; i < amount; i++){
        var pass = "";
        var passCount = 0;
        var controll = 0; 
        while (passCount < size){
            controll += 1
            var x = Math.floor((Math.random() * 4));
            var y = '';
            if (x === 0){
                if (asNumbers){
                    y = '';
                    y = String(getNumber());
                    if (verifyUse(notUse, y) === false){
                        pass += y;
                        passCount += 1;   
                    }
                }
            }
            if (x === 1){
                if (asLetters){
                    y = '';
                    y = String(getLetter());
                    if (verifyUse(notUse, y) === false){
                        pass += y;
                        passCount += 1;   
                    }
                }
            }
            if (x === 2){
                if (asCapital){
                    y = '';
                    y = String(getCapital());
                    if (verifyUse(notUse, y) === false){
                        pass += y;
                        passCount += 1;   
                    }
                }
            }
            if (x === 3){
                if (asChar){
                    y = '';
                    y = String(getChars());
                    if (verifyUse(notUse, y) === false){
                        pass += y;
                        passCount += 1;   
                    }
                }
            }
            if (controll > 10000){
                document.getElementById('result').innerHTML = "Erro!";
                break;
            }
        }
        html = document.getElementById('result').innerHTML;
        document.getElementById('result').innerHTML = html + pass + "<br/>";
    }
    
   
}

function verifyUse(notUse, y){
    var count = 0;
    notUse.forEach(function(value){
        if (value == y){
            count += 1;
        }
    });
    if (count > 0){
        return true;
    }
    return false;
}

function getNumber(){
    return Math.floor((Math.random() * 10));
}
function getLetter(){
    var x = Math.floor((Math.random() * 26));
    var letters = [
        "a","b","c","d","e","f","g","h","i","j",
        "k","l","m","n","o","p","q","r","s","t",
        "u","v","w","z","y","z"
    ]
    return letters[x];
}
function getCapital(){
    var x = Math.floor((Math.random() * 26));
    var letters = [
        "A","B","C","D","E","F","G","H","I","J",
        "K","L","M","N","O","P","Q","R","S","T",
        "U","V","W","Z","Y","Z"
    ]
    return letters[x];
}
function getChars(){
    var chars = [
        "!","@","#","$","&","*","(",")","-","_",
        "+","=","{","}","[","]","?"
    ]
    var x = Math.floor((Math.random() * chars.length));
    return chars[x];
}