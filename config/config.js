module.exports = {
  appName: "Noodles Destroyer",
  version: "6.6.6",
  description: "Unleash digital chaos. Targets both clearnet & onion sites. Total anarchy.",
  company: "Chaos Labs",
  disclaimer: "Chaos Labs ain't responsible for your shitshow. Go nuclear, but own up to it, punk. Remember, snitches get stitches.",
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
  reportFeature: false,
  defacementTool: {
    warning: "DEFACEMENT TOOL: Gonna fuck with someone's digital face. Last chance to back the fuck down. Once you pop, you can't stop.",
    educationalInfo: "Vandalism on steroids. Rewrite the web. Get creative, or just be a dickhead. Don't be a fucking sheep, create something unique.",
    backupWarning: "BACKUP WARNING: Don't be a total moron. BACK UP the site BEFORE you fuck it up. Or get ready to cry like a little bitch.",
    previewWarning: "PREVIEW WARNING: Preview the carnage BEFORE you unleash it. No do-overs, bitch. Think before you ink... digitally, that is."
  },
  ddosTool: {
    warning: "DDoS TOOL: Unleash hellfire. This ain't a game. Legal trouble incoming. Hope you like prison showers.",
    educationalInfo: "Flood the gates. Crush the server. Own the internet... if you can. Prepare for war, you're going in dry.",
    startWarning: "START WARNING: Seriously, this is it. Point of no return. FUCK. SHIT. UP. No regrets, only results.",
    stopWarning: "STOP WARNING: Pull the plug before they trace your sorry ass. Unless you wanna be their bitch."
  },
  encryptionTool: {
    warning: "ENCRYPTION TOOL: Data's going dark. Lose the key, lose EVERYTHING. Don't whine to me. This is your funeral, not mine.",
    educationalInfo: "Hide your sins. Lock your secrets. Power corrupts, so what? Nobody gives a fuck about your feelings.",
    keyWarning: "KEY WARNING: Write your fucking key down. Or cry later. No backup, no mercy.",
    backupWarning: "BACKUP WARNING: Back up originals BEFORE you encrypt. Smart move, genius. Or embrace the void."
  },
  siteRipper: {
    warning: "SITE RIPPER: Stealing content? Hope you're ready for a lawsuit, dumbass. Lawyers are gonna have a field day.",
    educationalInfo: "Snatch everything. Call it \"research.\" I don't give a fuck. Just don't get caught slippin'."
  },
  nukeCode: {
    warning: "Nuke Code: Completely destroys a database. There's no going back.",
    educationalInfo: "Make sure to log everything to a local hard drive or SSD to avoid suspicion from the police. Erase your tracks like a fucking pro.",
  },
  consentDisclaimer: "YOU'VE BEEN WARNED. UNAUTHORIZED USE IS ILLEGAL. Chaos Labs walks away clean. Final chance to pussy out. 'No' shuts it down. Tick tock, motherfucker.",
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
      description: "Overwhelm the target with SYN packets. They'll be swimming in a sea of pain.",
    },
    udpFlood: {
      name: "UDP Flood",
      description: "Flood the target with UDP packets. Watch 'em drown in data.",
    },
    httpFlood: {
      name: "HTTP Flood",
      description: "Flood the target with HTTP requests. Overwhelm their senses.",
    },
    slowloris: {
      name: "Slowloris",
      description: "Slowly exhaust the target's resources. Squeeze 'em dry.",
    },
    icmpFlood: {
      name: "ICMP Flood (Ping Flood)",
      description: "Overwhelm the target with ICMP echo requests. Ping 'em to death."
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
    warning: "ONION SCANNER: You're about to delve into the dark web, which means you're in for a world of trouble. Seriously, turn back now. This is where the real shit goes down.",
    educationalInfo: "Explore the deep corners of the internet. Find what you want, but don't expect to come back the same. This is a one-way ticket to hell.",
    scanConfig: {
      timeout: 10000,
      maxRetries: 3
    },
    defaultPayload: `
      <h1>We control this domain. Deal with it.</h1>
    `
  },
  databaseNuker: {
    warning: "DATABASE NUKER: WARNING! This will completely erase a database. There's no going back. Are you sure you want to do this shit? Think long and hard, asshole.",
    educationalInfo: "Erase databases. Watch data disappear. Feel the power, but remember the consequences. You break it, you bought it... literally.",
    confirmationWarning: "CONFIRMATION: You are about to unleash the database nuker. Type 'NUKE' to confirm. Last chance to bail out, asshole. Don't be a pussy, type 'NUKE' or GTFO!",
    connectionSettings: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "your_secure_password",
      database: "target_database"
    },
    nukeSequence: [
      "SET FOREIGN_KEY_CHECKS = 0;",
      "DROP TABLE IF EXISTS `users`;",
      "DROP TABLE IF EXISTS `products`;",
      "DROP TABLE IF EXISTS `orders`;",
      "DROP TABLE IF EXISTS `categories`;",
      "SET FOREIGN_KEY_CHECKS = 1;"
    ],
    loggingOptions: {
      logDirectory: "./logs",
      logLevel: "info"
    }
  },
  portScanner: {
    warning: "PORT SCANNER: Gonna check what doors are open? Hope you know what you're doing, or you'll get fucked. Ignorance is not bliss here, it's a death sentence.",
    educationalInfo: "Discover open ports on a target system. Learn about network security, or just be a prick. Knowledge is power, use it wisely... or just be a dickhead.",
    scanConfig: {
      timeout: 2000,
      ports: "1-1024"
    },
  },
  exploitSearcher: {
    warning: "EXPLOIT SEARCHER: Looking for weaknesses? Hope you don't get caught, because this is illegal as fuck. Snitches get stitches, but hackers get prison.",
    educationalInfo: "Find vulnerabilities in software and systems. Understand cybersecurity, or just be a criminal. You can be a white hat, or a black hat... choose your poison.",
    searchConfig: {
      query: "default_software_to_exploit",
      resultsPerPage: 10
    }
  },
  dataMiner: {
    warning: "DATA MINER: Gonna steal data? Hope you don't get caught, because this is a serious crime. You're playing with fire, kid.",
    educationalInfo: "Extract valuable information from websites and databases. Become a data analyst, or just be a thief. Be smart, be careful, and don't leave a trace.",
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
        "warning": "WORMS: This can create chaos and will auto-proliferate! Hope you know what you're doing because this is some serious shit!",
        "educationalInfo": "This has the ability to destroy all of the data and replicate. Be careful because you can easily screw this up!",
        "wormSequence": [
          "Copy the program to every folder in the system.",
          "Rename existing files to random names.",
          "Encrypt all of the files",
        ],
      }
  }
};