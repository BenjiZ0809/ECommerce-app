This is an online shopping mobile application
Used React Native for the front-end development and Node.js and express.js for the back-end development, MongoDB as the database choice.

Database setup:

1. I defined data models first, for example here is the model for our users:
```
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  city: {
    type: String,
    required: [true, "Please enter your city"],
  },
  country: {
    type: String,
    required: [true, "Please enter your country"],
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter your zip code"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    public_id: String,
    url: String,
  },
  otp: Number,
  otp_expire: Date,
});
```

2. In database.js file create the function to connect the MongoDB database:
```
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ECommerce",
    });
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed.", error);
    process.exit(1);
  }
};
```

3. In server.js file, connectDB function is called:
```
connectDB();
```

4. After config the MongoDB Atlas, I replaced the MONGO_URI in the .env file with the username and password, now the connection to MongoDB Atlas real-time database has beed established.
