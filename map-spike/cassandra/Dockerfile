FROM datastax/dse-server:6.8.37

ENV DS_LICENSE=accept
ENV AUTO_BOOTSTRAP=true

COPY /bootstrap/development.cql /var/lib/cassandra/cassandra-schema-init.cql
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]