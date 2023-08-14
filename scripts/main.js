
const JSON_SERVER_DATA_URI = "http://localhost:3000/data";

document.addEventListener("DOMContentLoaded", async (ev) => {
  const flavourList = document.getElementById("summary__flavour-list");
  const result = document.getElementById("result-score");
  await fetch(JSON_SERVER_DATA_URI)
    .then( res => res.json())
    .then(data => {
      data.forEach(({category, score, icon}) => {
        const newItem = `
          <span class="summary-flavour__type">
            <img
              src="${icon}"
              alt="Icon_${category}"
              class="flavour-type__icon"
            />
            <span class="flavour-type__value">${category}</span>
          </span>
          <span class="summary-flavour__score">
            <span class="flavour-score__value">${score}</span> 
            <span class="flavour-score__maximum">/ 100</span>
          </span>
        `;
        const itemNode = document.createElement("li");
        itemNode.innerHTML = newItem;
        itemNode.classList.add("summary-flavour");
        itemNode.setAttribute("data-category", category);

        flavourList.appendChild(itemNode);
      });

      let value = data.reduce(({score: prevScore}, {score}) => ({ score: prevScore + score }));
      value = value.score / data.length;
      result.innerText = Math.floor(value);
    });
});