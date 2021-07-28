/*
TODO: 
1. Create a table from 8AM-5PM
2. For each time slot, I need input box, save button 
3. based on the current time, the prev should be disabled 
*/

var currentDayEl = $('#currentDay');

function displayTime() {
	var curr = moment().format("MM-DD-YYYY HH:mm:ss");
	currentDayEl.text(curr);
}

//Use moment JS, display current date + time
setInterval(displayTime, 1000);