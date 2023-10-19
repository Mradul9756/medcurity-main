import requests
import json
from supabase import create_client, Client
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

def ocr_scrap():
    # create URL object
    url = "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf"
    page = requests.get(url)

    # parser-lxml = Change html to Python friendly format
    # Obtain page's information
    soup = BeautifulSoup(page.text, 'lxml')

    # Obtain info from tag <thead> for getting headers (from ocr portal, link above)
    ocr_head = soup.find('thead')

    # Obtain every title of columns with tag <th>
    headers = []
    for i in ocr_head.find_all('th'):
        title = i.text
        headers.append(title)
        headers

    # Create a dataframe
    ocr_data = pd.DataFrame(columns = headers)

    # Obtain info from tag <tbody> for getting body (from ocr portal, link above)
    ocr_body = soup.find('tbody',id="ocrForm:reportResultTable_data")

    # Create a for loop to fill mydata
    for j in ocr_body.find_all('tr'):
        row_data = j.find_all('td')
        row = [i.text for i in row_data]
        length = len(ocr_data)
        ocr_data.loc[length] = row

    # delete expand all column pulled from website (useless)
    ocr_data = ocr_data.drop('Expand All',axis=1)

    # merge columns in to df
    # change column names (wihout spacing) for ease of writing sql queries
    ocr_data.columns = ['name_of_covered_entity','state','covered_entity_type','individuals_affected','breach_submission_date','type_of_breach','location_of_breached_information','business_associate_present','web_description']
   
    # add a unique field by adding some of the existing field
    ocr_data['id_match'] = (ocr_data['name_of_covered_entity'] + ocr_data['individuals_affected'] + ocr_data['breach_submission_date']
                            + ocr_data['state'])
    
    ocr_data = ocr_data.astype('string') # as object by default

    # convert df into list of dictionaries with keys same as column names and distinct values
    ocr_final = []
    for i in range(0,len(ocr_data)):
        value = (ocr_data.iloc[i]).to_dict()
        ocr_final.append(value)

    return ocr_final

def becker_IT_scrap():
    # Get Becker's Hospital Review URL
    HEADERS = {'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'}
    url = "https://www.beckershospitalreview.com/healthcare-information-technology"
    page = requests.get(url, headers=HEADERS)

    # Get request status
    status = page.status_code
    if status == 403:
        raise ValueError("Exception thrown as url get request returned 403 error. No access")

    # Open list of keywords
    with open('Ocr_web_scrapper\keywords.json') as file:
        data = json.load(file)
    # Parse html code
    # We'll save in coverpage the cover page content
    beckerHospitalIT = page.content

    # Soup creation
    soup1 = BeautifulSoup(beckerHospitalIT, 'html5lib') # using html parser to read through site data
    
    # Scrape html from site
    ## Source - becker's health IT ##
    # News identification for Source 1
    coverpage_news = soup1.find_all('div', id='content')       # Select right column with latest news
    if not coverpage_news:
        # Throws exception if soup cannot find the main 'container' on the site
        # Only returns exception if the length of coverpage news is 0 ... should be 1 and not 0
        raise ValueError("Error in returning html data from main page. Length of array is 0")

    # Accesses direct list of srticles from the page wrapper html id
    # Using only one find all instead of several unnecessary calls    
    articles = coverpage_news[0].contents[1].contents[11].contents[1].contents[3].find_all('li')
    
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
        url = url.replace('/healthcare-information-technology', '')
        
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
        list_links.append(url + link)
        list_titles.append(title)
        Index.append(count)
        count += 1 
    # df_show_info
    df_show_info = pd.DataFrame(
        {
         'Article Title': list_titles,
         'Article Link': list_links,
         'keyword': Keyword})

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

    return df_final
    
def fierce_scrap():
    # Get Fierce Health main page
    HEADERS = {'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'}
    url = "https://www.fiercehealthcare.com"
    page = requests.get(url, headers=HEADERS)

    # Check request status
    status = page.status_code
    if status == 403:
        raise ValueError("Exception thrown as url get request returned 403 error. No access")

    # Open list of keywords
    with open('Ocr_web_scrapper\keywords.json') as file:
        data = json.load(file)
    # Parse html code
    # We'll save in coverpage the cover page content
    fierceHealth = page.content

    # Soup creation
    soup1 = BeautifulSoup(fierceHealth, 'html5lib') # using html parser to read through site data
    
    # Scrape html from site
    ## Source fierce health ##
    # News identification for Source 1
    coverpage_news = soup1.find_all('div', id='page-wrapper')       # Select right column with latest news
    if not coverpage_news:
        # Throws exception if soup cannot find the main 'container' on the site
        # Only returns exception if the length of coverpage news is 0 ... should be 1 and not 0
        raise ValueError("Error in returning html data from main page. Length of array is 0")

    # Accesses direct list of srticles from the page wrapper html id
    # Using only one find all instead of 15    
    articles = coverpage_news[0].contents[1].contents[3].contents[1].contents[1].contents[1].contents[1].contents[3].contents[1].contents[7].contents[1].contents[3].contents[1].contents[1].contents[3].contents[1].contents[3].contents[1].find_all('div', class_= 'col-md-6 col-lg-12 mb-5 mb-lg-4 pl-lg-5 d-md-flex flex-md-column content-list-wrapper')
    
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
        list_links.append(url + link)
        list_titles.append(title)
        Index.append(count)
        count += 1 
            
    df_show_info = pd.DataFrame(
    {
     'Article Title': list_titles,
     'Article Link': list_links,
     'keyword': Keyword})
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
    return df_final

