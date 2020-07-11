import React from 'react';
import './weather-app.css';
import logo from '../images/logo-2.png';

class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            place: 'Mini weather app',
            celsius: '',
            condition: 'Have a wonderful day!',
            icon: '03d'
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.getData = this.getData.bind(this);
    };

    // fetch data from API
    getData(e) {
        const api_key = 'e75b1f301eed4cfe1c6c894bc991816e';
        const city = this.state.value;
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

        if(city !== '') {
            fetch(api)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }

                throw new Error('Request Failed!');
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => {
                console.log(jsonResponse);
                const place = jsonResponse.name;
                const condition = jsonResponse.weather[0].description;
                const celsius = jsonResponse.main.temp;
                const icon = jsonResponse.weather[0].icon;

                this.updateInfo(place, celsius, condition, icon);
            });
        } else {
            return;
        }

        e.preventDefault();
    }

    // get current time
    dateBuilder(d) {
        let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wesnesday', 'Thursday', 'Friday', 'Saturday', ];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
    }

    updateInfo(place, celsius, condition, icon) {
        this.setState({
            place: place,
            celsius: celsius,
            condition: condition,
            icon: icon
        });
    }

    handleUserInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const celsius = Math.floor(this.state.celsius);
        return (
            <div className="weatherBackground">
                <form>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={this.state.value}
                        onChange={this.handleUserInput}
                        className="searchBar" />
                    <button onClick={this.getData} >Search</button>
                </form>
                <div className="content" >
                    <h2>{this.state.place}</h2>
                    <h1>{celsius} &#8451; </h1>
                    <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="weather icon" />
                    <h2>{this.state.condition}</h2>
                    <h3>{this.dateBuilder(new Date())}</h3>
                </div>
                <div className="logo-am">
                    <img src={logo} alt="logo" />
                </div>
            </div>
        )
    }
}

export default WeatherApp;