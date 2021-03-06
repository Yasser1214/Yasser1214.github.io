var list = document.getElementById("list");
var listBody = document.getElementById("list-body");
var security = 1;


/******** Security ********/


function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, function(c){
    return '&#'+c.charCodeAt(0)+';';
  });
}

function jsEscape(str) {
  return String(str).replace(/[^\w. ]/gi, function(c){
    return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
  });
}

function securityCheck(str) {
	if (htmlEncode(str) !== str && jsEscape(str) !== str) {
		alert("Please only enter common letters and digits in the field.");

		return security = 0;
	}
}


/******** Add ********/


function addItem(x) {

	securityCheck(x);
	if (security == 0) {
		document.getElementById('new-item').value = ""; // clear the bar
		security = 1;
		return; // used to exit function
	}

	if(x.trim() != "") { // empty strings (including space) are not allowed
		var itemStack = document.createElement("div");
		itemStack.setAttribute("class", "item-container");
		listBody.appendChild(itemStack);

		var p = document.createElement("p");
		p.setAttribute("class", "item");
		var txt = document.createTextNode(x);
		p.appendChild(txt);
		itemStack.appendChild(p);

		var button_rmv = document.createElement("button");
		button_rmv.setAttribute("class", "rmv");
		button_rmv.addEventListener("click", removeItem); // in JS functions are hoisted
		itemStack.appendChild(button_rmv);

		var img_rmv = document.createElement("img");
		img_rmv.setAttribute("src", "pictures/remove.png");
		button_rmv.appendChild(img_rmv);

		var button_upd = document.createElement("button");
		button_upd.setAttribute("class", "upd");
		button_upd.addEventListener("click", editItem);
		itemStack.appendChild(button_upd);

		var img_upd = document.createElement("img");
		img_upd.setAttribute("src", "pictures/edit.png");
		button_upd.appendChild(img_upd);
	} else {
		alert("Please enter a text in the field.");
	}

	document.getElementById('new-item').value = ""; // clear the bar

}


/******** Clear ********/


function clearList() {

	var i = 0;
	var item = document.querySelectorAll("div.item-container");

	while(i < item.length) {

		item[i].remove();
		i++;

	}
	
}


/******** Removal ********/


function removeItem() {
	// used in an Event or an Event Listener "this" refers to the HTML element owning the attribute, here "button.rmv"
	this.parentNode.remove(); // div.item-container

}


/******** Edition ********/


function editItem() {
	
	var item = this.parentNode; // item = div.item-container

	var toEdit = this.previousSibling.previousSibling; // toEdit = p.item
	toEdit.style.display = "none";

	if (document.getElementsByClassName("edit").length < 1) { // only one edition bar at time

		var edition = document.createElement("input");
		edition.setAttribute("type", "text");
		edition.setAttribute("class", "edition");

		var submition = document.createElement("input");
		submition.setAttribute("type", "submit");
		submition.setAttribute("value", "Ok");
		submition.setAttribute("class", "edit");

		item.insertBefore(edition, toEdit);
		item.insertBefore(submition, toEdit);


		submition.addEventListener("click", function() {

			securityCheck(edition.value);
			if (security == 0) {
				edition.remove();
				submition.remove();
				toEdit.style.display = "";

				security = 1;
			} else {
				if (edition.value.trim() != "") {
					toEdit.innerHTML = edition.value; 
					edition.remove();
					submition.remove();
					toEdit.style.display = "";
				} else {
					edition.remove();
					submition.remove();
					toEdit.style.display = "";
				}
			}
		
		});

	}

}