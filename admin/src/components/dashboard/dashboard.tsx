import * as React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader
} from "@material-ui/core";

import OrderDetail from "./orderdetail";
import OrderList from "./orderlist";

import { dummyOrders } from "../../dummyData/orders";

export interface Printer {
  name: string;
}

export enum Status {
  Ordered = 0,
  Accepted,
  Printing,
  Done
}

export interface User {
  fullname: string;
  email?: string;
}

export interface Order {
  title?: string;
  invoiceId: string;
  date: Date;
  printer: Printer;
  cost?: number;
  status: Status;
  paid?: boolean;
  course?: string;
  type?: string;
  user: User;
  paymentMethod: string;
  description: string;
  files?: string[]; // make Files interface
}

interface Props {}

interface State {
  orders: Order[];
  selected?: number;
}

export default class Dashboard extends React.Component<Props, State> {
  state = {
    orders: dummyOrders,
    selected: 0
  };

  handleSelectRow = (row: number) => {
    this.setState(() => {
      return { selected: row };
    });
  };

  onStatusNext = () => {
    this.setState(prevState => {
      let newOrderState = prevState.orders;
      newOrderState[this.state.selected].status =
        newOrderState[this.state.selected].status + 1;

      return {
        orders: newOrderState
      };
    });
  };

  onStatusBack = () => {
    this.setState(prevState => {
      let newOrderState = prevState.orders;
      newOrderState[this.state.selected].status =
        newOrderState[this.state.selected].status - 1;

      return {
        orders: newOrderState
      };
    });
  };

  render() {
    const printerArray = this.state.orders
      .map(order => order.printer)
      .filter((el, i, a) => i === a.indexOf(el));

    return (
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ width: "100%", maxWidth: "1200px" }}>
          <Grid container direction="column" spacing={32}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="Digital Fabrication Lab Admin"
                  subheader="Orders"
                />
              </Card>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              spacing={32}
            >
              <Grid item xs={8}>
                <Grid container direction="column" spacing={16}>
                  {printerArray.map((printer, i) => {
                    const filteredOrders = this.state.orders.filter(order => {
                      return order.printer === printerArray[i];
                    });

                    return (
                      <Grid item key={printer.name}>
                        <OrderList
                          printer={printer.name}
                          orders={filteredOrders}
                          selected={this.state.selected}
                          onSelect={this.handleSelectRow}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {this.state.selected !== undefined ? (
                <Grid item xs={4}>
                  <OrderDetail
                    selected={this.state.orders[this.state.selected]}
                    activeStep={this.state.orders[this.state.selected].status}
                    onStatusNext={this.onStatusNext}
                    onStatusBack={this.onStatusBack}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
