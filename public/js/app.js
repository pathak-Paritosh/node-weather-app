// fetch("http://localhost:3000/weather?city=delhu&country=india")
//     .then(res => res.json())
//     .then(data => console.log(data));


const form = document.querySelector("form");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = form.city.value.trim();
    const country = form.country.value.trim();
    const url = `http://localhost:3000/weather?city=${city}&country=${country}`;
    msgOne.innerText = "Loading...";
    msgTwo.innerText = "";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            msgOne.innerHTML = `It's ${data.temperature}`;
            msgOne.innerHTML += `<span>&deg; C</span>`
            msgTwo.innerText = `${data.forecast}`;
        });
})