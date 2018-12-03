//*************************************************************
//global variables
const studentList = document.querySelector('.student-list');
const listItems = document.querySelectorAll('.student-item')
const pageContainer = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');

//*************************************************************
//on page load

//add error message container
studentList.insertAdjacentHTML('afterbegin', `<h1 class="errormessage">Oops. No Results!</h1>`);

//show Page 1
showPage(1, listItems);

//generate pagination
appendPageLinks(listItems);

//generate search bar
pageHeader.insertAdjacentHTML('beforeend', `
<div class="student-search">
  <input placeholder="Search for students...">
  <button>Search</button>
</div>
`);

//*************************************************************
//Handy functions

//Hide all hideable items
function hideAllItems(){
  for (let i=0; i<listItems.length; i++){
    listItems[i].style.display="none";
  }
  document.querySelector('.errormessage').style.display="none";
}

//Remove Pagination container (used before generating another)
function removePagination(){
  const pagContainer = document.querySelector('.pagination');
  pagContainer.parentNode.removeChild(pagContainer);
}

//*************************************************************
//Show Page Function

// showPage function to hide items except for 10
function showPage(page, list){
  //hide all list listItems
  hideAllItems();

  if (list.length==0){ //if 0 items in list

    //display error message
    document.querySelector('.errormessage').style.display = "block";

  } else {

    let len = list.length;
    let pages = Math.ceil(len/10);
    let leftover = len%10;

    if (page!=pages){
      for (let i=0; i<10; i++){
        list[(page-1)*10 + i].style.display="list-item";
      }
    } else { //if it's the last page
      //figure out how many items on the last page.
      for (let i=0; i<leftover; i++){
        list[(page-1)*10 + i].style.display="list-item";
      }
    }
  }
}

//*************************************************************
//Append Page Links Function

//appendPagesLinks function to add pagination functionality
function appendPageLinks(list){

  //generate the pagination
  let pageString = `<div class="pagination"><ul>`;
  pageString += `<li><a class="active" href="#">1</a></li>`;
  for (let i=1; i<Math.ceil(list.length/10); i++){
    pageString += `<li><a href="#">${i+1}</a></li>`;
  }
  pageString += `</ul></div>`;
  pageContainer.insertAdjacentHTML('beforeend', pageString);

  //add functionality to each page link
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.addEventListener('click', (e)=>{
    if (e.target.tagName=="A"){
      //prevent Default Action of jumping
      e.preventDefault();

      //get the page selected and show that page
      const pageSelected = e.target.innerHTML;
      showPage(pageSelected,list);

      //remove active class from all
      const paginationLinks = document.querySelectorAll('.pagination a');
      for (let i=0; i<paginationLinks.length; i++){
        paginationLinks[i].classList.remove('active');
      }
      //add active class to clicked
      e.target.classList.add('active');

    }
  });

    //hide pagination if no results
    if (list.length==0){
      document.querySelector('.page').lastElementChild.style.display = "none";
    }

};

//*************************************************************
//Search Functionality

const searchInput = document.querySelector('.student-search input');

//add event listener on Keyup
searchInput.addEventListener('keyup', (e)=>{
  let value = e.target.value.toLowerCase();
  let filtered = Array.prototype.filter.call(listItems, function(listItem){
    return listItem.innerText.includes(value);
  });
  hideAllItems();
  showPage(1, filtered);
  removePagination();
  appendPageLinks(filtered);
});
