import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  MobileStepper,
  CircularProgress,
  ListItemSecondaryAction,
  Checkbox
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
import download from "downloadjs";

import { StatusInstance } from "./dashboard";
import { observer } from "mobx-react";
import dataStore from "stores/datastore";
import { updateDoc } from "api/firestore";
import FeaturedImage from "./featuredImage";

import GravatarImg from "components/dashboard/GravatarImg";

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
  onStatusNext = () => {
    if (dataStore.selectedOrder && dataStore.selectedOrder.status >= 0) {
      dataStore.selectedOrder.status = dataStore.selectedOrder.status + 1;

      updateDoc("Orders", dataStore.selectedOrder.id, {
        status: dataStore.selectedOrder.status
      });
    }
  };

  onStatusBack = () => {
    if (dataStore.selectedOrder && dataStore.selectedOrder.status >= 0) {
      dataStore.selectedOrder.status = dataStore.selectedOrder.status - 1;
    }

    updateDoc("Orders", dataStore.selectedOrder.id, {
      status: dataStore.selectedOrder.status
    });
  };

  handlePaidClick = () => {
    dataStore.selectedOrder.paid = !dataStore.selectedOrder.paid;

    updateDoc("Orders", dataStore.selectedOrder.id, {
      paid: dataStore.selectedOrder.paid
    });
  };

  handleDownloadFiles = async () => {
    if (
      dataStore &&
      dataStore.selectedOrder &&
      dataStore.selectedOrder.files &&
      dataStore.selectedOrder.files.length > 0
    ) {
      dataStore.selectedOrder.files.map(file => {
        download(file.fileUrl);
      });
    }
  };

  render() {
    return (
      <Card>
        {dataStore.selectedOrder ? (
          <React.Fragment>
            {dataStore.selectedOrder.images &&
            dataStore.selectedOrder.images.length > 0 ? (
              <FeaturedImage />
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
                  {dataStore.selectedOrder.user &&
                  dataStore.selectedOrder.user.email ? (
                    <GravatarImg email={dataStore.selectedOrder.user.email} />
                  ) : (
                    <Avatar>?</Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    dataStore.selectedOrder.user &&
                    dataStore.selectedOrder.user.name
                  }
                />
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
                <ListItem button onClick={this.handlePaidClick}>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment (paid)"
                    secondary={dataStore.selectedOrder.payment_method}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      checked={dataStore.selectedOrder.paid}
                      onClick={this.handlePaidClick}
                    />
                  </ListItemSecondaryAction>
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
              {dataStore.selectedOrder.user &&
              dataStore.selectedOrder.user.email ? (
                <Button
                  color="primary"
                  href={`mailto:${dataStore.selectedOrder.user.email}`}
                >
                  <EmailIcon style={{ marginRight: ".4rem" }} /> Send mail
                </Button>
              ) : null}

              {dataStore.selectedOrder && dataStore.selectedOrder.files ? (
                <Button color="secondary" onClick={this.handleDownloadFiles}>
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
