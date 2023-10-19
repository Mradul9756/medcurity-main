# %%
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import json

# %%
# Get Health IT Security URL
url = "https://www.healthitsecurity.com"
HEADERS = {'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'}
page = requests.get(url, headers=HEADERS)

# Check request status
status = page.status_code
if status == 403:
    raise ValueError("Exception thrown as url get request returned 403 error. No access")

# Open list of keywords
with open('keywords.json') as file:
     data = json.load(file)

# %%
# Parse html code
# We'll save in healthITSecurity the cover page content
healthITSecurity = page.content

# Soup creation
soup1 = BeautifulSoup(healthITSecurity, 'html5lib') # using html parser to read through site data

# %%
# Scrape html from site
## Source 3 - Hippa Journal ##
# News identification for Source 1
coverpage_news = soup1.find_all('div', class_='wrapper')       # Select right column with latest news
if not coverpage_news:
    # Throws exception if soup cannot find the main 'container' on the site
    # Only returns exception if the length of coverpage news is 0 ... should be 1 and not 0
    raise ValueError("Error in returning html data from main page. Length of array is 0")

# Reducing number of find_all function calls
# Path found from developer tools on website and debugger info inside coverpage_news    
articles = coverpage_news[0].contents[1].contents[1].contents[5].contents[1].find_all('div', class_='row')

# %%
# Establish the number of articles
num_of_articles = len(articles)
if not num_of_articles:
    # Throws exception if soup cannot find articles in find_all
    # Only returns exception if the length of articles is 0 ... should be more than 0
    raise ValueError("Error in returning html data. Length of array is 0")

# %%
Index = []
list_links = []
list_titles = []
Keyword = []
count =0 

# for each article in list of scraped articles  
for n in np.arange(0, num_of_articles):
    
    # Getting the link of the article
    link = articles[n].find('a')['href']
    
    # Getting the title
    title = articles[n].get_text()
    title = title.replace('\n', '') # Remove \n
    title = title.replace('\t', '') # Remove \t
    
# https://www.geeksforgeeks.org/read-json-file-using-python/
# Filter by Keyword inside "data"
    for entry in data:
        if entry ['Keyword'] in title:
            list_links.append(link)     # add link to links
            list_titles.append(title)         # add title to titles
            Index.append(count)                   # Append Index
            count += 1 
            Keyword.append(entry['Keyword'])  # Append Found Keyword
    
            break


# %%
 # df_show_info
df_show_info = pd.DataFrame(
    {'ind': Index,
     'keyword': Keyword,
     'Article Title': list_titles,
     'Article Link': list_links})

df_show_info

# %%
import pymysql

# Connect to the database
connection = pymysql.connect(host='localhost',
                         user='root',
                         password='password',
                         db='medcurity-db')

# create cursor
cursor=connection.cursor()

data = df_show_info

# %%
# add rows/tuples into table (append procees no overwrite)
# df_show_info.columns = ['ind','keyword', 'articleTitle','articleLink']
cols = "`,`".join([str(i) for i in data.columns.tolist()])
for i,row in data.iterrows():
    
    # Extract the relevant data from each row
    title = row['Article Title'].replace("'", "''")
    url = row['Article Link']
    
    # Construct the SQL query string with placeholders for the variables
    sql = "CALL insert_news_article('{}', '{}');".format(title, url)
    
    # Execute the SQL query string using the database cursor
    cursor.execute(sql)
    
    # Commit the changes to the database
    connection.commit()


