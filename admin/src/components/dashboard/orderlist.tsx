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
  FormControlLabel,
  CircularProgress
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import styled from "styled-components";
import { format } from "date-fns";
import { StatusInstance, PrinterInstance, Order } from "./dashboard";
import dataStore from "../../stores/datastore";
import { observer } from "mobx-react";
import { updateDoc, fetchFile } from "api/firestore";
import download from "downloadjs";

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
    updateDoc("Printers", this.props.printer.id, {
      online: this.props.printer.online
    });
  };

  handleDownloadFiles = async (order: Order) => {
    if (order && order.files && order.files.length > 0) {
      order.files.map(file => {
        download(file.fileUrl);
      });
    }
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
                  checked={this.props.printer.online}
                  color="primary"
                  onChange={() => {
                    this.handleOnlineChange();
                  }}
                  value="online"
                />
              }
              label={this.props.printer.online ? "online" : "offline"}
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
                .map(order => (
                  <TableRow
                    key={order.id}
                    onClick={() => this.handleSelectRow(order.id)}
                    selected={order.id === dataStore.selectedOrderId}
                  >
                    <TableCell>
                      {order.date && format(order.date.toDate(), "DD/MM/YY")}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="dense">
                      <StyledIcon paid={order.paid}>
                        <Grid container alignItems="center" wrap="nowrap">
                          <Grid item>
                            {order.paid ? (
                              <AttachMoneyIcon color="inherit" />
                            ) : (
                              <MoneyOffIcon color="inherit" />
                            )}
                          </Grid>
                          <Grid item>{order.invoice_no}</Grid>
                        </Grid>
                      </StyledIcon>
                    </TableCell>
                    <TableCell>{order.title}</TableCell>
                    <TableCell>
                      {order.status || order.status === 0
                        ? StatusInstance[order.status]
                        : "unknown"}
                    </TableCell>
                    <TableCell>
                      {order.files ? (
                        <Button
                          color="secondary"
                          onClick={() => {
                            this.handleDownloadFiles(order);
                          }}
                          target="_BLANK"
                        >
                          <CloudDownloadIcon style={{ marginRight: ".4rem" }} />{" "}
                          download
                        </Button>
                      ) : (
                        "No files"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
