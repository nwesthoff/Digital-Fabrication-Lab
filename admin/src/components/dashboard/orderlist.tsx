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
  Badge
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import styled from "styled-components";
import { format } from "date-fns";
import { Order, Status } from "./dashboard";

const StyledIcon = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.8rem;

  color: ${props => (props.paid ? "rgb(104, 159, 56)" : "rgb(211, 47, 47)")};
  background: ${props =>
    props.paid ? "rgb(220, 237, 200)" : "rgb(255, 230, 233)"};
`;

interface Props {
  orders: Order[];
  selected?: number;
  onSelect: Function;
  printer: string;
}

export default class OrderList extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader title={this.props.printer} />
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
            {this.props.orders.map((row, index) => (
              <TableRow
                key={row.invoiceId}
                onClick={() => this.props.onSelect(index)}
                selected={index === this.props.selected}
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
                <TableCell>{row.title}</TableCell>
                <TableCell>{Status[row.status]}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    href={`${row.files}`}
                    target="_BLANK"
                  >
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
