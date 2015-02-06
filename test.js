
/*
This file is for practice JS RegExp 
1. open the test.txt file and read the content from it;
2. practice the RegExp: new an object; object methods(test,exec,compile,toString)
*/
var text;

function getText() {

	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLDOM");
	}
	//open the local file don't need asynchronous.
	xmlhttp.open("GET", "test.txt", false);
	xmlhttp.send();
	document.getElementById("para1").innerHTML = xmlhttp.responseText;
	text = xmlhttp.responseText;

	RegExpTest();
}

function RegExpTest() {
	//var re = new RegExp();
	var re = new RegExp("a", "gim");
	// the second method to create an object of RegExp
	/*test attribute
		
		read multiple lines for the text,including all characters of html tag;
		when we add $, it will test all the text.
	*/
	var re1 = />$/i;
	if (re1.test(text)) {
		document.getElementById("test-attribute").innerHTML = "yes";
	} else {
		document.getElementById("test-attribute").innerHTML = "no";
	}
	//alert(re1.test(text));
	
	//check the last character of text(excluding characters of html tag );
	re = /p$/ig;
	//alert(re.test(text));
	
	re = /^</i;
	//alert(re.test(text));
	
	/*exec attribute
		get all match word
		+: appear at lease once
		\s: white space
		\d: digital
		
		if not find return null
	*/
	var osVersion = "Ubuntu 8";
	re = /^[a-z]+\s+\d+$/i;
	var arr = re.exec(osVersion);
	document.getElementById("exec-attribute").innerHTML = arr[0];
	//get the substring, the length of arr is 2;
	re = /^[a-z]+\s+(\d+)$/i;
	arr = re.exec(osVersion);
	document.getElementById("exec-attribute1").innerHTML = arr[1];
	
	/*
		repalce
	*/
	var str = "some money";
	re = /\s/;
	//alert(str.replace(re,"%"));
	str = "some some    	some";
	re = /\s+/g;//match all whitespace,not only for the first one;
	//alert(str.replace(re,"%"));
	
	/*
		search
		if not find return -1;
	*/
	str = "My age is 18.Golden age!";
	re = /\d+/;
	var pos = str.search(re);
	var trcell = document.createElement("tr");
	var tdcell1 = document.createElement("td");
	var tdcell2 = document.createElement("td");
	var node1 = document.createTextNode("search-method");
	var	node2 = document.createTextNode(pos);
	tdcell1.appendChild(node1);
	tdcell2.appendChild(node2);
	trcell.appendChild(tdcell1);
	trcell.appendChild(tdcell2);
	
	document.getElementById("t1").appendChild(trcell);
	
	/*match*/
	str = "one two three four";
	re = /\b[a-z]*/gi;
	//alert(str.match(re));
	
	str = "abcabc ###";
	re = /(abc){2}/;
	//alert(re.exec(str)[1]);
	
	str = "companylist.xml";
	re = /(\.xml)+$/ig;
	alert(re.test(str));
}