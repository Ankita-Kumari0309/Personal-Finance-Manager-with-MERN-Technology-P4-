const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
