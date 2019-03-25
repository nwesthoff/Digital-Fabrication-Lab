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
  Button,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import styled from "styled-components";
import { format } from "date-fns";
import { StatusInstance, PrinterInstance, Order } from "./dashboard";
import dataStore from "../../stores/datastore";
import { observer } from "mobx-react";

const StyledIcon = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.8rem;

  color: ${props => (props.paid ? "rgb(104, 159, 56)" : "rgb(211, 47, 47)")};
  background: ${props =>
    props.paid ? "rgb(220, 237, 200)" : "rgb(255, 230, 233)"};
`;

interface Props {
  printer: PrinterInstance;
  orders: Order[];
}

@observer
export default class OrderList extends React.Component<Props> {
  handleSelectRow = (row: string) => {
    dataStore.selectedOrderId = row;
  };

  handleOnlineChange = () => {
    this.props.printer.online = !this.props.printer.online;
  };

  render() {
    return (
      <Card>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title={this.props.printer.name} />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    dataStore.printers.find(printer => {
                      return printer === this.props.printer;
                    }).online
                  }
                  color="default"
                  onChange={() => {
                    this.handleOnlineChange();
                  }}
                  value="online"
                />
              }
              label="online"
            />
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Order #</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataStore.orders.length > 0 &&
              dataStore.orders
                .filter(order => {
                  return (
                    order.printer && order.printer.id === this.props.printer.id
                  );
                })
                .map(row => (
                  <TableRow
                    key={row.id}
                    onClick={() => this.handleSelectRow(row.id)}
                    selected={row.id === dataStore.selectedOrderId}
                  >
                    <TableCell>
                      {row.date && format(row.date.toDate(), "DD/MM/YY")}
                    </TableCell>
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
                          <Grid item>{row.invoice_no}</Grid>
                        </Grid>
                      </StyledIcon>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{StatusInstance[row.status]}</TableCell>
                    <TableCell>
                      {/* {row.files && ( */}
                      <Button
                        color="secondary"
                        href={`${row.files}`}
                        target="_BLANK"
                      >
                        <CloudDownloadIcon style={{ marginRight: ".4rem" }} />{" "}
                        download
                      </Button>
                      {/* )} */}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
