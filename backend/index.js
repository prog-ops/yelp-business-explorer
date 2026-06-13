import 'dotenv/config.js';
import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import FileUpload from "express-fileupload";
import ProdukRoute from "./route/ProdukRoute.js";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(FileUpload());
app.use(express.static("public"));

// Environment Variables
const apiKey = process.env.YELP_API_KEY;
const apiUrl = process.env.YELP_API_URL;
const apiUrlDetail = process.env.YELP_API_URL_DETAIL;

// =======================
// Yelp Proxy Routes
// Untuk Yelp, bisa saja buatkan controller nya (eg. YelpController) dan routenya (eg. YelpRoute)
// tapi karena cuma dua route jadi cukup tulis disini saja utk pembelajaran
// =======================
app.get('/api/yelp', async (req, res) => {
    try {
        const {
            offset = 0,
            limit = 10,
            term = '',
            categories = '',
            price
        } = req.query;

        const params = {
            location: 'san francisco',
            sort_by: 'best_match',
            limit,
            offset,
        };
        if (term) params.term = term;
        if (categories) params.categories = categories;
        if (price) params.price = price;

        const response = await axios.get(apiUrl, {
            params: params,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/yelp/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`${apiUrlDetail}/${id}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching business detail:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.toString() });
    }
});

// =======================
// Product Routes
// =======================
app.use(ProdukRoute);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
