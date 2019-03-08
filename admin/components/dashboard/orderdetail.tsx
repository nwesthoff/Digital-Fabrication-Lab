import * as React from "react";
import {
  Grid,
  Typography,
  Button,
  CardHeader,
  CardContent,
  Card
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import { Order } from "./dashboard";

interface Props {
  selected: Order;
}

export default class OrderDetail extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.selected.title}
          subheader={this.props.selected.user.fullname}
        />
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={16}
            wrap="nowrap"
          >
            <Grid item>
              <Button
                color="primary"
                href={`mailto:${this.props.selected.user.email}`}
              >
                <EmailIcon />
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1">
            Type: {this.props.selected.type}
          </Typography>
          <Typography variant="body1">
            Payment: {this.props.selected.paymentMethod}
          </Typography>
          <Typography variant="body1">
            Course/Group: {this.props.selected.course}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
