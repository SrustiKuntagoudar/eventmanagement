const express =require( 'express');
const mongoose =require( 'mongoose');
const cors =require( 'cors');
const dotenv =require( 'dotenv');
const hallRoutes =require( './routes/halls'); // Ensure .js extension is included
const authRoutes =require( './routes/auth'); // Ensure .js extension is included

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// app.use('/api/halls', hallRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));