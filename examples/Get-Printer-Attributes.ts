import ipp from "../ipp";
var id = 0x0123; //made up reqid

const printer = new ipp.Printer("http://192.168.1.2:631/ipp/print");
printer.executeGetPrinterAttributes(
  "Get-Printer-Attributes",
  {
    "operation-attributes-tag": {
      "requesting-user-name": "Anybody",
    },
  },
  function (err, res) {
    console.log(res);
  }
);
