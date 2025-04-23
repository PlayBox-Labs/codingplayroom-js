#!/bin/bash -e

until cqlsh -f /var/lib/cassandra/cassandra-schema-init.cql; do
  echo "######################## Waiting at interval of 20 seconds for DSE to start, before applying schema ########################"
  sleep 20
done &

/entrypoint.sh "dse cassandra -f"