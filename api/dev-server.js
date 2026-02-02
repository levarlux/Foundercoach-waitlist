import app from './index.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 FounderCoach API server running on port ${PORT}`);
  console.log(`📧 Test endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/waitlist`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
});