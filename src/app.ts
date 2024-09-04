import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello Worldo!');
});

app.post('/update', (req, res) => {
    const data = req.body;

    res.status(200).send({
        message: 'Success',
        receivedData: data
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
