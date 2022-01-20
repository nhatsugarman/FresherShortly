


const header = document.querySelector('.header')

const shrinkHeader = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        header.classList.add('shrink')
    } else {
        header.classList.remove('shrink')
    }
}

window.addEventListener('scroll', shrinkHeader)



// Toggle menu item


const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");



const activeClass = "is-show";
toggle.addEventListener("click", function () {
    menu.classList.add(activeClass);
});
window.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !e.target.matches(".menu-toggle")) {
        menu.classList.remove(activeClass);
    }
});

close.onclick = () => {
    menu.classList.remove(activeClass);
}

// Active shotern button 

// const shorten = document.querySelector(".shorten");
// const buttonShorten = document.querySelector(".shorten-button");
// const copied = document.querySelectorAll(".shorten-item__copy");
// const shortenContent = document.querySelector(".shorten-content");


// buttonShorten.addEventListener("click", function (e) {
//   shorten.classList.toggle('active');
//   shortenContent.classList.toggle('active')
// });


// copied.forEach((item) => {
//   item.onclick = () => {
//     item.classList.add('copied');
//   }
// })

// Shroten

const btn = document.querySelector(".shorten-button");
const url = document.querySelector('.url');
const shortenContent = document.querySelector('.shorten-content');



// Control real url
function ValidateUrl(link) {

    var urlFormat = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (link.match(urlFormat)) {

        return true;
    }
    else {
        return false;
    }
}


// Creating a new div when the API has been called and stores it to local data - Also allows to copy link to clipboard
function addLinkDiv(originalURL, shortURL) {
    const putDivHere = document.querySelector('.shorten-list');
    const newDiv = document.createElement("li");
    newDiv.className = 'shorten-item';
    // newDiv.innerHTML = "\<a class=\"shorten-item__link\"\>" + originalURL + "\</a\> \<a class=\"shorten-item__rep\"\>" + shortURL + "\</a\> \<a class=\"shorten-item__copy\"\>Copy\</a\>";
    newDiv.innerHTML =(
        `<a class="shorten-item__link"> ${originalURL} </a>
        <a class="shorten-item__rep"> ${shortURL} </a>
        <a class="shorten-item__copy"> Copy </a>        
        `
    )


    putDivHere.appendChild(newDiv); //Creates the div

    localStorage.setItem('shortenLinksList', putDivHere.innerHTML); // Stores to local storage the created div

    copyBtns = document.querySelectorAll('.shorten-item__copy');


    //Copy links to clipboard
    copyBtns.forEach(copyBtn => {
        copyBtn.addEventListener('click', e => {
            //console.log(copyBtn.parentNode.querySelector('.shorten-url').innerHTML);
            copyToClipboard(copyBtn.parentNode.querySelector('.shorten-item__rep').innerHTML, copyBtn);
        })
    })
}

function copyToClipboard(url, btn) { //url is the shorten url string and btn the button to modify

    console.log(url, btn);

    navigator.clipboard.writeText(url).then(function () {
        //it access was granted
        console.log('OK');
        btn.classList.add('copied');
        btn.innerHTML = "Copied!";
        setTimeout(function () {
            btn.classList.remove('copied');
            btn.innerHTML = "Copy";
        }, 1500);
    }, function () {
        // if access was denied
        console.log('NOK');
    });
}


// Loads the links previously stored


window.addEventListener('load', e => {
    const putDivHere = document.querySelector('.shorten-list');
    var originListHtml = localStorage.getItem('shortenLinksList');
    if (putDivHere.innerHTML) {

        putDivHere.innerHTML = originListHtml;
    }
    console.log('oke man');
    //return;
    copyBtns = document.querySelectorAll('.shorten-item__copy');
    //Copy links to clipboard
    copyBtns.forEach(copyBtn => {
        copyBtn.addEventListener('click', e => {
            //console.log(copyBtn.parentNode.querySelector('.shorten-url').innerHTML);
            copyToClipboard(copyBtn.parentNode.querySelector('.shorten-item__rep').innerHTML, copyBtn);
        })
    })
})


// Calling the API
btn.addEventListener('click', e => {
    let urlValue = url.value;
    if (ValidateUrl(urlValue)) {

        shortenContent.classList.remove('active');
        fetch("https://api.shrtco.de/v2/shorten?url=" + urlValue)
            .then(response => response.json())
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    console.log(response.result.full_short_link);
                    addLinkDiv(urlValue, response.result.full_short_link); //Make new div appear
                    btn.classList.remove('waiting');
                    btn.innerHTML = "Shorten It!";
                }
                else {
                    // url.classList.add('incorrect');
                    // btn.classList.remove('waiting');
                    btn.innerHTML = "Shorten It!";
                }
            })
        btn.classList.add('waiting');
        btn.innerHTML = "Please wait...";
    }
    else {
        shortenContent.classList.add('active');
    }
})

