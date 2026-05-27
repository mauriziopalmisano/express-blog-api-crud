import { ChatAnthropic } from "@langchain/anthropic";
import { createAgent, HumanMessage, tool } from "langchain";
import { z } from "zod";
import { mailSender } from "./utils/mailsender.js";

const mailSenderTool = tool(mailSender, {
    name: "mail-sender-tool",
    description: "tool molto utile per inviare mail ad un unico destinatario con soggetto e corpo",
    schema: z.object({
        to: z.string().describe("la mail del destinatario"),
        subject: z.string().describe("il soggetto della mail"),
        body: z.string().describe("il corpo della mail")
    })
});


const model = new ChatAnthropic({
    model: "claude-haiku-4-5-20251001",
    apiKey: process.env.ANTHROPIC_KEY
});

const agent = createAgent({
    model,
    tools: [mailSenderTool]
});

const message = `
invia una mail a Federico all'indirizzo mail acker.federico@gmail.com 
dove notifichi che la sua iscrizione al gruppo di scambisti anonimi di Trepalle verrá 
rinnovata a brevee non é possibilé chiedere il rimborso, per incompenso puó avere alla modica 
cifra di 50€ una felpa con la scritta 'sono uno scambista e ne sono fiero'.
il tutto deve avere uno tono goliardico e deve essere comprensibile che sia uno scherzo,
crea della grafica in html e css  per rendere la mail 'spicy'
`;

agent.invoke({
    messages: [
        new HumanMessage(message)
    ]
}).then(aiResponse => {
    console.log(aiResponse);
});