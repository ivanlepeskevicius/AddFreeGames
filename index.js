
let header = document.querySelector('header');
let section = document.querySelector('section');

//Initial setup to receive the new batch of posts
let requestURL = 'https://www.reddit.com/r/GameDeals/new.json?sort=new&limit=100';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    let posts = request.response;
    findSteamGames(posts);
}

function populateHeader(jsonObj) {
    let myPara = document.createElement('p');
    myPara.textContent = 'Posts from /r/GameDeals';
    header.appendChild(myPara);
  }

function findSteamGames(jsonObj) {
    //Finds the entries for the Steam store
    let jsonSteam = [];
    let post = jsonObj['data']['children'];

    for (let i = 0; i < 100; i++) {
        let title = post[i].data.title;
        let url = post[i].data.url
        if (title.includes("[STEAM]")) { //If there's a match adds the result to the list
            addToJSON(jsonSteam, title, url);
        }
        else if (title.includes("[Steam]")) {
            addToJSON(jsonSteam, title, url);
        } else if (title.includes("[steam]")) {
            addToJSON(jsonSteam, title, url);
        }
    }
    return findFreeGames(jsonSteam);
}

function findFreeGames(jsonObj) {
    //Finds the Free Games on the filtered JSON file 
    let jsonSteamFree = [];
    const substrings = ['100', 'free', 'FREE'];
    const results = jsonObj.length;

    for (let i = 0; i < results; i++) {
        let gameTitle = jsonObj[i].title;
        let gameUrl = jsonObj[i].url;
        if (gameTitle.includes('100')) { //If there's a match adds the result to the list
            addToJSON(jsonSteamFree, gameTitle, gameUrl);
            console.log(gameTitle);
        } else if (gameTitle.includes('free')) {
            addToJSON(jsonSteamFree, gameTitle, gameUrl);
            console.log(gameTitle);
        } else if (gameTitle.includes('FREE')) {
            addToJSON(jsonSteamFree, gameTitle, gameUrl);
            console.log(gameTitle);
        } else if (gameTitle.includes('Free')) {
            addToJSON(jsonSteamFree, gameTitle, gameUrl);
            console.log(gameTitle);
        }
    }
    return navigateTo(jsonSteamFree); 
}

function addToJSON(jsonObj, title, url) {
    item = {};
    item["title"] = title;
    item["url"] = url;
    item["status"] = 'New post'; //initial status

    jsonObj.push(item);
    jsonString = JSON.stringify(jsonObj);
    //console.log(jsonObj);
}

function navigateTo(jsonObj) {
    const results = jsonObj.length;

    for (let i = 0; i < results; i++) {
        let gameUrl = jsonObj[i].url;
        //Navigate to the link
        let browser = window.open(gameUrl);
    }
    return showPosts(jsonObj);
}

function showPosts(jsonObj) {

    d = new Date();
    document.getElementById("date").innerHTML = "Last run:  " + d.toString();

    let table = document.createElement('table')
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');

    th1.textContent = 'Title';
    th2.textContent = 'URL';
    th3. textContent = 'Status';

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    table.appendChild(tr);
    section.appendChild(table);

    for (let i = 0; i < jsonObj.length; i++) {
      let tr = document.createElement('tr');
      let title = document.createElement('td');
      let url = document.createElement('td');
      let status = document.createElement('td');

      title.textContent = jsonObj[i].title;
      url.textContent = jsonObj[i].url;
      status.textContent = jsonObj[i].status;

      tr.appendChild(title);
      tr.appendChild(url);
      tr.appendChild(status);
      table.appendChild(tr);

      section.appendChild(table);
    }
  }

