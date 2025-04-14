module.exports = {
  appName: "Noodles",
  version: "1.0",
  description: "A suite of ethical hacking tools for security testing.",
  company: "Noodles Inc",
  disclaimer: "Unauthorized use is illegal. Noodles Inc is NOT responsible for misuse.",
  colorScheme: {
    primary: "#00ff00", // Dark Green
    secondary: "#800080", // Purple
    background: "#000000", // Black
    accent: "#000080", // Dark Blue
    danger: "#ff0000" // Dark Red
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
    warning: "DEFACEMENT TOOL: Use responsibly for security testing ONLY. Unauthorized defacement is ILLEGAL.",
    educationalInfo: "This tool allows you to test website security by modifying its content.  Always obtain explicit permission before using this tool.",
  },
  ddosTool: {
    warning: "DDoS TOOL: Use for stress testing ONLY. Unauthorized DDoS attacks are ILLEGAL.",
    educationalInfo: "This tool simulates a distributed denial-of-service attack to assess a server's resilience. Use with explicit permission only.",
  },
  fileEncryptionTool: {
    warning: "FILE ENCRYPTION TOOL: Protect your data. Misuse for illegal purposes is PROHIBITED.",
    educationalInfo: "This tool encrypts files to protect them from unauthorized access. Remember to store your keys securely.",
  }
};