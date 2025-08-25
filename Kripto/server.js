import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;


app.use(cors());


const apiKey = "53980a4e-08d1-4cf2-8690-0af566047421";


app.get("/price/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`;

  try {
    const response = await fetch(url, {
      headers: { "X-CMC_PRO_API_KEY": apiKey }
    });

    if (!response.ok) throw new Error("API isteği başarısız: " + response.status);

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Backend çalışıyor: http://localhost:${PORT}`));
