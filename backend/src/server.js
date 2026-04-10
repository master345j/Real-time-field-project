const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

connectDB();

const app = express();

const frontendDir = path.join(__dirname, '..', '..', 'frontend');
const previewPath = path.join(frontendDir, 'preview.html');

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { searchProducts } = require('./services/aggregatorEngine');

app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

app.get('/preview.html', (req, res) => {
  res.sendFile(previewPath);
});

app.get('/preview', (req, res) => {
  res.redirect('/preview.html');
});

app.use(
  express.static(frontendDir, {
    index: false,
    extensions: ['html'],
  })
);

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API is running. Open /preview.html for the UI prototype.',
    preview: '/preview.html',
  });
});

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('searchQuery', async (payload) => {
    const query = String(payload?.query || '').trim();
    const category = String(payload?.category || '').trim();

    if (!query) {
      socket.emit('searchResults', { query: '', results: [] });
      return;
    }

    try {
      const results = await searchProducts(query, category);
      socket.emit('searchResults', { query, results });
    } catch (error) {
      socket.emit('searchError', { message: error.message || 'Live search failed' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Preview: http://localhost:${PORT}/preview.html`);
});
