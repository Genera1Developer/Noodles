module.exports = {
                 appName: "ChaosNoodle",
                 version: "6.6.6",
                 description: "A suite of tools for REALLY testing security.  Like, seriously.",
                 company: "Shadow Tech Solutions (Unincorporated)",
                 disclaimer: "Using this tool for ANYTHING illegal will get you FUCKED. Seriously, don't be a dumbass. I'm NOT responsible for your shit.",
                 colorScheme: {
                 primary: "#008000", // Dark Green
                 secondary: "#4B0082", // Indigo (Close to Purple)
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
                 reportFeature: false,
                 ddosTool: {
                 warning: "DDoS TOOL: THIS IS A GODDAMN DDOS TOOL. ONLY USE IT IF YOU'RE READY TO FACE THE MOTHERFUCKING CONSEQUENCES. SERIOUSLY. LIKE JAIL TIME CONSEQUENCES. DO NOT FUCK AROUND WITH THIS.",
                 educationalInfo: "Yeah, right. Educational. You wanna flood some servers, here's your key. Don't cry to me when you get caught."
                 },
                 onionBuster: {
                 warning: "ONION BUSTER: Goes after those sneaky .onion sites. Be careful, you're walking on thin ice.",
                 educationalInfo: "Who needs education? Go fuck some shit up. You know what to do."
                 },
                 siteRipper: {
                 warning: "SITE RIPPER: Pulls down all the content from a site. Don't get sued, you fucking idiot.",
                 educationalInfo: "Steal everything! You know, for \"archival purposes.\""
                 },
                 nukeCode: {
                 warning: "Nuke Code: Completely destroys a database.",
                 educationalInfo: "Make sure to log everything to a local hard drive or SSD to avoid suspicion from the police",
                 }
                 };