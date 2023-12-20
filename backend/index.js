const express = require('express');
const cors = require('cors');
const db = require('./config/connectiondb');
const eventLogger = require('./middleware/eventLogger');
const PORT = process.env.PORT || 3000;
const carreraRouter = require('./services/carrera/carrera.routes');
const archivosRoutes = require('./services/subidaArchivo/descarga.routes');
const noticiaRoutes = require('./services/noticia/noticia.routes');
const app = express();
app.use(eventLogger);
app.use(express.json());
app.use(cors());
db();
app.use('/api/carrera', carreraRouter);
app.use('/api/archivo', archivosRoutes);
app.use('/api/noticia', noticiaRoutes);
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});

