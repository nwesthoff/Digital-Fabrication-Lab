import * as React from "react";
import { Grid, Button } from "@material-ui/core";

import OrderDetail from "./orderdetail";
import OrderList from "./orderlist";

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

const printers: Printer[] = [{ name: "Connex" }];

const dummyUsers: User[] = [
  { fullname: "Avelien Husen", email: "avelienhusen@gmail.com" },
  { fullname: "Nils Westhoff", email: "nils@nilswesthoff.com" },
  { fullname: "Annemar Marinissen", email: "annemar.24@gmail.com" }
];

const orders: Order[] = [
  {
    title: "Lekker printje",
    invoiceId: "CX0814",
    date: new Date(),
    printer: printers[0],
    cost: 417.04,
    status: Status.Done,
    paid: true,
    course: "3me - Biomaterials & Tissue Biomechanics",
    type: "PH",
    user: dummyUsers[0],
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: [""]
  },
  {
    title: "Lekker printje 2",
    invoiceId: "CX0815",
    date: new Date(),
    printer: printers[0],
    cost: 30.07,
    status: Status.Accepted,
    paid: true,
    course: "3me - Mechatronics system design",
    type: "PH",
    user: dummyUsers[1],
    paymentMethod: "RC4999 (baan)",
    description:
      "We ship a small reconciler config with a few additions for interaction. It does not know or care about THREE deeply, it uses heuristics to support attributes generically, so we can get away without creating a strong dependency. Hooks of course hold it all together. The aforementioned libs served as an inspiration.",
    files: [""]
  },
  {
    title: "Lekker printje 3",
    invoiceId: "CX0816",
    date: new Date(),
    printer: printers[0],
    cost: 63.0,
    status: Status.Printing,
    paid: false,
    course: "io - MDD",
    type: "MA",
    user: dummyUsers[2],
    paymentMethod: "RC4999 (baan)",
    description: "Wooooo",
    files: [""]
  }
];

interface Props {}

interface State {
  selected: Order;
}

export default class Dashboard extends React.Component<Props, State> {
  state = {
    orders: orders,
    selected: orders[0]
  };

  handleSelectRow = row => {
    this.setState(() => {
      return { selected: row };
    });
  };

  onStatusNext = () => {
    this.setState(prevState => {
      return {
        selected: {
          ...prevState.selected,
          status: prevState.selected.status + 1
        }
      };
    });
  };

  onStatusBack = () => {
    this.setState(prevState => {
      return {
        selected: {
          ...prevState.selected,
          status: prevState.selected.status - 1
        }
      };
    });
  };

  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ width: "100%", maxWidth: "1200px" }}>
          <Grid container direction="row" justify="center" spacing={16}>
            <Grid item md={8}>
              <OrderList
                orders={this.state.orders}
                selected={this.state.selected}
                onHover={this.handleSelectRow}
              />
            </Grid>
            <Grid item xs={4}>
              <OrderDetail
                selected={this.state.selected}
                activeStep={this.state.selected.status}
                onStatusNext={this.onStatusNext}
                onStatusBack={this.onStatusBack}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
