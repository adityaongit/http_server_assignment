# HTTP Server Optimization - Final Submission

This repository showcases the implementation of a highly optimized HTTP server, designed to meet the specific requirements outlined by Headout. The server is written in Javascript + (Node.js & Express.js), and the entire application is bundled into a Docker image named `Dockerfile`.

## Key Features

## Repository Structure

```
|-- app.js             # Source code for the HTTP server
|-- tmp/               # Placeholder for data files
    |-- data/
        |-- 1.txt      # Testing File 1
        |-- 2.txt      # 100 MB Testing File 2
|-- Dockerfile         # Dockerfile for bundling the application
|-- README.md          # Project README file
```

## Instructions for Review

1. Clone the repository.
2. Navigate to the root directory.
3. Review the source code in the `app.js` file for the HTTP server implementation.
4. Examine the `Dockerfile` for Docker image configuration.

### HTTP Server

- Implements a robust HTTP server responding to GET requests on the `/data` endpoint.
- Supports query parameters:
  - `n`: File name
  - `m`: Line number
- Adheres to the following rules:
  - If both `n` and `m` are provided, it returns the content of the file `/tmp/data/n.txt` at line number `m`.
  - If only `n` is provided, it returns the entire content of the file `/tmp/data/n.txt`.

### File Structure

- Efficiently handles files of approximately 100MB in size.
- More than 30 different files, ranging from 1.txt to n.txt.

### Docker Image

- The server is bundled into a Docker image named `Dockerfile`.
- The Dockerfile is compatible with both ARM architecture and x86.
- Exposes port 8080.
- Configured to allocate a maximum of 1500 MB RAM and 2000m/2 Core CPU for the Docker container.

