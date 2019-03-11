import * as React from "react";
import {
  Button,
  CardContent,
  Card,
  CardMedia,
  CardActions,
  ListItem,
  ListItemText,
  List,
  MobileStepper,
  Typography,
  ListItemIcon
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import NotesIcon from "@material-ui/icons/Notes";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import styled from "styled-components";
import ClassIcon from "@material-ui/icons/Class";

import { Order, Status } from "./dashboard";
import dummyImage from "../../assets/dummy/dummy1.jpg";

const StyledTitle = styled(Typography)`
  padding-left: 1rem;
`;

interface Props {
  selected: Order;
  activeStep: Status;
  onStatusNext?: VoidFunction;
  onStatusBack?: VoidFunction;
}

export default class OrderDetail extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardMedia style={{ height: "200px" }} image={dummyImage} />
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
              {Status[this.props.selected.status + 1]}
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
              {Status[this.props.selected.status - 1]}
            </Button>
          }
        />
        <CardContent>
          <StyledTitle variant="h5">{this.props.selected.title}</StyledTitle>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText
                primary="Description"
                secondary={this.props.selected.description}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Request by"
                secondary={this.props.selected.user.fullname}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GroupWorkIcon />
              </ListItemIcon>
              <ListItemText
                primary="Type"
                secondary={this.props.selected.type}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText
                primary="Payment"
                secondary={this.props.selected.paymentMethod}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText
                primary="Course/group"
                secondary={this.props.selected.course}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            href={`mailto:${this.props.selected.user.email}`}
          >
            <EmailIcon style={{ marginRight: ".4rem" }} /> Send mail
          </Button>
          <Button
            color="secondary"
            href={`${this.props.selected.files}`}
            target="_BLANK"
          >
            <CloudDownloadIcon style={{ marginRight: ".4rem" }} /> download
          </Button>
        </CardActions>
      </Card>
    );
  }
}
