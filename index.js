const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, api_key } = req.body;

  if (!message || !api_key) {
    return res.status(400).json({ error: "Falta message o api_key" });
  }

  try {
    // const response = await axios.post(process.env.N8N_ENDPOINT, {
    //   message,
    //   api_key
    // });

    const response = await axios.post(
      process.env.N8N_ENDPOINT,
      {
        message,
        // api_key,
      }
    );

    // https://n8n-basic.zapto.org/webhook/4bdeae3d-4882-4a00-a521-91305cb01581

    // console.log('Response');
    // console.log(response);

    return res.json({ reply: response.data.output || "Sin respuesta" });

    // return res.json({ reply: 'Esta es una respuesta simulada' });
  } catch (error) {
    console.error("Error al contactar con n8n:", error.message);
    return res.status(500).json({ error: "Error al contactar con n8n" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
