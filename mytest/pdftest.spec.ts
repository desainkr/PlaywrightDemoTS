import { test, expect } from "@playwright/test";
import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import * as pdf from "pdf-parse"



test('pdf testing', async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/pages/extra-components/pdf-download");

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download PDF' }).click()
    ])
    const filePath = await download.path();
    const buffer = fs.readFileSync(filePath!);

    // ✅ Create instance
    const parser = new PDFParse({ data: buffer });

    // ✅ Extract text
    const result = await parser.getText();

    const pdfText = result.text;

    console.log(pdfText);

    // Assertions
    expect(pdfText).toContain("Invoice number:");
    expect(pdfText).toMatch(/Total\s+USD\s+\$\d+\.\d{2}/);

    // 4️⃣ Assertions
    expect(pdfText).toMatch(/Invoice number:\s*\d{6}/);
    expect(pdfText).toMatch(/Total\s+USD\s+\$\d+\.\d{2}/);
    /*
    Step-by-Step Explanation of the New Lines
    1️⃣ Get the downloaded file path
    const filePath = await download.path();
    
    
    👉 Playwright saves the downloaded file in a temporary folder.
    This gives you the full system path like:
    
    C:\Users\...\AppData\Local\Temp\playwright-download-xxxx.pdf
    
    2️⃣ Convert file into a Buffer
    const buffer = fs.readFileSync(filePath!);
    
    
    👉 PDFs are binary files.
    readFileSync() loads it into memory as raw binary data (Buffer).
    
    Think of Buffer as:
    
    “The actual PDF file content in memory.”
    
    3️⃣ Create PDFParse instance
    const parser = new PDFParse({ data: buffer });
    
    
    Because you are using:
    
    import { PDFParse } from 'pdf-parse';
    
    
    You must pass:
    
    { data: buffer }
    
    
    This tells the parser:
    
    “Don’t fetch from URL. Use this binary PDF data.”
    
    4️⃣ Extract text
    const result = await parser.getText();
    const pdfText = result.text;
    
    
    Now pdfText contains the extracted content.
    
    🧠 Why These Steps Were Necessary
    
    When downloading via Playwright:
    
    Browser → downloads file
    Playwright → captures file
    Node → must read it
    PDFParse → needs raw binary
    
    So the chain is:
    
    Download → File Path → Buffer → PDFParse → Text → Assertions
    */

    /* //const parser= new PDFParse({url:'C://Users//desai//Documents//PlaywrightDemoTS//PlaywrightCheatsheet.pdf'});
     const parser = new PDFParse({ url: 'https://www.princexml.com//samples//invoice-plain//index.pdf' });
     const result = await parser.getText();
     // Full PDF text
     const pdfText = result.text;
     //console.log(pdfText);
     //Invoice Date Format
     expect(pdfText).toContain("Invoice date: Nov 26, 2016");
     //expect(pdfText).toMatch(/Invoice date:\s*[A-Za-z]{3}\s\d{1,2},\s\d{4}/); If the invoice date changes dynamically (e.g., today's date)
     // Validate invoice identity
     expect(pdfText).toMatch(/Invoice number:\s*\d{6}/);
      Invoice number:   → literal text
       \s*               → zero or more spaces
       \d{6}             → exactly 6 digits 
     // Validate financial correctness
     expect(pdfText).toMatch(/Total\s+USD\s+\$\d+\.\d{2}/);
     
         Total          → literal word
         \s+            → one or more spaces
         USD            → currency code
         \s+            → space(s)
         \$             → literal $ (must escape it)
         \d+            → one or more digits
         \.             → decimal point (escaped)
         \d{2}          → exactly 2 decimal digits
     */

})