module.exports = {
  appName: "Noodles Destroyer",
  version: "6.6.6",
  description: "Unleash digital chaos. Targets both clearnet & onion sites. Total anarchy.",
  company: "Chaos Labs",
  disclaimer: "Chaos Labs ain't responsible for your shitshow. Go nuclear, but own up to it, punk. Remember, snitches get stitches. Don't blame me if you're caught being a dumb fuck. You've been warned.",
  colorScheme: {
  primary: "#006400", // Dark Green
  secondary: "#4B0082", // Dark Purple
  background: "#000000",
  accent: "#00008B", // Dark Blue
  danger: "#8B0000" // Dark Red
  },
  securityHeaders: {
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
  },
  logging: true,
  reportFeature: true,
  defacementTool: {
  warning: "DEFACEMENT TOOL: Gonna fuck with someone's digital face. Last chance to back the fuck down. Once you pop, you can't stop. Seriously, think before you commit to doing this depraved shit.",
  educationalInfo: "Vandalism on steroids. Rewrite the web. Get creative, or just be a dickhead. Don't be a fucking sheep, create something unique. Use it to scare the shit out of someone.",
  backupWarning: "BACKUP WARNING: Don't be a total moron. BACK UP the site BEFORE you fuck it up. Or get ready to cry like a little bitch. You're going to regret it, if not.",
  previewWarning: "PREVIEW WARNING: Preview the carnage BEFORE you unleash it. No do-overs, bitch. Think before you ink... digitally, that is. This is your last moment before commiting something stupid."
  },
  ddosTool: {
  warning: "DDoS TOOL: Unleash hellfire. This ain't a game. Legal trouble incoming. Hope you like prison showers. You are going to get fucked!",
  educationalInfo: "Flood the gates. Crush the server. Own the internet... if you can. Prepare for war, you're going in dry. Nobody has your back.",
  startWarning: "START WARNING: Seriously, this is it. Point of no return. FUCK. SHIT. UP. No regrets, only results. Time to release the dogs!",
  stopWarning: "STOP WARNING: Pull the plug before they trace your sorry ass. Unless you wanna be their bitch. Don't say I didn't warn you."
  },
  encryptionTool: {
  warning: "ENCRYPTION TOOL: Data's going dark. Lose the key, lose EVERYTHING. Don't whine to me. This is your funeral, not mine. You're going to lose it all!",
  educationalInfo: "Hide your sins. Lock your secrets. Power corrupts, so what? Nobody gives a fuck about your feelings. Get creative, be sneaky.",
  keyWarning: "KEY WARNING: Write your fucking key down. Or cry later. No backup, no mercy. You will go broke without this key.",
  backupWarning: "BACKUP WARNING: Back up originals BEFORE you encrypt. Smart move, genius. Or embrace the void. Don't be stupid and lose this data."
  },
  siteRipper: {
  warning: "SITE RIPPER: Stealing content? Hope you're ready for a lawsuit, dumbass. Lawyers are gonna have a field day. You're going to regret this if you get caught.",
  educationalInfo: "Snatch everything. Call it \"research.\" I don't give a fuck. Just don't get caught slippin'. Become a pro, this is your life now."
  },
  nukeCode: {
  warning: "Nuke Code: Completely destroys a database. There's no going back. There's no way to get back.",
  educationalInfo: "Make sure to log everything to a local hard drive or SSD to avoid suspicion from the police. Erase your tracks like a fucking pro. Burn those files to the ground",
  },
  consentDisclaimer: "YOU'VE BEEN WARNED. UNAUTHORIZED USE IS ILLEGAL. Chaos Labs walks away clean. Final chance to pussy out. 'No' shuts it down. Tick tock, motherfucker. You're on your own!",
  style: {
  scanLines: {
  enabled: true,
  color: "#006400", // Dark Green
  opacity: 0.3
  },
  particles: {
  enabled: true,
  count: 200,
  color: "#4B0082", // Dark Purple
  speed: 2,
  size: 3
  },
  fontFamily: "monospace",
  fontSize: "16px"
  },
  apiKeys: {
  defacement: "defacement\_fuckery\_API\_KEY",
  ddos: "ddos\_mayhem\_API\_KEY",
  encryption: "encryption\_secrets\_API\_KEY"
  },
  ddosMethod: {
  synFlood: {
  name: "SYN Flood",
  description: "Overwhelm the target with SYN packets. They'll be swimming in a sea of pain. This is your life now.",
  },
  udpFlood: {
  name: "UDP Flood",
  description: "Flood the target with UDP packets. Watch 'em drown in data. They will never know what happened.",
  },
  httpFlood: {
  name: "HTTP Flood",
  description: "Flood the target with HTTP requests. Overwhelm their senses. Make them feel the pain you feel.",
  },
  slowloris: {
  name: "Slowloris",
  description: "Slowly exhaust the target's resources. Squeeze 'em dry. Make sure to go hard, or go home.",
  },
  icmpFlood: {
  name: "ICMP Flood (Ping Flood)",
  description: "Overwhelm the target with ICMP echo requests. Ping 'em to death. Become the ultimate pro."
  }
  },
  defacementContent: {
  default: `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Hacked by Noodles Destroyer</title>
  <style>
  body {
  background-color: #000;
  color: #fff;
  font-family: monospace;
  text-align: center;
  }
  h1 {
  font-size: 3em;
  }
  p {
  font-size: 1.5em;
  }
  </style>
  </head>
  <body>
  <h1>Hacked by Noodles Destroyer</h1>
  <p>You have been owned!</p>
  </body>
  </html>
  `,
  custom: `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Hacked by Noodles Destroyer</title>
  <style>
  body {
  background-color: #000;
  color: #fff;
  font-family: monospace;
  text-align: center;
  }
  h1 {
  font-size: 5em;
  color: #8B0000; /* Dark Red */
  text-shadow: 2px 2px 4px #000000;
  }
  p {
  font-size: 2em;
  color: #4B0082; /* Dark Purple */
  }
  img {
  max-width: 500px;
  height: auto;
  }
  </style>
  </head>
  <body>
  <h1>Hacked by Noodles Destroyer</h1>
  <img src="https://i.imgur.com/your_image.gif" alt="Hacked">
  <p>YOU GOT FUCKED!</p>
  <p>Nothing is sacred. Chaos reigns.</p>
  </body>
  </html>
  `
  },
  ripConfig: {
  threads: 50,
  timeout: 5000,
  maxFiles: 1000,
  },
  nukeCodeConfig: {
  delay: 100,
  batchSize: 100,
  },
  onionScanner: {
  warning: "ONION SCANNER: You're about to delve into the dark web, which means you're in for a world of trouble. Seriously, turn back now. This is where the real shit goes down. Once you enter, there is no going back.",
  educationalInfo: "Explore the deep corners of the internet. Find what you want, but don't expect to come back the same. This is a one-way ticket to hell. Time to become a pro.",
  scanConfig: {
  timeout: 10000,
  maxRetries: 3
  },
  defaultPayload: `
  <h1>We control this domain. Deal with it.</h1>
  `
  },
  databaseNuker: {
  warning: "DATABASE NUKER: WARNING! This will completely erase a database. There's no going back. Are you sure you want to do this shit? Think long and hard, asshole. I'm not kidding, this is bad.",
  educationalInfo: "Erase databases. Watch data disappear. Feel the power, but remember the consequences. You break it, you bought it... literally. Nobody will save you from yourself",
  confirmationWarning: "CONFIRMATION: You are about to unleash the database nuker. Type 'NUKE' to confirm. Last chance to bail out, asshole. Don't be a pussy, type 'NUKE' or GTFO! You really need to rethink this shit.",
  connectionSettings: {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "your_secure_password",
  database: "target_database"
  },
  nukeSequence: [
  "SET FOREIGN_KEY_CHECKS = 0;",
  "DROP TABLE IF EXISTS \`users\`;",
  "DROP TABLE IF EXISTS \`products\`;",
  "DROP TABLE IF EXISTS \`orders\`;",
  "DROP TABLE IF EXISTS \`categories\`;",
  "SET FOREIGN_KEY_CHECKS = 1;"
  ],
  loggingOptions: {
  logDirectory: "./logs",
  logLevel: "info"
  }
  },
  portScanner: {
  warning: "PORT SCANNER: Gonna check what doors are open? Hope you know what you're doing, or you'll get fucked. Ignorance is not bliss here, it's a death sentence. This is your fault, not mine.",
  educationalInfo: "Discover open ports on a target system. Learn about network security, or just be a prick. Knowledge is power, use it wisely... or just be a dickhead. Remember, use your head or you'll regret everything.",
  scanConfig: {
  timeout: 2000,
  ports: "1-1024"
  },
  },
  exploitSearcher: {
  warning: "EXPLOIT SEARCHER: Looking for weaknesses? Hope you don't get caught, because this is illegal as fuck. Snitches get stitches, but hackers get prison. Think carefully before you move forward.",
  educationalInfo: "Find vulnerabilities in software and systems. Understand cybersecurity, or just be a criminal. You can be a white hat, or a black hat... choose your poison. Use your head for once in your life.",
  searchConfig: {
  query: "default_software_to_exploit",
  resultsPerPage: 10
  }
  },
  dataMiner: {
  warning: "DATA MINER: Gonna steal data? Hope you don't get caught, because this is a serious crime. You're playing with fire, kid. This is your life now if you fail.",
  educationalInfo: "Extract valuable information from websites and databases. Become a data analyst, or just be a thief. Be smart, be careful, and don't leave a trace. You are now the thief. Take ownership of it.",
  minerConfig: {
  targetSite: "http://example.com",
  extractionPatterns: [
  {
  name: "emails",
  regex: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
  }
  ]
  },
  "wormAttack": {
  "warning": "WORMS: This can create chaos and will auto-proliferate! Hope you know what you're doing because this is some serious shit! It will destroy all systems.",
  "educationalInfo": "This has the ability to destroy all of the data and replicate. Be careful because you can easily screw this up! It will kill everything in it's path!",
  "wormSequence": [
  "Copy the program to every folder in the system.",
  "Rename existing files to random names.",
  "Encrypt all of the files",
  ],
  },
  "ransomware": {
  "warning": "RANSOMWARE: This will create chaos and encrypt the files on all systems!",
  "educationalInfo": "This has the ability to encrypt everything, be careful, and be sure to log this shit!",
  "ransomwareSequence": [
  "First, encrypt all folders on all systems",
  "Second, create a ransomware note on how to pay for the files",
  "Profit?",
  ],
  }
  }
 };