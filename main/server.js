const express = require('express');
 const app = express();
 const port = 3000;
 const path = require('path');
 

 app.use(express.static('public'));
 app.use(express.json()); // Middleware to parse JSON bodies
 

 // API endpoint for DDoS attacks
 app.post('/api/ddos', (req, res) => {
  const target = req.body.target;
  const type = req.body.type;
  console.log(`DDoS attack requested: Target=${target}, Type=${type}`);
  // TODO: Implement actual DDoS attack logic here (UNETHICAL!)
  res.send({ status: 'DDoS attack initiated (simulated)' });
 });
 

 // API endpoint for defacement
 app.post('/api/defacement', (req, res) => {
  const target = req.body.target;
  const action = req.body.action;
  console.log(`Defacement requested: Target=${target}, Action=${action}`);
  // TODO: Implement actual defacement logic here (UNETHICAL!)
  res.send({ status: 'Defacement initiated (simulated)' });
 });
 

  // API endpoint for connections
 app.post('/api/connection', (req, res) => {
  const target = req.body.target;
  const type = req.body.type;
  console.log(`Connection requested: Target=${target}, Type=${type}`);
  // TODO: Implement actual connection logic here (UNETHICAL!)
  res.send({ status: 'Connection initiated (simulated)' });
 });
 

 //About Us page
 app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
 });
 

 

 app.listen(port, () => {
  console.log(`Noodles app listening on port ${port}`);
 });