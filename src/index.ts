import { logger } from './utils';
import { launchBrowser, loadHomePage, downloadPDF, writeToFile, createNewPage } from './utils';

const files = [
	{
		homeUrl: 'https://www.acko.com/',
		pdfUrl: 'https://www.acko.com/wp-content/uploads/2020/02/public-disclosure-q3-fy-19-20.pdf',
		path: '\\..\\..\\images\\acko1.pdf'
	},
	{
		homeUrl: 'https://www.acko.com/',
		pdfUrl: 'https://www.acko.com/wp-content/uploads/2020/02/public-disclosure-q3-fy-19-20.pdf',
		path: '\\..\\..\\images\\acko2.pdf'
	}
];

export const run = async (files) => {
	const browser = await launchBrowser();
	const page = await createNewPage(browser);
	for(const file of files) {
		try {
			await loadHomePage(page, file.homeUrl);
			const pdf = await downloadPDF(page, file.pdfUrl);
			writeToFile(file.path, pdf.body);
		} catch(err) {
			logger.error(`An error occured while downloading PDF ${file.pdfUrl}... ERROR: ${err}`);
		}
	}
	await browser.close();
}

run(files);