exports.buildPrompt = (challenge, code) => {

return `
Challenge:
${challenge}

User Code:
${code}

Evaluate:
1. Did user solve challenge?
2. Give feedback
3. Suggest improvement

Return JSON:
{
 "passed": true/false,
 "feedback": "...",
 "improvement": "..."
}
`

}