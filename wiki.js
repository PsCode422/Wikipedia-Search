const searchBtn = document.querySelector(".submitBtn");
searchBtn.value = "Search";

let inputField = document.querySelector(".inputField");

const output = document.querySelector(".output");

const article = document.querySelector(".article");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(inputField.value === "") {
        alert("Empty Field")
    } 
    else
    {
      let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${inputField.value}`;
  
      fetch(url)
        .then(function(response) {
       return(response.json());
      })
        .then(function(data){
        let resultsArray = data.query.search;
        resultsOnPage(resultsArray);
      })
        .catch(function () {
        alert('An error occurred');
      });
  
      function resultsOnPage(myArray){
          output.innerHTML = "";
          myArray.forEach(function(item){
              let itemTitle = item.title;
              let itemSnippet = item.snippet;
              let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
  
              output.insertAdjacentHTML('beforeend',
                 `<div class="article">
                   <h4><a href="${itemUrl}" target="_blank" rel="noopener">${itemTitle}</a></h4>
                   <p><a href="${itemUrl}" target="_blank" rel="noopener">${itemSnippet}</a></p>
                 </div>`
                );
            });
        };
    };
});
