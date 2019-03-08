import * as React from "react";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody
} from "@material-ui/core";
import { format } from "date-fns";

const rows = [
  {
    invoiceId: "CX89",
    date: new Date(),
    name: "Connex",
    cost: "",
    status: "Done",
    paid: true,
    course: "3me"
  }
];

export default class Dashboard extends React.Component {
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order No.</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Paid</TableCell>
                  <TableCell align="right">Course/Group</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Contact</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.invoiceId}>
                    <TableCell component="th" scope="row">
                      {row.invoiceId}
                    </TableCell>
                    <TableCell align="right">
                      {format(row.date, "DD/MM/YY")}
                    </TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.paid.toString()}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
