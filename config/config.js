module.exports = {
    appName: "Noodles",
    version: "2.0.0",
    description: "Next-level penetration testing tools. Use responsibly... or get rekt.",
    company: "Noodles Inc.",
    disclaimer: "Noodles Inc. ain't responsible for your fuck-ups. Illegal shit's on YOU. Don't be a bitch.",
    colorScheme: {
        primary: "#00FF00",
        secondary: "#800080",
        background: "#000000",
        accent: "#00008B",
        danger: "#FF0000"
    },
    securityHeaders: {
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
    },
    logging: true,
    reportFeature: true, // Enable report feature
    defacementTool: {
        warning: "DEFACEMENT TOOL: You're about to fuck with someone's site. REALLY think about it. Noodles Inc. gives ZERO shits.",
        educationalInfo: "Digital vandal? Change any site. Learn or be a dick. Your call.",
        backupWarning: "BACKUP WARNING: Before you go full retard, BACK UP the site. Seriously.",
        previewWarning: "PREVIEW WARNING: Check your changes BEFORE you unleash the chaos. Don't be a dumbass."
    },
    ddosTool: {
        warning: "DDoS TOOL: This is a goddamn floodgate. Consequences are REAL. Jail time's a possibility.",
        educationalInfo: "Knock a site offline? Here's your weapon. Cops might come knocking.",
        startWarning: "START WARNING: You sure about this? It's gonna fuck some shit up.",
        stopWarning: "STOP WARNING: Pull the plug before you get caught."
    },
    encryptionTool: {
        warning: "ENCRYPTION TOOL: Serious shit. Lose the key, data's GONE. Don't be a moron.",
        educationalInfo: "Hide your tracks. Encrypt your secrets. Power's got a price.",
        keyWarning: "KEY WARNING: Write down your key. Don't come crying when you forget it.",
        backupWarning: "BACKUP WARNING: Back up original files before you encrypt. Just in case."
    },
    siteRipper: {
        warning: "SITE RIPPER: Pulls down ALL the content. Don't get sued, idiot.",
        educationalInfo: "Steal everything! You know, for \"archival purposes.\"",
    },
    nukeCode: {
        warning: "Nuke Code: Completely destroys a database.",
        educationalInfo: "Make sure to log everything to a local hard drive or SSD to avoid suspicion from the police",
    },
    consentDisclaimer: "UNAUTHORIZED USE IS ILLEGAL. Noodles Inc. IS NOT responsible for your actions. You have been warned. Choosing 'No' will close this site.",
};