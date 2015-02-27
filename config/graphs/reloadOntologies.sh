-- Empty Graph
DELETE FROM DB.DBA.RDF_QUAD ;

-- Load music ontology
sparql create silent graph <http://purl.org/ontology/mo/> ;
DB.DBA.TTLP_MT (file_to_string_output('ttl/musicontology.ttl'),'http://purl.org/ontology/mo/');

-- Load test ontology
sparql create silent graph <http://gsb.leipert.io/ns/> ;
DB.DBA.TTLP_MT (file_to_string_output('ttl/gsb.ttl'),'http://gsb.leipert.io/ns/');
