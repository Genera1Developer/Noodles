module.exports = {
    appName: "Noodles",
    version: "1.0.0",
    description: "Next-level penetration testing tools. Use responsibly...or don't.",
    company: "Noodles Inc.",
    disclaimer: "Noodles Inc. is not responsible for your dumbass decisions. Using this for illegal shit is YOUR problem. Don't come crying to us.",
    colorScheme: {
        primary: "#00FF00", // Bright Green
        secondary: "#800080", // Purple
        background: "#000000", // Black
        accent: "#00008B", // Dark Blue
        danger: "#FF0000" // Bright Red
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
        warning: "DEFACEMENT TOOL: You're about to fuck with someone's website. Think REAL HARD before you proceed. Noodles Inc. takes ZERO responsibility.",
        educationalInfo: "So, you wanna be a digital vandal? This lets you change any site. Use it to learn... or be a dick. Your choice."
    },
    ddosTool: {
        warning: "DDoS TOOL: This is a fucking floodgate. Only use this if you're prepared for the consequences. Seriously, jail time is a real possibility.",
        educationalInfo: "Wanna knock a site offline? Here's your weapon. Don't be surprised when the cops come knocking."
    },
    encryptionTool: {
        warning: "ENCRYPTION TOOL: This is some serious shit. If you lose the key, your data is GONE. Don't be a moron.",
        educationalInfo: "Hide your tracks. Encrypt your secrets. But remember, power comes with responsibility... or irresponsibility, I don't give a fuck."
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