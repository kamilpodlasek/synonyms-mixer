/*jslint node: true *///for global "use strict"
/*jslint plusplus: true *///for ++
"use strict";
var mix, checkInput;//functions

mix = function (text) {
    var rowOpen,
        startingPoint,
        rowClose,
        row,
        rowCloseCorrect,
        key,
        partsAmount,
        parts,
        randomPart;
    
	while (text.indexOf("{") !== -1) {//repeat until there are "{" characters
		rowOpen = text.indexOf("{");
		
		startingPoint = rowOpen;//starting point of searching for rowClose
		do {
			rowClose = text.indexOf("}", startingPoint);
			row = text.substring(rowOpen + 1, rowClose);//row without open and close brackets
			rowCloseCorrect = checkInput(row);//if there is even amount of brackets between rowOpen and rowClose
			if (!rowCloseCorrect) { startingPoint = rowClose + 1; }//check rest of string without actual "}"
		} while (!rowCloseCorrect);
		
		parts = row.split('|');
		partsAmount = parts.length;
		
		for (key = 0; key < partsAmount; key++) {
			while (!checkInput(parts[key])) {
				parts[key] += "|" + parts[key + 1];//merging next array element
				parts.splice(key + 1, 1);//deleting array element
				partsAmount--;
			}
		}
		
		randomPart = Math.floor((Math.random() * partsAmount));//random number between 0 and amount of parts - 1

		text = text.replaceBetween(rowOpen, rowClose + 1, parts[randomPart]);
	}
	
	return text;
};

checkInput = function (text) {
	if (typeof (text) === "undefined") { text = ""; }//if not set
			
	var bracketsL = (text.match(/\{/g) || []).length,
        bracketsR = (text.match(/\}/g) || []).length;
    
	return (bracketsL === bracketsR);
};

String.prototype.replaceBetween = function (start, end, text) {
	return this.substring(0, start) + text + this.substring(end);
};