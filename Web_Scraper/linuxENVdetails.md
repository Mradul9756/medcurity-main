# Linux Hosting w/ python web scrapers

This project contains several web-scrapers that utilize python to fetch information from the web. In our decision to use PowerBI inside our project, there is potential that the graph integration will no longer work if the site is deployed on a Linux instance as PowerBI is not Linux compatible. We anticipate that this will not be an issue, however, with the possibility that this problem arises we wanted to outline potential solutions to this problem as well as how to schedule cron jobs for the news information.

## Scheduling Cron Jobs with Linux/ Python
Resources include:
- https://towardsdatascience.com/how-to-schedule-python-scripts-with-cron-the-only-guide-youll-ever-need-deea2df63b4e
- https://cronitor.io/guides/python-cron-jobs
- https://crontab.guru/#00_05_*_*_*  Demonstrates scarpers running at 5am

### Why Cron Jobs?
Cron Jobs will provide the host/ user many benefits.   

- Cron Jobs can send confirmation to email when completed.
  - This could be useful if the OCR Scraper is removed from the PowerBI dashboard.
- Cron Jobs will not require a database to store news information.
  - All daily news information by keyword will be stored for 1 DAY ONLY so that only the most current information is displayed on the news page.
- Easy to schedule and fairly easy to implement into existing code.


## PowerBI Graphs/ Alternate Solutions
If the problem arises where the PowerBI graphs are no longer rendering on the main page after deployment there are a few alternate solutions.
- React Graphs that query database to apply filters to graphs.
  - This method is a bit more complicated as it requires more pieces that need to work together.
- Alter pyhton script that is scraping the OCR data and implement graphs using `ggplot 2` with either `Python` or `R`
  - This method allows for the developer to save each designed graph as a png file, which can then be embedded into the react app inside a container.
  - There is a way to make these graphs exported as a png to be dynamic and actively change when interacted with, but we have not yet found out how to do this. The graphs are fairly plain from our understanding and research.
  - Sources Include:
    - https://realpython.com/ggplot-python/
    - Dr. Kent Jones (Whitworth University)
    - https://datacarpentry.org/R-ecology-lesson/04-visualization-ggplot2.html#ggplot2_themes



### PowerBI
PowerBI provides the powerful ability to scrape the government breach data straight from the site, and create dynamic graphs in a report. Currently, this report is embedded in our site. One of the biggest draws to using PowerBI is that it provides a friendly User Interface (UI) in the web application. This will allow those who will be managing the site, to functionally display their own interpertations from the data and have it displayed on the site. Since the majority of users will not be developers, this option makes the application more accessible and usable.
This will allow anyone who has access to the PowerBI web-portal to manipulate the data as needed for marketing, presentations & webinars, and research.


### Alternate Graph Solutions to PowerBI
Alternate solutions will not provide as many benefits in terms of accessibility for those maintaining the state of the graphs.

Instead of PowerBI, our team decided to implement React Graphs using charts.js that pull data straight from the table that is integrated in Supabase with all of the OCR data. There were other options that would not have been as asthetic as designing our own graphs such as using the ggplots library with python. These could be integrated directly into the react webpage and do have the potential to be 'dynamic' as required. However, we decided that a more 'on-brand' representation of data within the design scheme of the data-page was more appropriate and fitting.