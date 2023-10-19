# %%
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import json


# Get Hippa Journal URL
url = "https://www.hipaajournal.com"
page = requests.get(url)

# Open list of keywords
with open('keywords.json') as file:
     data = json.load(file)

# Check request status
status = page.status_code
if status == 403:
    raise ValueError("Exception thrown as url get request returned 403 error. No access")

# Parse html code
# We'll save in hippajournal the cover page content
hippaJournal = page.content

# Soup creation
soup1 = BeautifulSoup(hippaJournal, 'html5lib') # using html parser to read through site data

# Scrape html from site
## Source 3 - Hippa Journal ##
# News identification for Source 1
coverpage_news = soup1.find_all('div', class_='latest-news-column latest-news-column-1')       # Select right column with latest news
if not coverpage_news:
    # Throws exception if soup cannot find the main 'container' on the site
    # Only returns exception if the length of coverpage news is 0 ... should be 1 and not 0
    raise ValueError("Error in returning html data from main page. Length of array is 0")

# Reducing number of find_all function calls
# Path found from developer tools on website and debugger info inside coverpage_news   
articles = coverpage_news[0].contents[1].find_all('h3', class_= 'wp-show-posts-entry-title')  # Gets article and places in list of articles

# Establish the number of articles
num_of_articles = len(articles)
if not num_of_articles:
    # Throws exception if soup cannot find articles in find_all
    # Only returns exception if the length of articles is 0 ... should be more than 0
    raise ValueError("Error in returning html data. Length of array is 0")

Index = []
list_links = []
list_titles = []
Keyword = []
count = 0
added_articles = set()
# for each article in list of scraped articles 
for n in np.arange(0, num_of_articles):
    
    # Getting the link of the article
    link = articles[n].find('a')['href']
    
    # Getting the title
    title = articles[n].get_text()
    title = title.replace('\n', '') # Remove \n
    title = title.replace('\t', '') # Remove \t
    title = " ".join(title.split()) # Remove spaces in front and back of string
    
    found_keyword = False # initialize found_keyword flag
    
# https://www.geeksforgeeks.org/read-json-file-using-python/
# Filter by Keyword inside "data"
    for entry in data:
        if entry['Keyword'] in title:
            Keyword.append(entry['Keyword'])  # Append Found Keyword
            added_articles.add(title)
            found_keyword = True # set found_keyword flag to True
            break
    
    # append 'none' if no keyword was found
    if not found_keyword:
        Keyword.append('none')
    
    # add article information to lists
    list_links.append(link)
    list_titles.append(title)
    Index.append(count)
    count += 1

 # df_show_info
df_show_info = pd.DataFrame(
    {'ind': Index,
     'keyword': Keyword,
     'Article Title': list_titles,
     'Article Link': list_links})

df_show_info

df_show_info = df_show_info.drop_duplicates()
    
    # merge columns in to df
    # change column names (wihout spacing) for ease of writing sql queries
df_show_info.columns = ['title','url','keyword']
    
df_show_info = df_show_info.astype('string') # as object by default
    # convert df into list of dictionaries with keys same as column names and distinct values
df_final = []
for i in range(0,len(df_show_info)):
    value = (df_show_info.iloc[i]).to_dict()
    df_final.append(value)
#return df_final

