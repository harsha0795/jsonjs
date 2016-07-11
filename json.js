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
var intjsresult=[];//Interest Javascript Result Array
var emp_int=[];//Employee Interest Array
var job=[];


//Fetching Data from INTEREST JSON Data
 $.ajax({ /*
	function : $.ajax
	definition : Perform an asynchronous HTTP (Ajax) request.
	Syntax : jquery.ajax([settings])
	Return : jqXHR 
*/
 	type:'GET', //Http GET Request
          url: "http://korefabrik.herokuapp.com/api/INTEREST", //Url of the json data
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
          		intjsresult.push([results[i].INTEREST_ID,results[i].INTEREST_NAME,results[i].CATEGORY_ID]);
}
 
          	console.log(intjsresult);//For development tests purpose.
}
});



// The same explanation holds
//Fetching Data from EMP_INTEREST JSON Data

$.ajax({
 	type:'GET',
          url: "http://korefabrik.herokuapp.com/api/EMP_INTEREST",
          dataType: "jsonp",
          async: false,

          success: function(results) {
          	for (var i = 0; i < results.length; i++) {
              emp_int.push([results[i].EMP_ID,results[i].INTEREST_ID,results[i].CAT_ID]);
            }
      console.log(emp_int);
        
          	
}
});

//Fetching Data from JOB JSON Data
$.ajax({
 	type:'GET',
          url: "http://korefabrik.herokuapp.com/api/JOB",
          dataType: "jsonp",
          async: false,

          success: function(results) {
          	for (var i = 0; i < results.length; i++) {
          		job.push([results[i].JOB_ID,results[i].JOB_TITLE])
          	}
          	for (var i = 0; i < job.length; i++) {
          		//console.log(job[i]);
          	}
}
});
//Fetching Data from Employee JSON Data
var emp=[];

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
var roles=[];
$.ajax({
  type:'GET',
          url: "http://korefabrik.herokuapp.com/api/ROLES",
          dataType: "jsonp",
          async: false,

          success: function (results) {
            for (var i = 0; i < results.length; i++) {
              roles.push([results[i].EMP_ID,results[i].JOB_ID]);
            }
            execbar()
            execpie()
            google.charts.setOnLoadCallback(drawChart);

            
}
});
job1=[];
bar=[];// Bar graph data for Job roles
pie=[];//Pie chart for the Interests

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
function execpie() {
	//This function returns the 2-D Array which contains the Different Interest with no. of people in each interest
	var pie=[];

pie.push(["Interest","No of Employees"]);

for (var j = 0; j < intjsresult.length; j++) {
	count=0
for (var i = 0; i < emp_int.length; i++) {
if(emp_int[i][1]==intjsresult[j][0])
	count++;
}
if(count!=0)
pie.push([intjsresult[j][1],count])
}
return pie;

}



/* Efficiency Information

JSON to JavaScript Array : O(n)
Chart Array Operation : O(n^2)

*/
