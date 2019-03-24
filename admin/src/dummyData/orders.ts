import { Order } from "../components/dashboard/dashboard";
import { dummyPrinters } from "../dummyData/printers";
import { dummyUsers } from "../dummyData/users";

export enum Status {
  Ordered = 0,
  Accepted,
  Printing,
  Done
}

export const dummyOrders: Order[] = [
  {
    title: "Lekker printje",
    invoice_no: "CX0814",
    date: new Date(),
    printer: dummyPrinters[0],
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
    invoice_no: "CX0815",
    date: new Date(),
    printer: dummyPrinters[0],
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
    invoice_no: "CX0816",
    date: new Date(),
    printer: dummyPrinters[0],
    cost: 63.0,
    status: Status.Printing,
    paid: false,
    course: "io - MDD",
    type: "MA",
    user: dummyUsers[2],
    paymentMethod: "RC4999 (baan)",
    description: "Wooooo",
    files: [""]
  },
  {
    title: "Lekker printje",
    invoice_no: "UM0017",
    date: new Date(),
    printer: dummyPrinters[2],
    cost: 417.04,
    status: Status.Ordered,
    paid: false,
    course: "3me - Biomaterials & Tissue Biomechanics",
    type: "PH",
    user: dummyUsers[0],
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: [""]
  },
  {
    title: "Lekker printje",
    invoice_no: "UM0018",
    date: new Date(),
    printer: dummyPrinters[2],
    cost: 417.04,
    status: Status.Printing,
    paid: true,
    course: "3me - Biomaterials & Tissue Biomechanics",
    type: "PH",
    user: dummyUsers[0],
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: [""]
  },
  {
    title: "Lekker printje",
    invoice_no: "FL0119",
    date: new Date(),
    printer: dummyPrinters[1],
    cost: 417.04,
    status: Status.Accepted,
    paid: false,
    course: "3me - Biomaterials & Tissue Biomechanics",
    type: "PH",
    user: dummyUsers[0],
    paymentMethod: "RC4999 (baan)",
    description: "Stanford Bunny Test",
    files: [""]
  }
];
