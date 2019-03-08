import * as React from "react";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Button
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { format } from "date-fns";
import styled from "styled-components";

const StyledIcon = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.8rem;

  color: ${props => (props.paid ? "rgb(104, 159, 56)" : "rgb(211, 47, 47)")};
  background: ${props =>
    props.paid ? "rgb(220, 237, 200)" : "rgb(255, 230, 233)"};
`;

const rows = [
  {
    invoiceId: "CX89",
    date: new Date(),
    name: "Connex",
    cost: "0.00",
    status: "Done",
    paid: true,
    course: "3me",
    type: "NM",
    user: "Nils Westhoff",
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: "",
    email: "nils@nilswesthoff.com"
  },
  {
    invoiceId: "CX90",
    date: new Date(),
    name: "Connex",
    cost: "0.00",
    status: "Done",
    paid: true,
    course: "3me",
    type: "NM",
    user: "Nils Westhoff",
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: "",
    email: "nils@nilswesthoff.com"
  },
  {
    invoiceId: "CX91",
    date: new Date(),
    name: "Connex",
    cost: "0.00",
    status: "Done",
    paid: false,
    course: "3me",
    type: "NM",
    user: "Nils Westhoff",
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: "",
    email: "nils@nilswesthoff.com"
  }
];

export default class Dashboard extends React.Component {
  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Paper>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h5" component="h1">
                  Connex Orders
                </Typography>
              </Grid>
              <Grid item>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order No.</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Course/Group</TableCell>
                      {/* <TableCell >Type</TableCell> */}
                      <TableCell>user</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Files</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.invoiceId}>
                        <TableCell component="th" scope="row">
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={16}
                          >
                            <Grid item>{row.invoiceId}</Grid>
                            <Grid item>
                              <StyledIcon paid={row.paid}>
                                <AttachMoneyIcon color="inherit" />
                              </StyledIcon>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>{format(row.date, "DD/MM/YY")}</TableCell>
                        <TableCell>€{row.cost}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.course}</TableCell>
                        {/* <TableCell>{row.type}</TableCell> */}
                        <TableCell>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={16}
                          >
                            <Grid item>{row.user}</Grid>
                            <Grid item>
                              <Button
                                color="primary"
                                href={`mailto:${row.email}`}
                              >
                                <EmailIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>{row.paymentMethod}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          <Button color="secondary" href={`${row.files}`}>
                            <CloudDownloadIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
