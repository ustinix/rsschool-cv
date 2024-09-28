const apiKey = "6f07a4a3377a61d7256eea227c0be86b";

const url = "https://api.flickr.com/services/rest/";

window.addEventListener('load', () => {
  createPhotos()
});

function createPhotos(page) {
  const firstPage = "cat";
  const requestUrl = url + "?method=flickr.photos.search&api_key=" + apiKey + "&text=" + firstPage + "&format=json&nojsoncallback=1&per_page=10&extras=url_m&page=" + page;
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      const photos = data.photos.photo;
      const photoContainer = document.getElementById("photoContainer");
      photoContainer.innerHTML = "";
      photos.forEach(photo => {
        const imgSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container";
        imgContainer.style.backgroundImage = "url(" + imgSrc + ")";
        imgContainer.style. height = "300px";
        imgContainer.style. width = "350px";
        imgContainer.style. borderRadius  = "10px";
        imgContainer.style. objectFit  = "cover";
        photoContainer.appendChild(imgContainer);
      });
    });
}


const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchPhotos);

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  pageNumber = 1;
  pageCounter.innerHTML = pageNumber;
});

function searchPhotos(page) {
  const query = document.getElementById("searchInput").value;
  const requestUrl = url + "?method=flickr.photos.search&api_key=" + apiKey + "&text=" + query + "&format=json&nojsoncallback=1&per_page=10&extras=url_m&page=" + page;
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      const photos = data.photos.photo;
      const photoContainer = document.getElementById("photoContainer");
      photoContainer.innerHTML = "";
      
      photos.forEach(photo => {
        const imgSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container";
        imgContainer.style.backgroundImage = "url(" + imgSrc + ")";
        imgContainer.style. height = "300px";
        imgContainer.style. width = "350px";
        imgContainer.style. borderRadius  = "10px";
        imgContainer.style. objectFit  = "cover";
        photoContainer.appendChild(imgContainer);
      });
    });
}


      let pageNumber = 1;
      let numberOfPages = 100; 
      const pageCounter = document.querySelector('.center')
      const btnAfter = document.querySelector('.right_arrow')
      const btnBefore = document.querySelector('.left_arrow')
      const btnStart = document.querySelector('.left_arrows')
      const btnEnd = document.querySelector('.right_arrows')

      function checkCounter() {
        if(pageNumber > 1) {
          btnBefore.classList.remove('button-disabled');
          btnBefore.classList.add('button-active');
          btnStart.classList.add('button-active');
          btnStart.classList.remove('button-disabled'); 
          btnAfter.classList.add('button-active');
          btnAfter.classList.remove('button-disabled');
          btnEnd.classList.add('button-active');
          btnEnd.classList.remove('button-disabled'); 
          btnBefore.removeAttribute('disabled');
          btnStart.removeAttribute('disabled');
          btnAfter.removeAttribute('disabled');
          btnEnd.removeAttribute('disabled');
        }
        if (pageNumber === 1) {
          btnBefore.classList.remove('button-active');
          btnBefore.classList.add('button-disabled');
          btnStart.classList.remove('button-active');      
          btnStart.classList.add('button-disabled');
          btnAfter.classList.add('button-active');
          btnAfter.classList.remove('button-disabled');
          btnEnd.classList.add('button-active');
          btnEnd.classList.remove('button-disabled'); 
          btnBefore.setAttribute('disabled', 'disabled');
          btnStart.setAttribute('disabled', 'disabled');
          btnAfter.removeAttribute('disabled');
          btnEnd.removeAttribute('disabled');
        }
        if (pageNumber == numberOfPages) {
          btnAfter.classList.remove('button-active');
          btnAfter.classList.add('button-disabled');
          btnEnd.classList.remove('button-active');      
          btnEnd.classList.add('button-disabled');
          btnBefore.classList.add('button-active');
          btnBefore.classList.remove('button-disabled');
          btnStart.classList.add('button-active');
          btnStart.classList.remove('button-disabled'); 
          btnAfter.setAttribute('disabled', 'disabled');
          btnEnd.setAttribute('disabled', 'disabled');
          btnBefore.removeAttribute('disabled');
          btnStart.removeAttribute('disabled');
        } 
      }

      btnBefore.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageNumber > 1) {
            pageNumber--;
            checkCounter();
            pageCounter.innerHTML = pageNumber;
            if(document.getElementById("searchInput").value === "") {
              createPhotos(pageNumber);
            } else {
              searchPhotos(pageNumber);
            }            
        }
      });

      btnAfter.addEventListener("click", (e) => {
        e.preventDefault();
        if (pageNumber < numberOfPages) {
            pageNumber++;
            checkCounter();
            pageCounter.innerHTML = pageNumber;
            if(document.getElementById("searchInput").value === "") {
              createPhotos(pageNumber);
            } else {
              searchPhotos(pageNumber);
            }  
        }
      });

      btnStart.addEventListener('click', () => {
        pageNumber = 1;
        checkCounter();
        pageCounter.innerHTML = `${pageNumber}`;
        if(document.getElementById("searchInput").value === "") {
          createPhotos(pageNumber);
        } else {
          searchPhotos(pageNumber);
        }  
      })
      
      btnEnd.addEventListener('click', () => {
        pageNumber = numberOfPages;
        btnAfter.setAttribute('disabled', 'disabled');
        btnAfter.classList.remove('button-active');
        btnAfter.classList.add('button-disabled');
        btnEnd.setAttribute('disabled', 'disabled');
        btnEnd.classList.remove('button-active');      
        btnEnd.classList.add('button-disabled');
        btnBefore.removeAttribute('disabled');
        btnBefore.classList.add('button-active');
        btnBefore.classList.remove('button-disabled');
        btnStart.removeAttribute('disabled');
        btnStart.classList.add('button-active');
        btnStart.classList.remove('button-disabled'); 
        
        pageCounter.innerHTML = `${pageNumber}`;
        if(document.getElementById("searchInput").value === "") {
          createPhotos(pageNumber);
        } else {
          searchPhotos(pageNumber);
        }   
      })

  //при открытии приложения курсор находится в поле ввода

const searchInput = document.getElementById("searchInput");
searchInput.focus();


  //поисковый запрос можно отправить нажатием клавиши Enter

searchInput.addEventListener("keyup", function(event) {
  if (event.code === 'Enter') {
      event.preventDefault();
      searchBtn.click();
  }
});

//листать можно стрелками

btnAfter.addEventListener("keydown", function(event) {
  if (event.code === 'ArrowRight') {
      event.preventDefault();
      btnAfter.click();
  }
});

btnBefore.addEventListener("keydown", function(event) {
  if (event.code === 'ArrowLeft') {
      event.preventDefault();
      btnBefore.click();
  }
});


