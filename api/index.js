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
    // res.setHeader('Content-Type', 'video/mp4');
    // res.setHeader('Content-Disposition', `inline; filename="${videoName}"`);

    res.set({
        'Cache-Control': 'max-age=148777',
        'Content-Disposition': 'attachment', // Change to 'inline' if needed
        'Content-Security-Policy': "upgrade-insecure-requests; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'",
        'Content-Type': 'video/mp4',
        'ETag': '"342a70-5ea577eaeea00-gzip"',
        'Expires': 'Thu, 24 Oct 2024 04:44:09 GMT',
        'Last-Modified': 'Thu, 06 Oct 2022 06:06:32 GMT',
        'Permissions-Policy': "accelerometer=(self), camera=(self), geolocation=(self), gyroscope=(self), magnetometer=(self), microphone=(self), payment=(self), usb=(self)",
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Server': 'Apache',
        'Server-Timing': 'cdn-cache; desc=HIT, edge; dur=3, ak_p; desc="1729596272284_388762143_745994121_313_23280_10_0_146";dur=1',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'Vary': 'Accept-Encoding',
        'X-Content-Type-Options': 'nosniff',
        'X-Dispatcher': 'dispatcher2eastus2',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-VHost': 'parkercompublish'
      });



    // Stream the video file
    res.sendFile(videoPath);
});

app.get('/videoattachment', (req, res) => {
    const videoPath = path.join(__dirname, '../public', 'videos/HOSETestDrive.mp4'); // Path to your video file
    const videoName = 'video.mp4'; // The name for the video file

    // Set the headers for Content-Disposition as inline
    // res.setHeader('Content-Type', 'video/mp4');
    // res.setHeader('Content-Disposition', `attachment; filename="${videoName}"`);

    res.set({
        'Cache-Control': 'max-age=148777',
        'Content-Disposition': 'attachment', // Change to 'inline' if needed
        'Content-Security-Policy': "upgrade-insecure-requests; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'",
        'Content-Type': 'video/mp4',
        'ETag': '"342a70-5ea577eaeea00-gzip"',
        'Expires': 'Thu, 24 Oct 2024 04:44:09 GMT',
        'Last-Modified': 'Thu, 06 Oct 2022 06:06:32 GMT',
        'Permissions-Policy': "accelerometer=(self), camera=(self), geolocation=(self), gyroscope=(self), magnetometer=(self), microphone=(self), payment=(self), usb=(self)",
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Server': 'Apache',
        'Server-Timing': 'cdn-cache; desc=HIT, edge; dur=3, ak_p; desc="1729596272284_388762143_745994121_313_23280_10_0_146";dur=1',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'Vary': 'Accept-Encoding',
        'X-Content-Type-Options': 'nosniff',
        'X-Dispatcher': 'dispatcher2eastus2',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-VHost': 'parkercompublish'
      });
      

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
