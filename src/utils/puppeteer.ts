import * as fs from 'fs';
import puppeteer from 'puppeteer';

export const launchBrowser = async() => {
	return puppeteer.launch({ 
		headless: false,
		devtools: true 
	});
}

export const createNewPage = async(browser) => {
	return browser.newPage();
} 

export const loadHomePage = async(page, homeUrl) => {
	await page.goto(homeUrl, { waitUntil: 'domcontentloaded' }).catch(err => {
		console.log(`Error occured while loading home URL... ERROR: ${err}`);
	})
}

export const downloadPDF = async (page, pdfUrl) => {
	const resp = await page.evaluate(async (url) => {
		const fetchRes = await window.fetch(url, { credentials: 'include' });
		const byteArray = await fetchRes.arrayBuffer();
		let res = '';
		const uintArray = new Uint8Array(byteArray);
		for(let i = 0; i <uintArray.length; i++) {
			res += (String.fromCharCode(uintArray[i]));
		}

		return {
			body: btoa(res),
			mimeType: fetchRes.headers.get('content-type').split(';')[0].toLowerCase()
		}
	}, pdfUrl);
	
	return {
		body: Buffer.from(resp.body, 'base64'),
		mimeType: resp.mimeType
	}
}

export const writeToFile = (path, pdfData) => {
	fs.writeFileSync(`${__dirname}${path}`, pdfData);
	// fs.writeFileSync(`${__dirname}\\..\\images\\name.pdf`, pdf);
}