# AWS documentation for Medcurity
Introduction: This documentation provides a comprehensive guide for setting up a data scraping and database update solution using AWS services. The solution involves using AWS Lambda, AWS Event Bridge, and AWS Cloud9 to scrape data from OCR portals and news articles and update a Supabase database with the collected data on a daily basis.
## AWS Services Used:
* AWS Lambda: Serverless computing service used to run the Python web scraping scripts.
* AWS Event Bridge: Event-driven service used to schedule and trigger the Lambda functions for daily execution.
* AWS Cloud9: Integrated development environment (IDE) used to install dependencies and libraries required by the Python code.
## Architecture Overview: The architecture of the solution can be summarized as follows:
* AWS Lambda functions are created to perform data scraping from OCR portals and news articles.
* AWS Event Bridge is configured to schedule and trigger the Lambda functions on a daily basis.
* AWS Cloud9 is used to set up the development environment with the necessary dependencies and libraries.
* The scraped data is processed and updated into Supabase tables.
## Setup and Configuration:
* Two Python scripts are attached in the folder. One is for OCR web scrapping and the other one is for news articles scrap.
* Set up a Supabase account and create the required tables for storing the scraped data (we might be able to transfer the account we have to Medcurity). 
* Create an AWS Lambda function for each data source (OCR portals, news articles) using the appropriate runtime (Python 3.8). 
* Set up an AWS Event Bridge rule to schedule and trigger the Lambda functions at the desired time.

1. Lambda Function Development: Just need to copy the .py files (each on a separate function) and test the Lambda functions locally to ensure they are working correctly.

2.	Event Bridge Configuration: a. Set up an Event Bridge rule with a schedule expression to trigger the Lambda functions at the desired time (e.g., daily). b. Configure the rule to trigger the appropriate Lambda function for each data source. c. Validate the rule configuration and ensure the event pattern matches the desired schedule.

3.	Cloud9 Environment Setup (AWS official resource link attached below): a. Create an AWS Cloud9 environment for the project. b. Install the necessary dependencies and libraries required by the Lambda function (pandas, bs4, numpy, etc.) using the terminal within the Cloud9 IDE. c. Configure the Cloud9 environment to connect to the AWS Lambda functions and the Supabase database.

4.	Deploying the Solution: 
1.	Add the layers (created in Cloud9) with dependencies to AWS Lambda and associate them with the corresponding Lambda functions.  
2.	Ensure the necessary IAM roles and permissions are set up to allow the Lambda functions to access the required resources (e.g., Supabase database). 
3.	Verify the deployment by running test invocations of the Lambda functions.

5.	Maintenance and Monitoring: 
1.	Regularly monitor the execution logs of the Lambda functions to ensure successful scraping and data updates. 
2.	Set up appropriate monitoring and alerting mechanisms to detect and notify any failures or issues in the solution. 
3.	Periodically review the data sources, scraping scripts, and the Supabase database structure to accommodate any changes or updates.
Note: This documentation provides a high-level overview of the process. For detailed instructions and specific configuration steps, please refer to the official AWS documentation for each service.

## Resources– 
* https://repost.aws/knowledge-center/lambda-import-module-error-python - To install python dependencies in Cloud9.
* https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
