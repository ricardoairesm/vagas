import app from "./app.ts";

const port = 3000;
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});