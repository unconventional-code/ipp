import ipp from "../ipp";

const printer = new ipp.Printer("http://192.168.1.2:631/ipp/print");
printer.executeGetJobs(
  "Get-Jobs",
  {
    "operation-attributes-tag": {
      "requesting-user-name": "Anybody",
      limit: 10,
      "requested-attributes": [
        "job-id",
        "job-uri",
        "job-state",
        "job-state-reasons",
        "job-originating-user-name",
        "job-media-sheets-completed",
      ],
      "which-jobs": "completed",
    },
  },
  function (err, res) {
    if (err) return console.log(err);
    console.log(res["job-attributes-tag"]);
  }
);
