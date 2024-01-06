// @ts-nocheck
import serialize from "./serializer";
import { extend } from "./ipputil";
import parse from "./parser";
import {
  CancelReleaseJobRequest,
  CreateJobRequest,
  GetJobAttributesRequest,
  GetJobAttributesResponse,
  GetJobsRequest,
  GetJobsResponse,
  GetPrinterAttributesRequest,
  GetPrinterAttributesResponse,
  HoldRestartJobRequest,
  IPPVersion,
  PrintJobRequest,
  PrintJobResponse,
  PrintURIRequest,
  PrinterOptions,
  SendDocumentRequest,
  SendDocumentResponse,
  SendURIRequest,
  SimpleRequest,
  SimpleResponse,
  ValidateJobRequest,
} from "../types";

// export function parse(buf: Buffer): ParsedBuffer;
// export function serialize(msg: object): Buffer;
// export const attributes: object;
// export const attribute: object;
// export const keywords: object;
// export const versions: object;
// export const enums: object;
// export const tags: object;
// export const operations: object;
// export const statusCodes: object;

export default class Printer {
  url: string;
  uri: string;
  // TODO: find a valid type
  charset: string;
  version: IPPVersion;
  // TODO: Find a valid type
  language: string;

  constructor(url: string, options: PrinterOptions = {}) {
    this.url = url;
    this.version = options.version || "2.0";
    this.uri = options.uri || url;
    // this.uri = options.uri || "ipp://" + this.url.host + this.url.path;
    this.charset = options.charset || "utf-8";
    this.language = options.language || "en-us";
  }
  _message(operation, msg) {
    if (typeof operation === "undefined") operation = "Get-Printer-Attributes";

    var base = {
      version: this.version,
      operation: operation,
      id: null, //will get added by serializer if one isn't given
      "operation-attributes-tag": {
        //these are required to be in this order
        "attributes-charset": this.charset,
        "attributes-natural-language": this.language,
        "printer-uri": this.uri,
      },
    };
    //these are required to be in this order
    if (msg && msg["operation-attributes-tag"]["job-id"])
      base["operation-attributes-tag"]["job-id"] =
        msg["operation-attributes-tag"]["job-id"];
    //yes, this gets done in extend()- however, by doing this now, we define the position in the result object.
    else if (msg && msg["operation-attributes-tag"]["job-uri"])
      base["operation-attributes-tag"]["job-uri"] =
        msg["operation-attributes-tag"]["job-uri"];

    msg = extend(base, msg);
    if (msg["operation-attributes-tag"]["job-uri"])
      delete msg["operation-attributes-tag"]["printer-uri"];
    return msg;
  }
  decodeMessage(buf) {
    return parse(buf);
  }
  encodeMessage(operation, msg) {
    msg = this._message(operation, msg);
    const buf = serialize(msg);
    // console.log(buf.toString('hex'));
    // console.log(JSON.stringify(
    // 	require('./parser')(buf), null, 2
    // ));
    return buf;
  }
  executePrintJob(
    operation: "Print-Job",
    message: PrintJobRequest,
    callback?: (error: Error, response: PrintJobResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executePrintURI(
    operation: "Print-URI",
    message: PrintURIRequest,
    callback?: (error: Error, response: PrintJobResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeValidateJob(
    operation: "Validate-Job",
    message: ValidateJobRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeCreateJob(
    operation: "Create-Job",
    message: CreateJobRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeGetPrinterAttributes(
    operation: "Get-Printer-Attributes",
    message: GetPrinterAttributesRequest,
    callback?: (error: Error, response: GetPrinterAttributesResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeGetJobs(
    operation: "Get-Jobs",
    message: GetJobsRequest,
    callback?: (error: Error, response: GetJobsResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executePausePrinter(
    operation: "Pause-Printer",
    message: SimpleRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeResumePrinter(
    operation: "Resume-Printer",
    message: SimpleRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executePurgeJobs(
    operation: "Purge-Jobs",
    message: SimpleRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeSendDocument(
    operation: "Send-Document",
    message: SendDocumentRequest,
    callback?: (error: Error, response: SendDocumentResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeSendURI(
    operation: "Send-URI",
    message: SendURIRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeCancelJob(
    operation: "Cancel-Job",
    message: CancelReleaseJobRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeReleaseJob(
    operation: "Release-Job",
    message: CancelReleaseJobRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeGetJobAttributes(
    operation: "Get-Job-Attributes",
    message: GetJobAttributesRequest,
    callback?: (error: Error, response: GetJobAttributesResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeHoldJob(
    operation: "Restart-Job",
    message: HoldRestartJobRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
  executeRestartJob(
    operation: "Restart-Job",
    message: HoldRestartJobRequest,
    callback?: (error: Error, response: SimpleResponse) => void
  ) {
    return this.encodeMessage(operation, message);
  }
}
