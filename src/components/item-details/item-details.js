import React, { Component } from "react";

import "./item-details.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button";

export default class ItemDetails extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loaded: false,
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({ loaded: false });
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId).then((item) => {
            this.setState({ item, image: getImageUrl(item),loaded: true });
        });
    }

    render() {
        const {item, image, loaded} = this.state;

        if (!item) {
            return <span>Select a person from a list</span>;
        }

        if (!loaded) {
            return <Spinner />;
        }

        const { id, name, gender, birthYear, eyeColor } = item;

        return (
            <div className="person-details card">
                <img
                    className="person-image"
                    src={image}
                    alt="character"
                />

                <div className="card-body">
                    <h4>
                        {name} ({this.props.itemId})
                    </h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        );
    }
}
