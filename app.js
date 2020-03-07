const got = require('got');
const fs = require('fs');

// print process.argv
//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//});

// get value of patient from first argument pass in CLI, e.g. 686033207
var patient = process.argv.slice(2);
console.log('Patient: ' + patient);

(async () => {
    try {
        const response = await got('https://data.developer.nhs.uk/nrls-ri/DocumentReference?subject=https%3A%2F%2Fdemographics.spineservices.nhs.uk%2FSTU3%2FPatient%2F2' + patient + '&type.coding=http%3A%2F%2Fsnomed.info%2Fsct%7C736253002',
        		{headers: {
        			'accept': 'application/fhir+json',
        			'Authorization': 'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2RlbW9uc3RyYXRvci5jb20iLCJzdWIiOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL3Nkcy1yb2xlLXByb2ZpbGUtaWR8ZmFrZVJvbGVJZCIsImF1ZCI6Imh0dHBzOi8vbnJscy5jb20vZmhpci9kb2N1bWVudHJlZmVyZW5jZSIsImV4cCI6MTU4MzI3MjM0NSwiaWF0IjoxNTgzMjcyMDQ1LCJyZWFzb25fZm9yX3JlcXVlc3QiOiJkaXJlY3RjYXJlIiwic2NvcGUiOiJwYXRpZW50L0RvY3VtZW50UmVmZXJlbmNlLnJlYWQiLCJyZXF1ZXN0aW5nX3N5c3RlbSI6Imh0dHBzOi8vZmhpci5uaHMudWsvSWQvYWNjcmVkaXRlZC1zeXN0ZW18MjAwMDAwMDAwMTE3IiwicmVxdWVzdGluZ19vcmdhbml6YXRpb24iOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL29kcy1vcmdhbml6YXRpb24tY29kZXxBTVMwMSIsInJlcXVlc3RpbmdfdXNlciI6Imh0dHBzOi8vZmhpci5uaHMudWsvSWQvc2RzLXJvbGUtcHJvZmlsZS1pZHxmYWtlUm9sZUlkIn0=.',
        			'fromASID': '200000000117',
        			'toASID': '999999999999'
        			}
        		}
        );
		var htmlresponse = "<HTML><BODY><P>Here is the response with stringify.<P>" + JSON.stringify(response.body) + 
							"<P>Here is the response unalterd.<P>" + response.body + 							
							"</BODY></HTML>";
		console.log(htmlresponse);
		fs.writeFile("output.html", htmlresponse, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
			}
		); 
        //console.log(response.body);
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();
