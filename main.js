const storiesContainer = document.querySelector(".news-stories-container");

fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  .then(function (res) {
    return res.json();
  })
  // Now process the above JSON, we will first console log a message
  .then(function (data) {
    //console.log('Data is: ');
    //console.log(data);
    return data;
  })
  .then(function (storyIDs) {
    for (let i = 0; i < 500; i++) {
      fetch(
        "https://hacker-news.firebaseio.com/v0/item/" +
          storyIDs[i] +
          ".json?print=pretty"
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          const storyDiv = document.createElement("div");
          storyDiv.classList.add("card");
          storyDiv.style.width = "20rem";
          storyDiv.style.border = "5px solid black";
          storiesContainer.appendChild(storyDiv);
          const storyIMG = document.createElement("img");
          storyIMG.src = "401500.jpeg";
          storyIMG.classList.add("card-img-top");
          storyDiv.appendChild(storyIMG);

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          cardBody.style.border = "20px solid white";
          storyDiv.appendChild(cardBody);

          const cardComments = document.createElement("p");
          cardComments.classList.add("card-body");
          cardComments.innerText = data.descendants + " Total Comments";
          cardComments.style.margin = "-40px";
          storyDiv.appendChild(cardComments);

          const cardScore = document.createElement("p");
          cardScore.classList.add("card-body");
          cardScore.innerText = data.score + " Total Score";
          storyDiv.appendChild(cardScore);

          const storyTitle = document.createElement("p");
          storyTitle.classList.add("card-text");
          storyTitle.innerText = data.title;
          cardBody.appendChild(storyTitle);

          const storyDate = document.createElement("p");
          storyDate.classList.add("date-published");
          const milliseconds = data.time * 1000; //
          const dateObject = new Date(milliseconds);
          const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
          storyDate.innerText = "Published: " + humanDateFormat;
          storyDiv.appendChild(storyDate);

          const storyLink = document.createElement("a");
          storyLink.classList.add("link-to-story");
          storyLink.href = data.url;
          storyLink.target = "_blank";
          storyLink.innerText = "Read Article";
          storyLink.style.textDecoration = "none";
          storyLink.style.color = "white";
          storyLink.style.background = "purple";
          storyDiv.appendChild(storyLink);
        });
    }
  });
