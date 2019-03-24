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
import dummyImage from "../../assets/dummy/dummy1.jpg";
import { observer } from "mobx-react";
import dataStore from "stores/datastore";

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
  // onStatusNext = () => {
  //   this.setState(prevState => {
  //     let newOrderState = prevState.orders;
  //     newOrderState[this.selected].status =
  //       newOrderState[this.selected].status + 1;

  //     return {
  //       orders: newOrderState
  //     };
  //   });
  // };

  // onStatusBack = () => {
  //   this.setState(prevState => {
  //     let newOrderState = prevState.orders;
  //     newOrderState[this.selected].status =
  //       newOrderState[this.selected].status - 1;

  //     return {
  //       orders: newOrderState
  //     };
  //   });
  // };
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
            <CardMedia style={{ height: "200px" }} image={dummyImage} />
            <StyledList disablePadding>
              <ListItem>
                <ListItemText primary={dataStore.selectedOrder.title} />
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
              activeStep={this.props.activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={this.props.onStatusNext}
                  disabled={this.props.activeStep === 3}
                >
                  {StatusInstance[dataStore.selectedOrder.status + 1]}
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={this.props.onStatusBack}
                  disabled={this.props.activeStep === 0}
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
