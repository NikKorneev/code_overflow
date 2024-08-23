import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
	const { question } = await req.json();
	console.log(req?.geo?.country);

	try {
		const response = await fetch(
			"https://api.openai.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
				body: JSON.stringify({
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "system",
							content:
								"You are a knowlegeable assistant that provides quality information.",
						},
						{
							role: "user",
							content: `answer this question in best possible way - ${question}`,
						},
					],
				}),
			}
		);

		const responseData = await response.json();
		const reply = responseData?.choices
			? responseData.choices[0].message.content
			: "{}";

		return NextResponse.json({ reply });
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error: (error as Error).message });
	}
}
