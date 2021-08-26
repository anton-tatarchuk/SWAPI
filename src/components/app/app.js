import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";

import "./app.css";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

import PersonDetails from "../person-details";
import ItemList from "../item-list";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

	swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false,
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet,
            };
        });
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    onPersonSelected = (id) => {
      this.setState({
		selectedPlanet: id,
      });
  };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <div className="stardb-app">
                <Header />
                {planet}

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}
                >
                    Toggle Random Planet
                </button>

                <ErrorButton />

                <PeoplePage />

                {/* <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList 
							getData ={this.swapiService.getAllPlanets} 
							onItemSelected={this.onPersonSelected} 
							renderItem={({name, diameter, rotationPeriod}) => `${name} (${diameter}d - ${rotationPeriod}rp)`}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails/>
                        <ErrorButton />
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList 
							getData ={this.swapiService.getAllStarships} 
							onItemSelected={this.onPersonSelected} 
							renderItem={({name, manufacturer}) => `${name} - ${manufacturer}`}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails/>
                        <ErrorButton />
                    </div>
                </div> */}
            </div>
        );
    }
}
