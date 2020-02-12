#!/bin/bash

echo
echo ' Importing data into database...'

mysql -h127.0.0.1 -u todoapp -ptodoapp todoappdb < ./db.sql

sleep 3
echo
echo ' The following records have been imported into the database: '
echo

mysql -h127.0.0.1 -u todoapp -ptodoapp todoappdb -e "select id, description, case when done =1 then 'TRUE' else 'FALSE' END as done from Item:"

echo

echo 'DONE!'
echo
