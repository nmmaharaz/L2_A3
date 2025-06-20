import app from './index';

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hellow Server!");
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
