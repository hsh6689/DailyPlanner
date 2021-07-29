/*
TODO: 
1. Create a table from 8AM-5PM
2. For each time slot, I need input box, save button 
3. based on the current time, the prev should be disabled 
*/
var timeSlot= ["8AM", "9AM", "10AM", "11AM", "12PM", 
				"1PM", "2PM", "3PM", "4PM", "5PM"];

//var currentDayEl = document.getElementById("currentDay")
var currentDayEl = $('#currentDay');
//var timeblock = document.getElementById("timeblock")
var timeblock = $('#timeblock');
//get button elements
var saveBtn = $('saveBtn');
//get reset button by class, var resetBtn = document.queryselector('.btn-reset')
var resetBtn = $('.btn-reset');


//Display time function using momentJS
function displayTime() {
  var curr = moment().format("MM-DD-YYYY HH:mm:ss");
  currentDayEl.text(curr);
}

//Use moment JS, display current date + time
setInterval(displayTime);

//Render tables from 8AM to 5PM
function renderPlanner(){
 var progress = false;
 const localCopy = JSON.parse(localStorage.getItem("storedList")) || [];
 if(localCopy.length===0){
 	 storageInitialize();
 }

 for (var i=0;i<timeSlot.length;i++){
 	// var hourBlock = document.createElement("div");
   var hourBlock = $('<div>');
	 var hourCol = $('<div>');
	 var descCol = $('<textarea>');
	 var saveCol = $('<button>');

	 var curr = moment().format("hA");

	 hourBlock.attr('class', 'time-block row');
	 hourCol.attr('class', 'hour col-1');
	 //hourCol.append($('<p>').text(timeSlot[i])); 

	 descCol.attr('class', 'description col-10');
	 saveCol.attr('class', 'saveBtn col-1');

	 hourCol.text(timeSlot[i]);
	 saveCol.text("Save");
	 descCol.text(localCopy[i]["message"]);
	
	 descCol.css('color', 'black');
	 descCol.css('font-size', '20px');

	 console.log("Curr: "+curr+", timeSlot: "+timeSlot[i]);

	 //Handles coloring based on the current time
	 if(curr===timeSlot[i]){
	 	 hourBlock.addClass('present');
		 progress=true;
	 }
	 else if(progress===false){
		 hourBlock.addClass('past');
	 }
	 else{
		 hourBlock.addClass('future');
	 }

	 hourBlock.append(hourCol);
	 hourBlock.append(descCol);
	 hourBlock.append(saveCol);
	 timeblock.append(hourBlock);
 }

}

function storageInitialize(){
	//if storage is empty, intialize
	const localCopy = [];
	for (var i=0; i<timeSlot.length;i++){
		var tempVal ={
			target: timeSlot[i],
	  	message: ""
	 	};
	 	localCopy.push(tempVal);
	}
	localStorage.setItem("storedList",JSON.stringify(localCopy));
	
}

renderPlanner();

//When Save is clicked, save to the localStorage
function saveSchedule(event){

	event.preventDefault();
  var tempMessage = $(event.target).siblings().eq(1).val();
  var tempTarget = $(event.target).siblings().eq(0).text();

  console.log("tempMessage: " +tempMessage);
  console.log("tempTarget: " +tempMessage);

  const localCopy = JSON.parse(localStorage.getItem("storedList")) || [];
  console.log("localCopy Before update: " +localCopy);

  if(localCopy.length===0) {
		return false;
	}
	else {
		//Find the object that is being updated
	  var tempObj = localCopy.find(o => o.target===tempTarget);
	  //Update the value, equivalent with tempObj["message"]
	  tempObj.message = tempMessage;
  }
  console.log("localCopy after update: " +localCopy);
  localStorage.setItem("storedList",JSON.stringify(localCopy));
}



//When saveBtn inside timeblock is clicked, save the document 
timeblock.on("click",'.saveBtn',saveSchedule);
resetBtn.on("click", function(event){
	event.preventDefault();
	storageInitialize();
	location.reload();
});