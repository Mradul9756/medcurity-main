# Medcurity News Site Scrapers

Welcome to the Medcurity News Site html scrapers! Found in this parent folder are Python files and Jupyter Notebook Files.

Sources used are as follows:
- `https://proxyscrape.com/blog/web-scraping-for-news-articles-using-python`
- `https://stackoverflow.com/questions/53513/how-do-i-check-if-a-list-is-empty`
- `https://scrapeops.io/web-scraping-playbook/403-forbidden-error-web-scraping/`
- `https://stackoverflow.com/questions/256222/which-exception-should-i-raise-on-bad-illegal-argument-combinations-in-python`
- `https://realpython.com/python-string-contains-substring/#find-a-substring-in-a-pandas-dataframe-column`

## Getting Started

If python is not installed on your computer, please do so to compile code and install necessary libraries. For files in both the "Python Files" and "Jupyter Notebooks" the following libraries need to be installed in your local environment.
- requests
- Beautifulsoup
- pandas
- numpy

These libraries can be installed from the terminal using the following commands as long as Python is in your path.

`pip install requests`
`pip install Beautifulsoup`
`pip install pandas`
`pip install numpy`
`pip install json`
`pip install supabase`

OR

`py -m pip install requests`
`py -m pip install Beautifulsoup`
`py -m pip install pandas`
`py -m pip install numpy`
`py -m pip install json`
`py -m pip install supabase`

## Python Files

Python files can be run and debugged through your IDEs debugger console or by typing the name of the file in the terminal (myfile.py). Each of these files should return a list of news article titles and urls to the specific article page.

## Jupyter Notebooks

Jupyter Notebooks run python code in a slightly different format. The functionality of the Jupyter notebooks allows us to use dataframes of which contain a similar list of news article titles and urls. This allows the user to view the information in a readable table, which is then pushed into the database of articles. To run or debug these files the user can select "run all" or press the "play" button at the bottom of an individual cell. Variables can be found in the Jupyter: Variables tab of your IDE.

## Key Words

The Keywords json file contains a list of keywords to be looking for in terms of relevant news articles. When the scrapers scrape on the daily trigger the scraper will ONLY grab articles of which the title contains a keyword. The keyword located by the scraper will be placed into the database as additional information that can be queried.

## Database Integration

SQL Integration is no longer being used as the project has been moved to Supabase for the backend database.  

## Maintinence 

There could potentially be issues later down the line as far as the news scrapers go. If a site decides to restructure or rename their html components, the news scrapers WILL NOT FUNCTION as intended. This will most likely need to be debugged using the jupyternotebook files in order to figure out what the error is. The easiest way to fix these issues is to pull open the problematic site and inspect the contents while having the debugger open. This way you can trace the exact location of the information that is desired. There are exception calls inside each function so problems should identify themselves while debugging. There may be a way to automate these scrapers when changes occur on the number of sites initially provided.

## AWS / Python Maintinence

The Lambda function currently is under Monty's account. The scripts will either need to be shared with Josh at Medcurity, or find a way to transfer the account over. The Lambda function is being run daily using a cron job. This was implemented by using AWS Event Bridge and using AWS cloud 9 to import the necessary libraries. The estimate per month for this method is about 14 cents per month. This single script is currently set to update all tables in one fell swoop. However, it could be beneficial later to separate these so that way if one breaks the others are still able to run. The cloud9 and Event Bridge should not need to be changed much if at all. At most the Lambda function that contains the finction calls for each site will need to be updated/ changed.
