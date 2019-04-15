import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { observer } from "mobx-react";

import OrderList from "./orderlist";

import { observable } from "mobx";
import dataStore from "stores/datastore";
import OrderDetail from "./orderdetail";

export interface PrinterInstance {
  name: string;
  brand: string;
  id: string;
  online?: boolean;
}

export enum StatusInstance {
  ordered,
  accepted,
  printing,
  done
}

export interface UserInstance {
  id: string;
  name?: string;
  email?: string;
}

export interface Order {
  id: string;
  title?: string;
  user?: UserInstance;
  invoice_no?: string;
  date?: Date;
  printer?: PrinterInstance;
  cost?: number;
  status?: StatusInstance;
  paid?: boolean;
  course?: string;
  type?: string;
  order_by?: string;
  payment_method: string;
  description: string;
  files?: FileInstance[]; // make Files interface
  images: OrderImage[];
}

export interface FileInstance {
  id: string;
  fileName: string;
  fileUrl: string;
}

export interface OrderImage {
  id: string;
  url?: string;
}

interface Props {
  path?: String;
}

interface State {
  selected?: number;
}

@observer
export default class Dashboard extends React.Component<Props, State> {
  @observable
  selected?: string = dataStore.selectedOrderId;

  componentDidMount = () => {
    dataStore.fetchData();
  };

  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ width: "100%", maxWidth: "1200px" }}>
          <Grid container direction="column" spacing={32}>
            <Grid item xs={12} style={{ paddingTop: "3rem" }}>
              <Typography variant="h3">Orders</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={16}
              >
                <Grid item xs={12} lg={8}>
                  <Grid container direction="column" spacing={16}>
                    {dataStore.printers &&
                      dataStore.printers.map(printer => {
                        return (
                          <Grid item key={printer.name}>
                            <OrderList
                              printer={printer}
                              orders={dataStore.orders}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
                {dataStore.selectedOrderId ? (
                  <Grid item xs={12} sm={6} lg={4}>
                    <OrderDetail />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
