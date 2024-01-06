
var request = require('./request'),
	serialize = require('./serializer'),
	extend = require('./ipputil').extend,
	parseurl = require('url').parse
	;

function Printer(url, opts){
	if(!(this instanceof Printer)) return new Printer(url, opts);
	opts = opts || {};
	this.url = typeof url==="string"? parseurl(url) : url;
	this.version = opts.version || '2.0';
	this.uri = opts.uri || 'ipp://' + this.url.host + this.url.path;
	this.charset = opts.charset || 'utf-8';
	this.language = opts.language || 'en-us';
}
Printer.prototype = {
	_message: function(operation, msg){
		if(typeof operation === "undefined") operation = 'Get-Printer-Attributes';

		var base = {
			version: this.version,
			operation: operation,
			id: null,//will get added by serializer if one isn't given
			'operation-attributes-tag': {
				//these are required to be in this order
				'attributes-charset': this.charset,
				'attributes-natural-language': this.language,
				'printer-uri': this.uri
			}
		};
		//these are required to be in this order
		if(msg && msg['operation-attributes-tag']['job-id'])
			base['operation-attributes-tag']['job-id'] = msg['operation-attributes-tag']['job-id'];
		//yes, this gets done in extend()- however, by doing this now, we define the position in the result object.
		else if(msg && msg['operation-attributes-tag']['job-uri'])
			base['operation-attributes-tag']['job-uri'] = msg['operation-attributes-tag']['job-uri'];

		msg = extend(base, msg);
		if(msg['operation-attributes-tag']['job-uri'])
			delete msg['operation-attributes-tag']['printer-uri'];
		return msg;
	},
	_execute: function(operation, msg, cb){
		msg = this._message(operation, msg);
		var buf = serialize(msg);
//		console.log(buf.toString('hex'));
//		console.log(JSON.stringify(
//			require('./parser')(buf), null, 2
//		));
		request(this.url, buf, cb);
	},
	executePrintJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executePrintJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executePrintURI: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeValidateJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeCreateJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeGetPrinterAttributes: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeGetJobs: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executePausePrinter: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeResumePrinter: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executePurgeJobs: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeSendDocument: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeSendURI: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeCancelJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeReleaseJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeGetJobAttributes: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeHoldJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
	executeRestartJob: function(operation, msg, cb) {
		this._execute(operation, msg, cb);
	},
}

module.exports = Printer;
