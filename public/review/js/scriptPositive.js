// Sends the id and 2 booleans as a POST request

function postPositive() {
  var http = new XMLHttpRequest();
  var url = "http://localhost:3000/review/approve";
  http.open('POST', url, true);

  http.setRequestHeader("Conent-Type",'application/json;charset=UTF-8');
  http.send(JSON.stringify({"id": content[2], "flag": "false", "approve": "true"}));
}
