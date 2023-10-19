# OCR Portal Web Scraping Script Documentation
This documentation provides an overview of a Python web scraping script that extracts data from the OCR Portal website and inserts it into a Supabase database.

## Package Dependencies
The script requires the following packages to be installed:

* requests: Used for making HTTP requests to fetch the web page.
* supabase: Provides the client for connecting to the Supabase database.
* bs4 (Beautiful Soup): Used for parsing the HTML content of the web page.
* pandas: Used for data manipulation and creating a DataFrame.
Make sure these packages are installed before running the script.

## Function ocr_scrap()
This function performs the web scraping operation to extract data from a specific URL (https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf). It returns the scraped data in a specific format.

### Steps:

* Create a URL object with the target URL.
* Send an HTTP GET request to the URL and store the response in the page variable.
* Create a BeautifulSoup object to parse the HTML content of the page using the 'lxml' parser.
* Extract the headers of the table from the <thead> tag.
* Create an empty DataFrame (ocr_data) with the extracted headers as column names.
* Extract the table body from the <tbody> tag.
* Iterate over each row (<tr>) in the table body.
* Extract the data from each cell (<td>) in the row and store it in a list (row).
* Add the row data as a new row to the ocr_data DataFrame.
* Remove the "Expand All" column from the DataFrame.
* Rename the columns of the DataFrame to remove spaces and make them more SQL-query friendly.
* Create a new column (id_match) by combining certain existing columns to create a unique identifier for each row.
* Convert the data types of the DataFrame columns to strings.
* Convert the DataFrame into a list of dictionaries (ocr_final) where each dictionary represents a row in the DataFrame with keys as column names and values as row values.
* Return the ocr_final list.

## Function supabase_conn(url, key)
This function establishes a connection to the Supabase database and inserts the scraped data.

### Arguments:
* url: The URL of the Supabase project.
* key: The Supabase project API key.

### Steps:
* Create a Supabase client object using the provided url and key.
* Call the ocr_scrap() function to obtain the scraped data in the desired format.
* Use the upsert method to insert the data into the "breach_data" table in the Supabase database, using the unique identifier column "id_match" to avoid overwriting existing data.
* Execute the upsert operation.

## Function main()
This function serves as the entry point for the script. It retrieves the Supabase credentials from environment variables, calls the supabase_conn() function to insert the data, and handles the execution flow.

## Function lambda_handler(event, context)
This function is a placeholder for the Lambda function handler. It calls the main() function, which initiates the data insertion process.

### Note:
* Before running the script, make sure to replace the placeholder Supabase URL and key (URL and KEY variables in the script) with the actual values corresponding to your Supabase project.
* Ensure you have the necessary permissions and configurations set up in your Supabase project to establish a connection and insert data into the "breach_data" table.
