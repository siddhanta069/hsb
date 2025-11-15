import dotenv from "dotenv";
import app from "./app.js";
import cloudinary from "cloudinary";
import cors from "cors";

const allowedOrigins = [
    'https://hsb-1-client.onrender.com'
];

// Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 
        
        // Allow if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Log the blocked origin for debugging
            console.log(`CORS block: Origin ${origin} not allowed.`);
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200
};

// Apply the specific CORS configuration
app.use(cors(corsOptions));
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
