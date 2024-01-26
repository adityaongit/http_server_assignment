const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// GET requests to "/data"
app.get("/data", (req, res) => {
    const n = req.query.n;
    const m = req.query.m;

    // Check if the 'n' exists
    if (n) {
        const filePath = path.join(__dirname, "tmp", "data", `${n}.txt`);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.status(404).send("File not found");
            } else {

                // Check if the 'm' exists
                if (m) {

                    // Parse 'm' as a number
                    const lineNumber = Number(m);

                    if (isNaN(lineNumber) || lineNumber < 1) {
                        res.status(400).send("Invalid line number");
                    } else {

                        // If 'm' is a valid number
                        let lineCount = 0;
                        let lineContent = "";

                        // Create a read stream to read the file
                        const readStream = fs.createReadStream(filePath, {
                            encoding: "utf8",
                        });

                        // Event handler for when data is read from the file
                        readStream.on("data", (chunk) => {
                            // Split the chunk into lines
                            const lines = chunk.split("\n");

                            for (let line of lines) {
                                lineCount++;

                                if (lineCount === lineNumber) {
                                    lineContent = line;

                                    // Close the stream to stop reading
                                    readStream.destroy();
                                    break;
                                }
                            }
                        });

                        // Event handler for when the read stream is closed
                        readStream.on("close", () => {
                            if (lineContent === "") {
                                res.status(404).send("Line not found");
                            } else {
                                // If the desired line is found, send the line content
                                res.status(200).send(lineContent);
                                console.log(`File read completed for ${filePath}`);
                            }
                        });

                        // Event handler for any errors during the file read
                        readStream.on("error", (err) => {
                            console.error(err);
                            res.status(500).send("Server error");
                        });
                    }
                } else {
                    // Send the file as a response
                    res.status(200).sendFile(filePath, (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send("Server error");
                        } else {
                            console.log(`File read completed for ${filePath}`);
                        }
                    });
                }
            }
        });
    } else {
        // If 'n' is not provided, send a 400 Bad Request response
        res.status(400).send("Missing file name");
    }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
