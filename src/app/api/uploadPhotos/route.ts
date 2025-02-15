import { url } from "inspector";
import { NextResponse } from "next/server";
import OpenAI from 'openai'; 

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

async function analyzePhotos(photos: string[]) {
	const toAnalyze = photos[0];
	const base64Photo = Buffer.from(toAnalyze, 'binary').toString('base64');

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini", 
			messages: [
				{
					role: "system",
					content: "You are an AI that analyzes images and provides insights.",
				},
				{
					role: "user",
					content: [
						{
							type: "text",
							text: "Analyze this image and describe its contents.",
						},
						{
							type: "text",
							text: "hello",
						},
					],
				},
			],
			max_tokens: 300,
		});
		if (response && response.choices && response.choices.length > 0) {
			console.log(response.choices[0].message.content);
			return NextResponse.json(response.choices[0].message.content, { status: 200 });
		}
		throw new Error('Invalid response from OpenAI');
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const fs = require('fs');
		const path = './public/uploads';
		const photoObjects = await request.formData();

		if (!photoObjects) {
			return NextResponse.json('Please upload photos', { status: 400 });
		}

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
			console.log("Directory created.");
		}
		

		const photoNames: string[] = [];
		for (const entry of photoObjects.entries()) {
			const photo = entry[1] as File;
			const buffer = Buffer.from(await photo.arrayBuffer());
			const filename = photo.name.replace(/ /g, '_');
			photoNames.push(filename);
			console.log(`Uploading ${filename}...`);
			try {
				fs.writeFileSync(`${path}/${filename}`, buffer);
			} catch (error) {
				console.log(error);
			}
		}

		const analyzeResult = await analyzePhotos(photoNames);
		console.log(analyzeResult);
		return NextResponse.json({ message: 'Photos uploaded successfully', analysis: analyzeResult }, { status: 200 });
	} catch (error) {
		console.log(error);
		return  NextResponse.json({ message: 'Failed to upload photos', error: error }, { status: 500 });
	}
}