// @ts-nocheck

import axios from "axios";
import fs from "fs";
import Printer from "../lib/printer";
import ippEncoder from "ipp-encoder";

const url = "https://192.168.1.2:631/ipp/print";
const printer = new Printer(url);

// @ts-ignore
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const filedata = fs.readFileSync(
  "/Users/blur/Desktop/unconventional-code/ipp/examples/image.jpg"
);

const buffer = printer.executePrintJob("Print-Job", {
  "operation-attributes-tag": {
    "requesting-user-name": "Bumblebee",
    "job-name": "whatever.pdf",
    "document-format": "application/octet-stream",
  },
  "job-attributes-tag": {
    // "media-col": {
    //   "media-source": "tray-2",
    // },
  },
  data: filedata,
});

async function main() {
  const res = await axios.post(url, buffer, {
    headers: {
      "Content-Type": "application/ipp",
      "Content-Type": buffer.length,
    },
    responseType: "arraybuffer",
  });

  console.log(createdJobResponse.data);
  const resData = printer.decodeMessage(Buffer.from(res.data));

  // console.log(JSON.stringify(ippEncoder.request.decode(Buffer.from(createdJobResponse.data)), null, 2))
  console.log(JSON.stringify(resData, null, 2));
  console.log(createdJobResponse.error);

  // const createdJobResponse = await axios.post(
  //   url,
  //   printer.executeCreateJob(
  //     "Create-Job",
  //     {
  //       "operation-attributes-tag": {
  //         "requesting-user-name": "JJ Doe",
  //       },
  //       "job-attributes-tag": {
  //         media: "na_letter_8.5x11in",
  //       },
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/ipp",
  //         // 'Content-Type': buffer.length,
  //       },
  //       responseType: "arraybuffer",
  //     }
  //   )
  // );

  // console.log(createdJobResponse.data);
  // const resData = printer.decodeMessage(Buffer.from(createdJobResponse.data));

  // // console.log(JSON.stringify(ippEncoder.request.decode(Buffer.from(createdJobResponse.data)), null, 2))
  // console.log(JSON.stringify(resData, null, 2));
  // console.log(createdJobResponse.error);

  // const buffer = printer.executeSendDocument("Send-Document", {
  //   "operation-attributes-tag": {
  //     "job-id": resData["job-attributes-tag"]["job-id"],
  //     "requesting-user-name": "John Doe",
  //     "document-format": "image/jpeg",
  //     "last-document": true,
  //   },
  //   data: filedata,
  // });

  // const sendDocumentResponse = await axios.post(url, buffer, {
  //   headers: {
  //     "Content-Type": "application/ipp",
  //     "Content-Type": buffer.length,
  //   },
  //   responseType: "arraybuffer",
  // });
  // const sendData = printer.decodeMessage(
  //   Buffer.from(sendDocumentResponse.data)
  // );
  // console.log(sendData);
  // // console.log(sendDocumentResponse.data)
  // console.log(sendDocumentResponse.error);
}
main().catch((err) => {
  console.log(err);
});
