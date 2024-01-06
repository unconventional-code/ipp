var request = require("./request"),
  serialize = require("./serializer"),
  extend = require("./ipputil").extend,
  parseurl = require("url").parse;
const parse = require("./parser");

function Printer(url, opts) {
  if (!(this instanceof Printer)) return new Printer(url, opts);
  opts = opts || {};
  this.url = typeof url === "string" ? parseurl(url) : url;
  this.version = opts.version || "2.0";
  this.uri = opts.uri || "ipp://" + this.url.host + this.url.path;
  this.charset = opts.charset || "utf-8";
  this.language = opts.language || "en-us";
}
Printer.prototype = {
  _message: function (operation, msg) {
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
  },
  decodeMessage(buf) {
    return parse(buf);
  },
  encodeMessage: function (operation, msg) {
    msg = this._message(operation, msg);
    const buf = serialize(msg);
    // console.log(buf.toString('hex'));
    // console.log(JSON.stringify(
    // 	require('./parser')(buf), null, 2
    // ));
    return buf;
  },
  executePrintJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executePrintJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executePrintURI: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeValidateJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeCreateJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeGetPrinterAttributes: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeGetJobs: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executePausePrinter: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeResumePrinter: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executePurgeJobs: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeSendDocument: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeSendURI: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeCancelJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeReleaseJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeGetJobAttributes: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeHoldJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
  executeRestartJob: function (operation, msg) {
    return this.encodeMessage(operation, msg);
  },
};

module.exports = Printer;
