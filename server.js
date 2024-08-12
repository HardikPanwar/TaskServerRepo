const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const connection = require('./config/db.connection');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/updateBannerData', (req, res) => {
    const {description, timer, bannerLink, isVisible, banner} = req.body;
    const query = `UPDATE banner SET description = ?,
                        timer = ?,
                        bannerLink = ?,
                        isVisible = ?,
                        banner = ?
                        WHERE id=1`;
    
    connection.module.query(query, [description, timer, bannerLink, isVisible, banner], (err) => {
        if(err){
            return res.status(500).send(err);
        }
        return res.status(202).send('Banner updated successfully');
    })
})

app.get('/api/getBannerData', (req, res) => {
    const query = `SELECT * FROM banner WHERE id=1`;

    connection.module.query(query, (err, results) => {
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).json(results[0]);
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})