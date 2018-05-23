
process.setMaxListeners(0);
require("source-map-support/register");
var Logger = require("../");
var assert = require("assert");
var fs = require("fs");
var date = require("sfn-date");
var idealFilename = require("ideal-filename");

describe("Compress when file size out limit", function () {
    it("should compress log file as expected", function (done) {
        this.timeout(6000);

        var filename = "logs/example-will-be-compressed.log",
            compressDir = "logs/" + date("Y-m-d"),
            compressFile = compressDir + "/example-will-be-compressed.log.gz",
            log = "Everything goes fine!";

        if (fs.existsSync(filename))
            fs.unlinkSync(filename);

        idealFilename(compressFile, ".log.gz", function (err, _filename) {
            var logger = new Logger({
                filename,
                size: 512,
                fileSize: 4096
            });
    
            for (var i = 0; i < 200; i++) {
                logger.log(log + " - " + (i + 1));
            }
    
            setTimeout(function () {
                assert.ok(fs.existsSync(_filename));
                done();
                // logger.close();
            }, 1500);
        });
    });
});