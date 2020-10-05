SHELL=/bin/bash
export $(cat .env | xargs)
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -h $HOSTNAME < "script.sql"

