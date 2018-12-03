//global variables
const studentList = document.querySelector('.student-list');
const listItems = document.querySelectorAll('.student-item')
const pageContainer = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const len = listItems.length;
let pages = Math.ceil(len/10);


//*************************************************************

// showPage function to hide items except for 10
function showPage(page){

  //hide all list listItems
  for (let i=0; i<listItems.length; i++){
    listItems[i].style.display="none";
  }

  //display list items of the page
  //logic: (PAGE-1)*10 + display

    if (page!=pages){
      for (let i=0; i<10; i++){
        listItems[(page-1)*10 + i].style.display="list-item";
      }
    } else { //if it's the last page
      //figure out how many items on the last page.
      const leftover = len%10;
      for (let i=0; i<leftover; i++){
        listItems[(page-1)*10 + i].style.display="list-item";
      }
    }
  }

//*************************************************************

//appendPagesLinks function to add pagination functionality
function appendPageLinks(){

  //generate the pagination
  let pageString = `<div class="pagination"><ul>`;
  pageString += `<li><a class="active" href="#">1</a></li>`;
  for (let i=1; i<pages; i++){
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
      showPage(pageSelected);

      //remove active class from all
      const paginationLinks = document.querySelectorAll('.pagination a');
      for (let i=0; i<paginationLinks.length; i++){
        paginationLinks[i].classList.remove('active');
      }
      //add active class to clicked
      paginationLinks[pageSelected-1].classList.add('active');

    }
  });
};

//*************************************************************

//Add search component
/***
Insert before end of .page-header
***/

let searchString = `
<div class="student-search">
  <input placeholder="Search for students...">
  <button>Search</button>
</div>
`;



pageHeader.insertAdjacentHTML('beforeend', searchString);



//initialise page 1 on load
showPage(1);
appendPageLinks();
