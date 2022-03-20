function nameFinder() {

  var input_text, upper, ul_tag, li_tag, a_tag, i, j, txtContent;
  input_text = document.getElementById('input_txt');
  txtFiltered = input_text.value.toUpperCase();
  ul_tag = document.getElementById("list");
  li_tag = ul_tag.getElementsByTagName('li');

  ul_tag.style.display = "";

  // This part loops through all list items, and hides those that don't match the search query
  // Thanks to onkeyup and loop each time a key is entered we browse all the list
  for (i = 0; i < li_tag.length; i++) {
    a_tag = li_tag[i].getElementsByTagName("a")[0]; // serialize the character's name
    txtContent = a_tag.textContent || a_tag.innerText;
    if (txtContent.toUpperCase().indexOf(txtFiltered) == 0 && input_text.value.trim() != "") { 
    // if the string of the searchbar match the first part of the searched name it displays the name
      li_tag[i].style.display = "";
    } else {
      li_tag[i].style.display = "none";
    }
  }

}

function hideShowList() {

  var list = document.getElementById("list");
  var elmt = list.getElementsByTagName('li');

  for (i = 0; i < elmt.length; i++) {
    if (elmt[i].style.display = "none") {
      elmt[i].style.display = "";
    } 
  }

  if (list.style.display == "") {
    list.style.display = "none";
  } else {
    list.style.display = "";
  }

}
