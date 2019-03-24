import { observable, action, computed } from "mobx";
import {
  PrinterInstance,
  Order,
  UserInstance
} from "../components/dashboard/dashboard";
import { fetchCollection } from "api/firestore";

export class DataStore {
  @observable
  printers: PrinterInstance[] = [];
  @observable
  orders: Order[] = [];
  @observable
  users: UserInstance[] = [];

  @observable
  selectedOrderId?: string;

  @computed get selectedOrder() {
    return this.orders.find(order => {
      return order.id === this.selectedOrderId;
    });
  }

  @action
  fetchData() {
    fetchCollection("Printers").then(res => {
      this.printers = res;
    });

    fetchCollection("Orders").then(res => {
      this.orders = res;
    });

    fetchCollection("users").then(res => {
      this.users = res;
    });
  }
}

const dataStore = new DataStore();

export default dataStore;
