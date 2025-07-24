import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✨ Serve ملفات static مثل CSS و الصور من نفس مجلد server.js
app.use(express.static(__dirname));

// ✨ Route "/" يبعث index.html الموجود في نفس المجلد
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
