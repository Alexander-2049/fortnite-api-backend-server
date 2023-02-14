# fortnite-api-backend-server
Caching results, tracking loot history.

.env
```
API-KEY="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX" # required (fortniteapi.io)
SECONDS-BETWEEN-UPDATES=300 # 30 by default
PORT=4747 # 4747 by default
SESSION-DETAILS-LIMIT-ENABLED=true # true by default. true allows to get only active events to prevent huge amount of requests.
```