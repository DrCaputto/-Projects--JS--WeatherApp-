async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=75536a10e0d4b3394cb9f9ade8a3fac6`,
        { mode: "cors" }
      );
      const data = await response.json();
      const selected = weatherData(data);
      console.log(selected);
      weatherCard(selected).render()
    } catch (err) {
      throw err;
    }
  }
  
  const weatherData = function onlyUsefulWeatherData(props) {
    return {
      name: props.name,
      main: props.weather[0].main,
      description: props.weather[0].description,
      icon: props.weather[0].icon,
      country: props.sys.country,
      temp: props.main.temp,
    };
  };
  
  const weatherCard = function compononent(props) {
    const main = document.querySelector(".main");
    const card = document.createElement("div");
    const name = document.createElement("p");
    const temp = document.createElement("p");
    const icon = document.createElement("img");
    const description = document.createElement("p");
  
    name.textContent = props.name + " " + props.country;
    temp.textContent = `${props.temp}°`;
    icon.src = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;
    description.textContent = props.description;
  
    card.appendChild(name);
    card.appendChild(temp);
    card.appendChild(icon);
    card.appendChild(description);
  
    const render = function renderCard() {
      main.innerHTML = "";
      main.appendChild(card);
    };
  
    return {
      render
    };
  };
  
  function searchWeather() {
    const inputData = document.querySelector("#search").value;
    fetchWeather(inputData);
  }
  
  document.querySelector(".search-btn").addEventListener("click", searchWeather);