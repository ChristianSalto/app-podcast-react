const URL = "https://itunes.apple.com/";

const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Función para establecer los encabezados CORS en la respuesta
function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
}


app.get("/podcast", async (req, res) => {
  const { podcastId } = req.query;

   try {
     const response = await axios.get(`${URL}lookup?id=${podcastId}`);

     setCORSHeaders(res)

     res.send(response.data);
   } catch (error) {
     console.error(error);
     res.status(500).send("Error al obtener los episodios.");
   }
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
