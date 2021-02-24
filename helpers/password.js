const { 
  getSHA256String,
} = require('./crypto')

function checkCharType(charToCheck) {
    var returnValue = "O";
    var charCode = charToCheck.charCodeAt(0);

    if(charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0)){
			returnValue = "U";
    }else if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
			returnValue = "L";
    }else if (charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0)) {
			returnValue = "N";
    }
    return returnValue;
}

function checkRobustness(palabra){
	var mayusc = 0;
	var minusc = 0;
	var num = 0;
	var spec = 0;
	var score=0;
	var caract=[];
	var nivel="";
	for(var i = 0; i < palabra.length ; i++){
		switch (checkCharType(palabra.charAt(i))){
			case "U":
				mayusc++;
				break;
			case "L":
				minusc++;
				break;
			case "N":
				num++;
				break
			default:
				spec++;
				break;
		}
		if (!caract.includes(palabra.charAt(i))){
			caract.push(palabra.charAt(i));
		}
	}
	score=minusc+mayusc+spec+num+(minusc*mayusc*spec*num)/2+(palabra.length-caract.length)*3+palabra.length/10;
	if(score<=40){
		if(score<=30){
			if(score<=20){
				nivel="Bad";
			}else{
				nivel="Medium";
			}
		}else{
			nivel="Good";
		}
	}else{
		nivel="Very Good";
	}
	return nivel;
}

async function isMasterPasswordValid(storage, password) {
  let isValid = false
  const masterPassword = await storage.getItem('masterPassword');

  if (!masterPassword) {
    throw new Error('No master password found')
  } else if (!password) {
    throw new Error('Missing parameters for validation')
  } else {
    const hashString = getSHA256String(password)
    if (masterPassword === hashString) {
      isValid = true
    }
  }
  return isValid
}

module.exports = {
  checkRobustness,
  isMasterPasswordValid,
}
