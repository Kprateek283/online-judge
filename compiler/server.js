import express from "express";
import cors from "cors";
import { DBConnection } from "./db.js";
import router from "./routes/router.js";
const app = express();
const PORT = process.env.PORT || 5000;
DBConnection();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/", router);

app.listen(PORT, (res) => {
  console.log(`Compiler is running on port ${PORT}`);
});
