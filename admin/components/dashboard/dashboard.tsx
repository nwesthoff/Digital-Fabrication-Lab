import * as React from "react";
import {
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Card,
  CardHeader
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { format } from "date-fns";
import styled from "styled-components";
import OrderDetail from "./orderdetail";

const StyledIcon = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.8rem;

  color: ${props => (props.paid ? "rgb(104, 159, 56)" : "rgb(211, 47, 47)")};
  background: ${props =>
    props.paid ? "rgb(220, 237, 200)" : "rgb(255, 230, 233)"};
`;

export interface User {
  fullname: string;
  email?: string;
}

export interface Order {
  title?: string;
  invoiceId: string;
  date: Date;
  printer: string;
  cost?: number;
  status: string;
  paid?: boolean;
  course?: string;
  type?: string;
  user: User; // make User interface
  paymentMethod: string;
  description: string;
  files?: string[]; // make Files interface
}

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
    printer: "Connex",
    cost: 417.04,
    status: "Done",
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
    printer: "Connex",
    cost: 30.07,
    status: "Done",
    paid: true,
    course: "3me - Mechatronics system design",
    type: "PH",
    user: dummyUsers[1],
    paymentMethod: "RC4999 (baan)",
    description: "Boaty Test",
    files: [""]
  },
  {
    title: "Lekker printje 3",
    invoiceId: "CX0816",
    date: new Date(),
    printer: "Connex",
    cost: 63.0,
    status: "Done",
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
  constructor(props) {
    super(props);

    this.state = {
      selected: orders[0]
    };
  }

  onHover = row => {
    this.setState(() => {
      return { selected: row };
    });
  };

  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Grid
            style={{ maxWidth: "1500px" }}
            container
            direction="row"
            wrap="nowrap"
            justify="center"
            alignItems="flex-start"
            spacing={16}
          >
            <Grid item md={8}>
              <Card>
                <CardHeader title="Connex Orders" subheader="orders" />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Order No. (paid)</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Files</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map(row => (
                      <TableRow
                        key={row.invoiceId}
                        onMouseEnter={() => this.onHover(row)}
                      >
                        <TableCell>{format(row.date, "DD/MM/YY")}</TableCell>
                        <TableCell component="th" scope="row">
                          <StyledIcon paid={row.paid}>
                            <Grid container alignItems="center" wrap="nowrap">
                              <Grid item>
                                {row.paid ? (
                                  <AttachMoneyIcon color="inherit" />
                                ) : (
                                  <MoneyOffIcon color="inherit" />
                                )}
                              </Grid>
                              <Grid item>{row.invoiceId}</Grid>
                            </Grid>
                          </StyledIcon>
                        </TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          <Button color="secondary" href={`${row.files}`}>
                            <CloudDownloadIcon
                              style={{ marginRight: ".4rem" }}
                            />{" "}
                            download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
            <Grid item md={4}>
              <OrderDetail selected={this.state.selected} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
