const form = document.getElementById("myForm");
const inputElement = document.getElementById("search");
const list = document.getElementById("list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = inputElement.value;

  const fetchUrl = async () => {
    const res = await fetch(
      `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${value}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "mashape-community-urban-dictionary.p.rapidapi.com",
          "x-rapidapi-key":
            "137332e08cmsh83a73a314e0a5b2p13aa8djsn84ba447f737f",
        },
      }
    );

    const data = await res.json();
    displayData(data);
  };

  const displayData = (result) => {
    console.log(result.list);
    const html = result.list
      .map(
        (elem) => `
	<li>
   <h3>${elem.word}</h3><br>
  <h4><span>Author-</span>${elem.author}</h4>
  <p><span>Definition-</span>${elem.definition}</p>
  <p>Example-${elem.example}</p>
  <audio controls>
  <source src="${elem.sound_urls[0]}" type="audio/wav">
  <source src="${elem.sound_urls[1]}" type="audio/wav">
  <source src="${elem.sound_urls[2]}" type="audio/wav">
  <source src="${elem.sound_urls[3]}" type="audio/wav">
  Your browser does not support the audio element.
  </audio>
  <span><i class="fas fa-thumbs-up">${elem.thumbs_up}</i></span>
  <span><i class="fas fa-thumbs-down">${elem.thumbs_down}</i></span>
	</li>`
      )
      .join("");

    list.innerHTML = html;
  };
  inputElement.value="";
  fetchUrl();
});
