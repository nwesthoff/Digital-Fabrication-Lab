import * as React from "react";
import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Button
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import styled from "styled-components";
import { format } from "date-fns";
import { Order } from "./dashboard";

const StyledIcon = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.8rem;

  color: ${props => (props.paid ? "rgb(104, 159, 56)" : "rgb(211, 47, 47)")};
  background: ${props =>
    props.paid ? "rgb(220, 237, 200)" : "rgb(255, 230, 233)"};
`;

interface Props {
  orders: Order[];
  selected: Order;
  onHover: Function;
}

export default class OrderList extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader title="Connex Orders" />
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
            {this.props.orders.map(row => (
              <TableRow
                key={row.invoiceId}
                onMouseEnter={() => this.props.onHover(row)}
                selected={row.invoiceId === this.props.selected.invoiceId}
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
                    <CloudDownloadIcon style={{ marginRight: ".4rem" }} />{" "}
                    download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
