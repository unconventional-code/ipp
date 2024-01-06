import ipp from '../ipp'
const printer = new ipp.Printer("https://cp02.local.:631/ipp/printer");
function go() {
  printer.execute("Get-Job-Attributes", {
		"operation-attributes-tag": {
			"job-uri": "ipp://CP01.local/ipp/printer/0186",
		},
	}, function (err, res) {
    console.log(res);
    setTimeout(go, 0);
  });
}
go();
