const bodyWidth = document.body.clientWidth;
if(bodyWidth > 900) document.body.style.width = '1440px';

// fetch data json

( () => {
  
  fetch('data.json')
  .then(response => response.json())
  .then( function(datas) {
    
    // iterate all the data
    let lists = '';
    datas.forEach(data => lists += jobListings(data));
    
    // append the data to its container
    const listContainer = document.querySelector('.list-container');
    listContainer.innerHTML = lists;
    
    // iterate the filter tags
    tagFilters(datas);
    // check tag new and featured true or false
    tagNewAndFeatured();
    //
    filterJobListings(datas);
    
  });
  
})();

// create lists

function jobListings(data) {
  
  return `
  <li class="list" id=${data.id}>
          <div class="info-list-store">
            <div class="logo-list-store">
              <img src=${data.logo} alt="" class="logo-list">
            </div>
            <div class="info-list">
              <p class='info-1'><span class="company">${data.company}</span> <span data-new=${data.new} class="new">New!</span> <span data-feature=${data.featured} class="feature">Featured</span>
              </p>
              <h2 class="position">${data.position}</h2>
              <p><span class="time">${data.postedAt}</span> • <span class="contract">${data.contract}</span> • <span class="location">${data.location}</span></p>
            </div>
          </div>
          <div class="filter-list"></div>
        </li>
  `;
  
}


function tagNewAndFeatured() {
  
  // check tag new true or false
  const tagNew = document.querySelectorAll('[data-new]');
  tagNew.forEach(tag => {
    if (tag.dataset.new == 'false') {
      tag.style.display = 'none';
    };
  });
  // check tag featured true or false
  const tagFeature = document.querySelectorAll('[data-feature]');
  tagFeature.forEach(tag => {
    if (tag.dataset.feature == 'false') {
      tag.style.display = 'none';
    };
  });
  
}

 function tagFilters(datas) {
  
  const filterList = document.querySelectorAll('.filter-list');
  filterList.forEach((filter, i) =>  {
    // create role tags
    const role = document.createElement('h3');
    role.classList.add('filter', datas[i].role);
    role.innerHTML = datas[i].role;
    filter.append(role);
    // crrate level tags
    const level = document.createElement('h3');
    level.classList.add('filter', datas[i].level);
    level.innerHTML = datas[i].level;
    filter.append(level);
    // create language tags
    datas[i].languages.forEach(lang => {
      const language = document.createElement('h3');
      language.classList.add('filter', datas[i].languages);
      language.innerHTML = lang;
      filter.append(language);
    });
    // create tool tags
    datas[i].tools.forEach(tol => {
      const tool = document.createElement('h3');
      tool.classList.add('filter', datas[i].tools);
      tool.innerHTML = tol;
      filter.append(tool);
    });
  });
  
}

// FILTER FUNCTION&&

function filterJobListings(datas) {
  
  document.addEventListener('click', function manage(e) {
    
    let tag = e.target.textContent;
    if (e.target.classList.contains('filter')) {
    
    
      
    // if filter text is already exist in the filter box, then return nothing
      const filterTexts = Array.from(document.querySelectorAll('.filter-txt'));
      const fil = filterTexts.map(text => text.textContent);
      
      if(fil.indexOf(tag) !== -1) return;
      
     // add filter tag to filter box
     filterTag(e.target.textContent)
    
    // filtering job list
    
      realFuncFiltering();
      
      
      
    }
    // click button delete
    
    if (e.target.classList.contains('btn-delete')) {
      e.target.parentElement.remove();
      // remove filter box from the display when its no filter tag
      const filterTags = document.querySelectorAll('.filter-tag');
      if (filterTags.length === 0) filterBox.classList.remove('show');
      // filtering list
      backlist();
    }
    // click button clear
    if (e.target.classList.contains('btn-clear')) {
      document.querySelectorAll('.filter-tag').forEach(tag => tag.remove());
      // remove filter box from the display
      setTimeout(() => filterBox.classList.remove('show'), 1000);
    // return all lists to display
    const lists = document.querySelectorAll('.list');
    for(let list of lists) list.style.display = 'inherit';
    
    }
    
  });
  
}


// function manage filter box
const filterBox = document.querySelector('.filter-box');
function filterTag(tag) {
  
  filterBox.classList.add('show');
  // create tag codes
  let filterTagCodes = `
            <h3 class="filter-txt">${tag}</h3>
            <img src="images/icon-remove.svg" alt="" class="btn-delete">
  `;
  // create element div tag
  const div = document.createElement('div');
  div.classList.add('filter-tag');
  div.innerHTML = filterTagCodes;
  
  document.querySelector('.tags-contain').append(div);
  
}

// filtering lists
function realFuncFiltering() {
  
  const filterLists = document.querySelectorAll('.filter-list');
  const arrFilterTEXTS = Array.from(document.querySelectorAll('.filter-txt'));
  const TEXTS = arrFilterTEXTS.map(text => text.innerHTML);
  
  let listArr = [];
  
  filterLists.forEach((list) => {
    
    
    const txt = Array.from(list.children);
    const newTxt = txt.map(t => t.innerHTML);
  
    listArr.push(newTxt);
  
  });
  
  const lists = document.querySelectorAll('.list');
  
  TEXTS.forEach(text => {
  
    listArr.forEach((list, i) => {
      
      if (!list.includes(text)) {
        let index = listArr.indexOf(list);
        lists[i].style.display = 'none';
      }
        
    });
  
  });
  
}


function backlist() {
  
  const filterLists = document.querySelectorAll('.filter-list');
  const filterTexts = Array.from(document.querySelectorAll('.filter-txt'));
  let filterTextsArr = filterTexts.map(text => text.innerHTML);
  
  let listArr = [];
  
  filterLists.forEach((list) => {
  
    const txt = Array.from(list.children);
    const newTxt = txt.map(t => t.innerHTML);
  
    listArr.push(newTxt);
  
  });
  const lists = document.querySelectorAll('.list');
  
  filterTextsArr.forEach(text => {
  
    listArr.forEach((list, i) => {
      if (list.includes(text)) {
        lists[i].style.display = 'inline-block';
      }
  
    });
  
  });
  
  if(filterTextsArr.length === 0) {
    for(let list of lists) list.style.display = 'inherit';
  }
  
}