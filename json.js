/* The following javascript and jquery code will extract the JSON data and convert it into a javascript array
	Reason : Plotting of the graph must be of a javascript array but the data is in json. (Google Chart Uses Javascript array)
  Author : SRIHARSHA B S, Development Intern, KoreFabrik inc
  Company : KoreFabrik inc.
  Date : 10/07/2016
*/

var delay=1000;
// This delay ensures a minute delay giving enough time for the ajax to retrieve the data
/*
I have used this in setTimeout()
function semantics : setTimeout(function,delay);
*/
var job=[]; //JOB Title Information


//Fetching Data from JOB JSON Data
 $.ajax({ /*
	function : $.ajax
	definition : Perform an asynchronous HTTP (Ajax) request.
	Syntax : jquery.ajax([settings])
	Return : jqXHR 
*/
 	type:'GET', //Http GET Request
          url: "http://korefabrik.herokuapp.com/api/JOB", //Url of the json data
          dataType: "jsonp",/*here "json" is deprecated for XMLHttpRequest cannot be loaded. Reason is we are takig data from an external source
			Actual Error : No Access Control over Cross Origin. However jsonp supports this feature
          */
          async: false,//Send Synchronous request

          success: function(results) { //If JSON data is fetched Successful Perform the following operation
          	//$.each(results, function(i, field){ 
          		/* This anonymous function will iterate through all the objects that is loaded by the json data "results"
					This takes json obj as a parameter an will iterata though the loop and pushes to javascript array 
          		 */
          		 for (var i = 0; i < results.length; i++) {
          		job.push([results[i].JOB_ID,results[i].JOB_TITLE])
}
 
          	console.log(job);//For development tests purpose.
}
});


//Fetching Data from Employee JSON Data
var emp=[]; //Employee Array

$.when($.ajax({
  type:'GET',
          url: "http://korefabrik.herokuapp.com/api/EMPLOYEE",
          dataType: "jsonp",
          async: false,
          responseJSON: emp,
                   success: function(results) {
            
}
 
})).then(function (results) {
  
  console.log(results);
for (var i = 0; i < results.length; i++) {
              emp.push([results[i].EM_ID,results[i].FNAME,results[i].LNAME]);
            }
            
});

//Fetching Data from Roles JSON Data
var roles=[]; //Employees and their roles
$.ajax({
  type:'GET',
          url: "http://korefabrik.herokuapp.com/api/ROLES",
          dataType: "jsonp",
          async: false,

          success: function (results) {
            for (var i = 0; i < results.length; i++) {
              roles.push([results[i].EMP_ID,results[i].JOB_ID]);
            }
            
}
});

bar=[];// Bar graph data for Job roles
//Pie chart for the Interests

function execbar() {
//This function returns the 2-D Array which contains the Different Job roles with no. of people in each job role 
var bar=[];
var count;

	bar.push(["Job Role","No of Employees"]);
	
for (var i = 0; i < job.length; i++) {
count=0;
for (var j=0; j<roles.length; j++) {
	if (job[i][0]==roles[j][1]) {
		count++;
	}
}
bar.push([job[i][1],count]);
}
return bar;
}


/* Efficiency Information

JSON to JavaScript Array : O(n)
Chart Array Operation : O(n^2)

*/
