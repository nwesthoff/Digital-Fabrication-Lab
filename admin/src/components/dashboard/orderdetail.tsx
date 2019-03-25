import * as React from "react";
import {
  Button,
  Card,
  CardMedia,
  CardActions,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  MobileStepper,
  CircularProgress
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import NotesIcon from "@material-ui/icons/Notes";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import styled from "styled-components";
import ClassIcon from "@material-ui/icons/Class";

import { StatusInstance } from "./dashboard";
import { observer } from "mobx-react";
import dataStore from "stores/datastore";
import { fetchImage, updateCollection } from "api/firestore";
import { observable } from "mobx";
import { userSessionStore } from "stores/userSessionStore";

const StyledCardContent = styled.div`
  padding: 1.2rem 0;
`;

const StyledList = styled(List)`
  background-color: #fafafa;
  && {
    padding: 0.4rem 0 0.4rem 0.4rem;
  }
`;

interface Props {
  activeStep?: StatusInstance;
  onStatusNext?: VoidFunction;
  onStatusBack?: VoidFunction;
}

@observer
export default class OrderDetail extends React.Component<Props> {
  @observable
  featuredImage = undefined;

  onStatusNext = () => {
    if (dataStore.selectedOrder && dataStore.selectedOrder.status >= 0) {
      dataStore.selectedOrder.status = dataStore.selectedOrder.status + 1;
    }
  };

  onStatusBack = () => {
    if (dataStore.selectedOrder && dataStore.selectedOrder.status >= 0) {
      dataStore.selectedOrder.status = dataStore.selectedOrder.status - 1;
    }
  };

  componentDidMount = () => {
    if (
      dataStore.selectedOrder.images &&
      dataStore.selectedOrder.images.length > 0
    ) {
      fetchImage(dataStore.selectedOrder.images[0].id).then(res => {
        this.featuredImage = res.url;
      });
    } else {
      this.featuredImage = undefined;
    }
  };

  render() {
    const orderBy =
      dataStore.selectedOrder && dataStore.selectedOrder.order_by
        ? dataStore.users.find(user => {
            return user.id === dataStore.selectedOrder.order_by.id;
          })
        : null;

    return (
      <Card>
        {dataStore.selectedOrder ? (
          <React.Fragment>
            {this.featuredImage ? (
              <CardMedia
                style={{ height: "200px" }}
                image={this.featuredImage}
              />
            ) : null}

            <StyledList disablePadding>
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{ variant: "h6" }}
                  primary={dataStore.selectedOrder.title}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>?</Avatar>
                </ListItemAvatar>
                <ListItemText primary={orderBy && orderBy.name} />
              </ListItem>
            </StyledList>
            <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              activeStep={dataStore.selectedOrder.status}
              nextButton={
                <Button
                  size="small"
                  onClick={this.onStatusNext}
                  disabled={dataStore.selectedOrder.status === 3}
                >
                  {StatusInstance[dataStore.selectedOrder.status + 1]}
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={this.onStatusBack}
                  disabled={dataStore.selectedOrder.status === 0}
                >
                  <KeyboardArrowLeft />
                  {StatusInstance[dataStore.selectedOrder.status - 1]}
                </Button>
              }
            />
            <StyledCardContent>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <NotesIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Description"
                    secondary={dataStore.selectedOrder.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupWorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Type"
                    secondary={dataStore.selectedOrder.type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment"
                    secondary={dataStore.selectedOrder.payment_method}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ClassIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Course/group"
                    secondary={dataStore.selectedOrder.course}
                  />
                </ListItem>
              </List>
            </StyledCardContent>
            <CardActions>
              {orderBy ? (
                <Button color="primary" href={`mailto:${orderBy.email}`}>
                  <EmailIcon style={{ marginRight: ".4rem" }} /> Send mail
                </Button>
              ) : null}
              {dataStore.selectedOrder && dataStore.selectedOrder.files ? (
                <Button
                  color="secondary"
                  href={`${dataStore.selectedOrder.files}`}
                  target="_BLANK"
                >
                  <CloudDownloadIcon style={{ marginRight: ".4rem" }} />{" "}
                  download
                </Button>
              ) : null}
            </CardActions>
          </React.Fragment>
        ) : (
          <CircularProgress />
        )}
      </Card>
    );
  }
}
