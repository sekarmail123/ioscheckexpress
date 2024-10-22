const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;

// Middleware to serve static files (video)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the video file with Content-Disposition header
app.get('/videoinline', (req, res) => {
    const videoPath = path.join(__dirname, 'public', 'videos/HOSETestDrive.mp4'); // Path to your video file
    const videoName = 'video.mp4'; // The name for the video file

    // Set the headers for Content-Disposition as inline
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `inline; filename="${videoName}"`);

    // Stream the video file
    res.sendFile(videoPath);
});

app.get('/videoattachment', (req, res) => {
    const videoPath = path.join(__dirname, 'public', 'videos/HOSETestDrive.mp4'); // Path to your video file
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
