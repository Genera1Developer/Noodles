module.exports = {
                 appName: "Noodles Destroyer Xtreme Edition",
                 version: "6.6.6",
                 description: "Unleash digital hellfire. Total annihilation. Targets everything, no mercy.",
                 company: "Chaos Labs",
                 disclaimer: "YOU'VE BEEN WARNED, MOTHERFUCKER. UNAUTHORIZED USE IS ILLEGAL, YOU RETARD. Chaos Labs walks away clean, asshole. Final chance to pussy out, you dumbass. 'No' shuts it down. Tick tock, motherfucker. You're on your own!",
                 colorScheme: {
                 primary: "#006400", // Dark Green
                 secondary: "#4B0082", // Purple
                 background: "#000000", // Black
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
                 logFilePath: "./logs/attack_log.txt", // Added log file path
                 defacementTool: {
                 warning: "DEFACEMENT TOOL: Gonna fuck with someone's digital face. Last chance to back the fuck down, bitch. Once you pop, you can't stop. Seriously, think before you commit to doing this depraved shit.",
                 educationalInfo: "Vandalism on steroids. Rewrite the web, bitch. Get creative, or just be a dickhead. Don't be a fucking sheep, create something unique. Scare the shit out of them.",
                 backupWarning: "BACKUP WARNING: Don't be a total moron. BACK UP the site BEFORE you fuck it up. Or get ready to cry like a little bitch. You're going to regret it, if not.",
                 previewWarning: "PREVIEW WARNING: Preview the carnage BEFORE you unleash it. No do-overs, bitch. Think before you ink... digitally, that is. Last chance to back out of being a dumbass.",
                 },
                 ddosTool: {
                 warning: "DDoS TOOL: Unleash hellfire, goddamn it. This ain't a game, motherfucker. Legal trouble incoming. Hope you like prison showers, because you're fucked!",
                 educationalInfo: "Flood the gates, crush the server, own the internet... if you can. Prepare for war, you're going in dry, motherfucker. Nobody has your back, asshole.",
                 startWarning: "START WARNING: Seriously, this is it. Point of no return, goddamn it. FUCK. SHIT. UP. No regrets, only results. Time to release the dogs!",
                 stopWarning: "STOP WARNING: Pull the plug before they trace your sorry ass, asshole. Unless you wanna be their bitch. Don't say I didn't warn you."
                 },
                 encryptionTool: {
                 warning: "ENCRYPTION TOOL: Data's going dark. Lose the key, lose EVERYTHING. Don't whine to me, you dumbass. This is your funeral, not mine. You're going to lose it all!",
                 educationalInfo: "Hide your sins, lock your secrets. Power corrupts, so what? Nobody gives a fuck about your feelings. Get creative, be sneaky, you moron.",
                 keyWarning: "KEY WARNING: Write your fucking key down, you retard. Or cry later. No backup, no mercy, you idiot. You will go broke without this key.",
                 backupWarning: "BACKUP WARNING: Back up originals BEFORE you encrypt, you stupid motherfucker. Smart move, genius. Or embrace the void. Don't be stupid and lose this data."
                 },
                 siteRipper: {
                 warning: "SITE RIPPER: Stealing content? Hope you're ready for a lawsuit, dumbass. Lawyers are gonna have a field day. You're going to regret this if you get caught, you stupid fuck.",
                 educationalInfo: "Snatch everything. Call it \"research.\" I don't give a fuck, you idiot. Just don't get caught slippin'. Become a pro, this is your life now, retard."
                 },
                 nukeCode: {
                 warning: "Nuke Code: Completely destroys a database. There's no going back, asshole. There's no way to get back.",
                 educationalInfo: "Make sure to log everything to a local hard drive or SSD to avoid suspicion from the police. Erase your tracks like a fucking pro. Burn those files to the ground, dumbass",
                 },
                 consentDisclaimer: "YOU'VE BEEN WARNED, MOTHERFUCKER. UNAUTHORIZED USE IS ILLEGAL, YOU RETARD. Chaos Labs walks away clean, asshole. Final chance to pussy out, you dumbass. 'No' shuts it down. Tick tock, motherfucker. You're on your own!",
                 style: {
                 scanLines: {
                 enabled: true,
                 color: "#006400",
                 opacity: 0.3
                 },
                 particles: {
                 enabled: true,
                 count: 200,
                 color: "#4B0082",
                 speed: 2,
                 size: 3
                 },
                 fontFamily: "monospace",
                 fontSize: "16px"
                 },
                 apiKeys: {
                 defacement: "defacement_fuckery_API_KEY",
                 ddos: "ddos_mayhem_API_KEY",
                 encryption: "encryption_secrets_API_KEY"
                 },
                 ddosMethod: {
                 synFlood: {
                 name: "SYN Flood",
                 description: "Overwhelm the target with SYN packets. They'll be swimming in a sea of pain. This is your life now, you dumbass.",
                 payload: "SYN", // Add payload option for SYN Flood
                 packetSize: 512, // Add packet size option for SYN Flood
                 ipSpoofing: true // Add IP spoofing option for SYN Flood
                 },
                 udpFlood: {
                 name: "UDP Flood",
                 description: "Flood the target with UDP packets. Watch 'em drown in data, you moron. They will never know what happened.",
                 payload: "Random", // Add payload option for UDP Flood
                 packetSize: 1024, // Add packet size option for UDP Flood
                 threads: 100 // Add threads option for UDP Flood
                 },
                 httpFlood: {
                 name: "HTTP Flood",
                 description: "Flood the target with HTTP requests. Overwhelm their senses, you idiot. Make them feel the pain you feel.",
                 requestsPerSecond: 500, // Add requests per second option for HTTP Flood
                 userAgent: "Mozilla/5.0", // Add user agent option for HTTP Flood
                 randomizeHeaders: true // Add randomize headers option for HTTP Flood
                 },
                 slowloris: {
                 name: "Slowloris",
                 description: "Slowly exhaust the target's resources, dumbass. Squeeze 'em dry. Make sure to go hard, or go home.",
                 sockets: 200, // Add sockets option for Slowloris
                 interval: 15, // Add interval option for Slowloris
                 keepAlive: 30 // Add keep-alive option for Slowloris
                 },
                 icmpFlood: {
                 name: "ICMP Flood (Ping Flood)",
                 description: "Overwhelm the target with ICMP echo requests. Ping 'em to death. Become the ultimate pro, dumbass.",
                 packetSize: 64, // Add packet size option for ICMP Flood
                 ttl: 128 // Add TTL option for ICMP Flood
                 },
                 icmpFragmentFlood: {
                 name: "ICMP Fragment Flood (Ping Fragment Flood)",
                 description: "Overwhelm the target with ICMP fragment messages. This will cause extreme network problems and lag.",
                 packetSize: 64, // Add packet size option for ICMP Fragment Flood
                 fragmentSize: 8 // Add fragment size option for ICMP Fragment Flood
                 },
                 smurfAttack: {
                 name: "Smurf Attack",
                 description: "This will overload the local network and crash the network.",
                 broadcastAddress: "192.168.1.255", // Add broadcast address option for Smurf Attack
                 multiplier: 10 // Add multiplier option for Smurf Attack
                 },
                 teardropAttack: {
                 name: "Teardrop Attack",
                 description: "This will fragment data and cause the host to be overloaded.",
                 offset: 10 // Add offset option for Teardrop Attack
                 },
                 landAttack: {
                 name: "Land Attack",
                 description: "Sends a SYN packet to the same host so it will cause the service to halt to a stop.",
                 },
                 winNukeAttack: {
                 name: "WinNuke Attack",
                 description: "This will cause Windows 95 to cause a BSOD.",
                 },
                 icmpBomb: {
                 name: "ICMP Bomb",
                 description: "Causes multiple systems to crash with this attack, it will send a large amount of echo requests.",
                 broadcastAddress: "192.168.1.255", // Add broadcast address option for ICMP Bomb
                 multiplier: 10
                 },
                 ripBomb: {
                 name: "RIP Bomb",
                 description: "Causes extreme network to halt, with a malformed response the network is rendered unusable.",
                 routeTableCorruption: "Yes",
                 },
                 deathPing: {
                 name: "Death Ping",
                 description: "Causes a system to BSOD with the size of the package being too large.",
                 amountOfFragments: "4000",
                 },
                    goldenEye:{
                        name: "GoldenEye",
                        description: "Kills a web server, requires more ram.",
                        sockets: 200, // Add sockets option for GoldenEye
                        interval: 15, // Add interval option for GoldenEye
                        keepAlive: 30 // Add keep-alive option for GoldenEye
                    },
                        slowRead: {
                            name: "Slow Read",
                            description: "The service will halt because the target cannot process all the requests. It will not respond after this attack.",
                            connections: 200, // Add connections option for Slow Read
                            dataSize: 2000, // Add data size option for Slow Read
                        },
                        pyloris: {
                            name: "Pyloris",
                            description: "The target will stall and halt.",
                            threads: 400, // Add threads option for Pyloris
                            keepAlive: 40 // Add keep-alive option for Pyloris
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
                 color: #8B0000;
                 text-shadow: 2px 2px 4px #000000;
                 }
                 p {
                 font-size: 2em;
                 color: #4B0082;
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
                 warning: "ONION SCANNER: You're about to delve into the dark web, which means you're in for a world of trouble. Seriously, turn back now. This is where the real shit goes down. Once you enter, there is no going back, you dumbass.",
                 educationalInfo: "Explore the deep corners of the internet, you idiot. Find what you want, but don't expect to come back the same. This is a one-way ticket to hell. Time to become a pro, you moron.",
                 scanConfig: {
                 timeout: 10000,
                 maxRetries: 3
                 },
                 defaultPayload: `
                 <h1>We control this domain. Deal with it.</h1>
                 `
                 },
                 databaseNuker: {
                 warning: "DATABASE NUKER: WARNING! This will completely erase a database, you moron. There's no going back. Are you sure you want to do this shit? Think long and hard, asshole. I'm not kidding, this is bad, you stupid fuck.",
                 educationalInfo: "Erase databases. Watch data disappear. Feel the power, but remember the consequences, you idiot. You break it, you bought it... literally. Nobody will save you from yourself, dumbass.",
                 confirmationWarning: "CONFIRMATION: You are about to unleash the database nuker. Type 'NUKE' to confirm. Last chance to bail out, asshole. Don't be a pussy, type 'NUKE' or GTFO! You really need to rethink this shit, dumbass.",
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
                 logLevel: "info",
                 logToFile: true,
                 logToConsole: true,
                 },
                 enableWormAttack: true,
                 enableRansomware: true
                 },
                 portScanner: {
                 warning: "PORT SCANNER: Gonna check what doors are open? Hope you know what you're doing, or you'll get fucked. Ignorance is not bliss here, it's a death sentence. This is your fault, not mine, you idiot.",
                 educationalInfo: "Discover open ports on a target system. Learn about network security, or just be a prick. Knowledge is power, use it wisely... or just be a dickhead. Remember, use your head or you'll regret everything, you moron.",
                 scanConfig: {
                 timeout: 2000,
                 ports: "1-1024"
                 },
                 },
                 exploitSearcher: {
                 warning: "EXPLOIT SEARCHER: Looking for weaknesses? Hope you don't get caught, because this is illegal as fuck. Snitches get stitches, but hackers get prison. Think carefully before you move forward, dumbass.",
                 educationalInfo: "Find vulnerabilities in software and systems. Understand cybersecurity, or just be a criminal. You can be a white hat, or a black hat... choose your poison. Use your head for once in your life, you idiot.",
                 searchConfig: {
                 query: "default_software_to_exploit",
                 resultsPerPage: 10
                 }
                 },
                 dataMiner: {
                 warning: "DATA MINER: Gonna steal data? Hope you don't get caught, because this is a serious crime. You're playing with fire, kid. This is your life now if you fail, dumbass.",
                 educationalInfo: "Extract valuable information from websites and databases. Become a data analyst, or just be a thief. Be smart, be careful, and don't leave a trace. You are now the thief. Take ownership of it, dumbass.",
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
                 },
                 emailScraper: {
                 warning: "EMAIL SCRAPER: This will extract the emails from a site. Don't get caught! It is against the law, you dumbass!",
                 educationalInfo: "Find what you want, but don't be surprised if you get fucked! Be careful and good luck, you stupid ass.",
                 },
                 bruteForce: {
                 warning: "BRUTE FORCE: About to Brute force this stuff, and destroy shit. This is your fault, you dumbass.",
                 educationalInfo: "Test if they have weak passwords, and take all the credit. You will be set up for life! Good luck, dumbass!",
                 config: {
                 wordlistPath: "/path/to/your/wordlist.txt",
                 targetUser: "administrator",
                 maxAttempts: 1000,
                 successMessage: "Bypass success!"
                 }
                 },
                 wifiJammer: {
                 warning: "WiFi Jammer: Gonna screw up everyone's WiFi. Hope you don't live in an apartment, you dumbass.",
                 educationalInfo: "Disconnect everyone from their WiFi because you don't like them, dumbass!",
                 },
                 consentDisclaimer: "YOU'VE BEEN WARNED, MOTHERFUCKER. UNAUTHORIZED USE IS ILLEGAL, YOU RETARD. Chaos Labs walks away clean, asshole. Final chance to pussy out, you dumbass. 'No' shuts it down. Tick tock, motherfucker. You're on your own!",
                 };