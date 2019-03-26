import React, { Component } from "react";
import { CardMedia } from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import dataStore from "stores/datastore";
import { fetchImage } from "api/firestore";
import createNotification from "components/notifications/createNotification";

@observer
export default class FeaturedImage extends Component {
  @observable
  featuredImageUrl = undefined;

  componentDidMount = () => {
    if (dataStore.selectedOrder.images[0]) {
      fetchImage(dataStore.selectedOrder.images[0].id)
        .then(res => {
          this.featuredImageUrl = res.url;
        })
        .catch(error => {
          createNotification("Error: " + error);
        });
    }
  };

  render() {
    return this.featuredImageUrl ? (
      <CardMedia style={{ height: "200px" }} image={this.featuredImageUrl} />
    ) : null;
  }
}
