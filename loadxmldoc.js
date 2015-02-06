//Chrome
function loadXMLDoc(filename) {
	var xhttp;

	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", filename, false);
	xhttp.send();
	var xmlDoc = xhttp.responseXML;
	//alert("loadXMLDoc: "+filename);
	if (!xmlDoc) {
		alert("invalid xml file");
	} else {
		return xmlDoc;
	}
}

//firefox
/*
	 In all other browsers (except IEx), createDocument function returns a XMLDocument 
	 object, therefore next call of .load() works ok.
	 
	 In Chrome, createDocument function returns a Document object instead, the .load() 
	 function is not available for this kind of object, therefore the next call of .load() 
	 giving the error (TypeError: Object #<a Document> has no method 'load'.

*/
function loadXMLDocErr(dname) {

	var xmlDoc = document.implementation.createDocument("", "", null);
	xmlDoc.async = false;
	xmlDoc.load(dname); //chrome does not implement XMLdocument.load method
	if (xmlDoc.documentElement.nodeName == "parsererror") {
		errStr = xmlDoc.documentElement.childNodes[0].nodeValue;
		errStr = errStr.replace(/</g, "&lt;");
		document.write(errStr);
	} else {
		//document.write("XML is valid");
		return xmlDoc;
	}
}


//IE&&firefox
function loadXMLDocErr1(dname) {
	try //Internet Explorer
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(dname);

		if (xmlDoc.parseError.errorCode != 0) {
			alert("Error in line " + xmlDoc.parseError.line +
				" position " + xmlDoc.parseError.linePos +
				"\nError Code: " + xmlDoc.parseError.errorCode +
				"\nError Reason: " + xmlDoc.parseError.reason +
				"Error Line: " + xmlDoc.parseError.srcText);
			return (null);
		}
	} catch (e) {
		try //Firefox
		{
			xmlDoc = document.implementation.createDocument("", "", null);
			xmlDoc.async = false;
			xmlDoc.load(dname);
			if (xmlDoc.documentElement.nodeName == "parsererror") {
				alert(xmlDoc.documentElement.childNodes[0].nodeValue);
				return (null);
			}
		} catch (e) {
			alert(e.message)
		}
	}
	try {
		return (xmlDoc);
	} catch (e) {
		alert(e.message)
	}
	return (null);
}

//IE Firefox Chrome
function loadXMLDocErrFinal(filename) {
	var error = "";
	try { //IE
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(filename);

		if (xmlDoc.parseError.errorCode != 0) {
			alert("Error in line " + xmlDoc.parseError.line +
				" position " + xmlDoc.parseError.linePos +
				"\nError Code: " + xmlDoc.parseError.errorCode +
				"\nError Reason: " + xmlDoc.parseError.reason +
				"Error Line: " + xmlDoc.parseError.srcText);
			return (null);
		}
	} catch (e) {
		try { //Firefox
			xmlDoc = document.implementation.createDocument("", "", null);
			xmlDoc.async = false;
			xmlDoc.load(filename);

			if (xmlDoc.documentElement.nodeName == "parsererror") {
				alert(xmlDoc.documentElement.childNodes[0].nodeValue);
				return (null);
			}
			
		} catch (e) {
			try { //Chrome

				var xmlhttp = new window.XMLHttpRequest();
				xmlhttp.open("GET", filename, false);
				xmlhttp.send();

				if (xmlhttp.status == 404) {
					alert("file not found");
					return (null);
				}

				xmlDocc = xmlhttp.responseXML.documentElement;
				//because documentElement is null, so catch by the  catch cause.
				//or execute the next line.
				xmlDoc = xmlhttp.responseXML;



			} catch (e) {
				//error = e.message;
				alert("Error in XML file");
				return (null);
			}
		}
	}
	//check whether the file exsit or not!
	try {
		return (xmlDoc);
	} catch (e) {
		alert(e.message)
	}
	return (null);
}