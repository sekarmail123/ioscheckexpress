const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');

const app = express();
const port = process.env.PORT || 3000;

// Serve the video with Content-Disposition header
app.get('/video', (req, res) => {
    const videoPath = path.join(__dirname, '../public', 'video.mp4'); // Adjust the path to point to the video
    const videoName = 'video.mp4'; // The name for the video file

    // Set the headers for Content-Disposition as inline
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `inline; filename="${videoName}"`);

    // Stream the video file
    res.sendFile(videoPath);
});


// Route to serve the video file with Content-Disposition header
app.get('/videoinline', (req, res) => {
    const videoPath = path.join(__dirname, '../public', 'videos/HOSETestDrive.mp4'); // Path to your video file
    const videoName = 'video.mp4'; // The name for the video file

    // Set the headers for Content-Disposition as inline
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `inline; filename="${videoName}"`);

    // Stream the video file
    res.sendFile(videoPath);
});

app.get('/videoattachment', (req, res) => {
    const videoPath = path.join(__dirname, '../public', 'videos/HOSETestDrive.mp4'); // Path to your video file
    const videoName = 'video.mp4'; // The name for the video file

    // Set the headers for Content-Disposition as inline
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${videoName}"`);

    // Stream the video file
    res.sendFile(videoPath);
});

// Root route
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body>
            <h1>Content-Disposition inline || Video Example</h1>
            <video width="600" controls>
                <source src="/videoinline" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <h1>Content-Disposition attachment || Video Example</h1>
            <video width="600" controls>
                <source src="/videoattachment" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </body>
        </html>
    `);
});


// Export the app as a Vercel serverless function
module.exports = (req, res) => {
    const server = createServer(app);
    const parsedUrl = parse(req.url, true);
    app(req, res, parsedUrl);
};
