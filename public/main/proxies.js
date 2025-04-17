// proxies.js
// This file contains a list of proxy servers to be used by the Noodles application.
// Proxies help to bypass network restrictions and protect the user's identity.
// Proxies are checked for validity before being used.

const proxies = [
  {
    "ip": "68.183.166.106",
    "port": 8080,
    "protocol": "http",
    "anonymity": "elite proxy"
  },
  {
    "ip": "149.202.235.115",
    "port": 3128,
    "protocol": "http",
    "anonymity": "anonymous"
  },
  {
    "ip": "104.27.178.42",
    "port": 80,
    "protocol": "http",
    "anonymity": "transparent"
  },
  {
    "ip": "185.132.235.246",
    "port": 8080,
    "protocol": "http",
    "anonymity": "elite proxy"
  },
  {
    "ip": "198.50.154.113",
    "port": 80,
    "protocol": "http",
    "anonymity": "transparent"
  },
  {
    "ip": "45.155.204.141",
    "port": 8080,
    "protocol": "http",
    "anonymity": "anonymous"
  },
  {
    "ip": "209.127.191.18",
    "port": 80,
    "protocol": "http",
    "anonymity": "transparent"
  },
  {
    "ip": "167.71.158.164",
    "port": 8080,
    "protocol": "http",
    "anonymity": "elite proxy"
  },
  {
    "ip": "193.203.154.50",
    "port": 3128,
    "protocol": "http",
    "anonymity": "anonymous"
  },
  {
    "ip": "104.27.179.42",
    "port": 80,
    "protocol": "http",
    "anonymity": "transparent"
  }
];

module.exports = proxies;