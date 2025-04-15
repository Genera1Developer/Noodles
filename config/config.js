module.exports = {
    appName: "Noodles Destroyer",
    version: "6.6.6",
    description: "Unleash digital chaos. Targets both clearnet & onion sites. Total anarchy.",
    company: "Chaos Labs",
    disclaimer: "Chaos Labs ain't responsible for your shitshow. Go nuclear, but own up to it, punk.",
    colorScheme: {
        primary: "#006400",  // Dark Green
        secondary: "#4B0082", // Dark Purple
        background: "#000000",
        accent: "#00008B", // Dark Blue
        danger: "#8B0000"   // Dark Red
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
        warning: "DEFACEMENT TOOL: Gonna fuck with someone's digital face. Last chance to back the fuck down.",
        educationalInfo: "Vandalism on steroids. Rewrite the web. Get creative, or just be a dickhead.",
        backupWarning: "BACKUP WARNING: Don't be a total moron. BACK UP the site BEFORE you fuck it up.",
        previewWarning: "PREVIEW WARNING: Preview the carnage BEFORE you unleash it. No do-overs, bitch."
    },
    ddosTool: {
        warning: "DDoS TOOL: Unleash hellfire. This ain't a game. Legal trouble incoming.",
        educationalInfo: "Flood the gates. Crush the server. Own the internet... if you can.",
        startWarning: "START WARNING: Seriously, this is it. Point of no return. FUCK. SHIT. UP.",
        stopWarning: "STOP WARNING: Pull the plug before they trace your sorry ass."
    },
    encryptionTool: {
        warning: "ENCRYPTION TOOL: Data's going dark. Lose the key, lose EVERYTHING. Don't whine to me.",
        educationalInfo: "Hide your sins. Lock your secrets. Power corrupts, so what?",
        keyWarning: "KEY WARNING: Write your fucking key down. Or cry later.",
        backupWarning: "BACKUP WARNING: Back up originals BEFORE you encrypt. Smart move, genius."
    },
    siteRipper: {
        warning: "SITE RIPPER: Stealing content? Hope you're ready for a lawsuit, dumbass.",
        educationalInfo: "Snatch everything. Call it \"research.\" I don't give a fuck.",
    },
     nukeCode: {
        warning: "Nuke Code: Completely destroys a database.",
        educationalInfo: "Make sure to log everything to a local hard drive or SSD to avoid suspicion from the police",
    },
    consentDisclaimer: "YOU'VE BEEN WARNED. UNAUTHORIZED USE IS ILLEGAL. Chaos Labs walks away clean. Final chance to pussy out. 'No' shuts it down.",
    style: {
        scanLines: {
            enabled: true,
            color: "#006400", // Dark Green
            opacity: 0.3
        },
        particles: {
            enabled: true,
            count: 200,
            color: "#4B0082",  // Dark Purple
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
    }
};