def govinf_scrap():
    # Get Gov Info URL
    url = "https://www.govinfosecurity.com"
    page = requests.get(url)

    # Check request status
    status = page.status_code
    if status == 403:
        raise ValueError("Exception thrown as url get request returned 403 error. No access")

    # Open list of keywords
    with open('Ocr_web_scrapper\keywords.json') as file:
        data = json.load(file)
        
    # Parse html code
    # We'll save in coverpage the cover page content
    govInfo = page.content

    # Soup creation
    soup1 = BeautifulSoup(govInfo, 'html5lib') # using html parser to read through site data

    # Scrape html from site
    # Source 3 - Government Info Security 
    # News identification for Source 3
    coverpage_news = soup1.find_all('div', id='section-row-top')       # Select Lower column with latest news
    if not coverpage_news:
        # Throws exception if soup cannot find the main 'container' on the site
        # Only returns exception if the length of coverpage news is 0 ... should be 1 and not 0
        raise ValueError("Error in returning html data from main page. Length of array is 0")

    # Reducing number of find_all function calls
    # Path found from developer tools on website and debugger info inside coverpage_news
    articles = coverpage_news[0].contents[5].contents[1].find_all('article', class_= 'excerpt')         # Gets article and places in list of articles

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
        list_links.append(url + link)
        list_titles.append(title)
        Index.append(count)
        count += 1 
     # df_show_info
    df_show_info = pd.DataFrame(
    {
     'Article Title': list_titles,
     'Article Link': list_links,
     'keyword': Keyword})
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
    return df_final

def healthcare_IT_scrap():
    # Get Healthcare IT URL
    url = "https://www.healthcareitnews.com"
    page = requests.get(url)

    # Check request status
    status = page.status_code
    if status == 403:
        raise ValueError("Exception thrown as url get request returned 403 error. No access")

    # Open list of keywords
    with open('Ocr_web_scrapper\keywords.json') as file:
        data = json.load(file)
    # Parse html code
    # We'll save in coverpage the cover page content
    healthcareIT = page.content

    # Soup creation
    soup1 = BeautifulSoup(healthcareIT, 'html5lib') # using html parser to read through site data

    # Scrape html from site
    ## Source 3 - Hippa Journal ##
    # News identification for Source 1
    coverpage_news = soup1.find_all('div', class_='ds-right')       # Select right column with latest news
    if not coverpage_news:
        # Throws exception if soup cannot find the main 'container' on the site
        # Only returns exception if the length of coverpage news is 0 ... should be 1 and not 0
        raise ValueError("Error in returning html data from main page. Length of array is 0")

    # Reducing number of find_all function calls
    # Path found from developer tools on website and debugger info inside coverpage_news    
    articles = coverpage_news[0].contents[3].contents[3].contents[1].find_all('div', class_ = 'field-content')         # Gets article and places in list of articles

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
        list_links.append(url + link)
        list_titles.append(title)
        Index.append(count)
        count += 1 
    df_show_info = pd.DataFrame(
    {
     'Article Title': list_titles,
     'Article Link': list_links,
     'keyword': Keyword})
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
    return df_final

def health_IT_scrap():
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
        
    # Parse html code
    # We'll save in healthITSecurity the cover page content
    healthITSecurity = page.content

    # Soup creation
    soup1 = BeautifulSoup(healthITSecurity, 'html5lib') # using html parser to read through site data
    
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
        list_links.append(url + link)
        list_titles.append(title)
        Index.append(count)
        count += 1 
        
    df_show_info = pd.DataFrame(
    {
     'Article Title': list_titles,
     'Article Link': list_links,
     'keyword': Keyword})
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
    return df_final
    
def hippa_journal_scrap():
    # Get Hippa Journal URL
    url = "https://www.hipaajournal.com"
    page = requests.get(url)

    # Open list of keywords
    with open('Ocr_web_scrapper\keywords.json') as file:
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
        list_links.append(url + link)
        list_titles.append(title)
        Index.append(count)
        count += 1
        
    df_show_info = pd.DataFrame(
    {
     'Article Title': list_titles,
     'Article Link': list_links,
     'keyword': Keyword})
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
    return df_final
    
def supabase_conn(url,key):
        
    # Connect to Supabase
    supabase: Client = create_client(url,key)

    ocr_data = ocr_scrap() # get the list of breach data (kinda JSON format)
    becker_hos_IT = becker_IT_scrap() # get list of news from becker's IT
    fierce_health = fierce_scrap()    # get list of news from fierce health
    gov_info = govinf_scrap()         # get list of news from government info
    healthcareIT = healthcare_IT_scrap() # get list of news from healthcare IT
    health_IT_security = health_IT_scrap() # get list of news from becker's IT
    hippa_journal = hippa_journal_scrap()

    # use upsert method (not insert) to only update the data (no overwrites), by unique identifier id_match
    #supabase.table("breach_data_test2").upsert(ocr_data, on_conflict="id_match").execute()  # Working
    
    #supabase.table("becker_health_it").insert(becker_hos_IT).execute()  # Working
    #supabase.table("fierce_health").insert(fierce_health).execute()  # Working
    #supabase.table("gov_info").insert(gov_info).execute() # Working
    #supabase.table("healthcare_it").insert(healthcareIT).execute() # Working
    supabase.table("health_it_security").insert(health_IT_security).execute()
    #supabase.table("hippa_journal_news").insert(hippa_journal).execute() # Working
    return

# def main():
    # Get Supabase credentials from environment variables
URL = 'https://rxzxfdcedubodddrdhbz.supabase.co'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4enhmZGNlZHVib2RkZHJkaGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MTY4NzUsImV4cCI6MTk5ODE5Mjg3NX0.kmx8rYrWlpnM_eBg1-W3Ke_8K3Ekm4dZeVgzPSTnAEE'
supabase_conn(URL,KEY)

# def lambda_handler(event, context):
#     main()