# counter-strike-knife-stats
A script you can paste in your browser to get the number of cases opened between knives.

Fetches your steam inventory history, and the parses the data to calculate how many cases, capsules & patches you have opened

1. Open one of the links below, depending on if you have a custom url on steam or not
   - URL: https://steamcommunity.com/id/{STEAMURL}/inventoryhistory/?app%5B%5D=730
   - URL: https://steamcommunity.com/profiles/{PROFILEID}/inventoryhistory/?app%5B%5D=730

3. Replace {STEAMURL} or {PROFILEID} with your info and go to the site

4. Once on the page, press F12 and navigate to the console tab

5. Paste the contents of the script.js file into the console
6. Scroll to the bottom of the page, and click on: "Start fetching history"
7. Once the script has finished loading (IT CAN TAKE A WHILE), a text message will appear saying: Finished fetching data!
8. You should now see your stats!
