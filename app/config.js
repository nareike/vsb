(function () {
    'use strict';

    angular.module('VSB.config', [])
        .constant('globalConfig', {
            name: 'STANDARD_CONFIG',
            propertyTypeByType: {
                'http://www.w3.org/2002/07/owl#ObjectProperty': 'RELATION_PROPERTY'
            },
            propertyTypeByRange: {
                'http://vsb.leipert.io/ns/': 'RELATION_PROPERTY',
                'http://xmlns.com/foaf/0.1/': 'RELATION_PROPERTY',
                'http://www.w3.org/2001/XMLSchema#(integer|float|double|decimal|positiveInteger|nonNegativeInteger)': 'NUMBER_PROPERTY',
                'http://www.w3.org/2001/XMLSchema#(string|literal)': 'STRING_PROPERTY',
                'http://www.w3.org/2001/XMLSchema#date': 'DATE_PROPERTY'
            },
            prefixes: {
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'foaf': 'http://xmlns.com/foaf/0.1/',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'vsb': 'http://vsb.leipert.io/ns/'
            },
            resultFormats: [
                {
                    name: 'HTML',
                    format: 'text/html'
                }, {
                    name: 'editable Query',
                    format: 'text/html',
                    qtxt: true
                },
                {
                    name: 'XML',
                    format: 'application/sparql-results+xml'
                },
                {
                    name: 'JSON',
                    format: 'application/sparql-results+json'
                }, {
                    name: 'CSV',
                    format: 'text/csv'
                }, {
                    name: 'TSV',
                    format: 'text/tab-separated-values'
                },
                {
                    name: 'Excel',
                    format: 'application/vnd.ms-excel'
                },
                {
                    name: 'Turtle',
                    format: 'text/turtle'
                },
                {
                    name: 'RDF XML',
                    format: 'application/rdf+xml'
                },
                {
                    name: 'N-TRIPLE',
                    format: 'text/plain'
                },
                {
                    name: 'Javascript',
                    format: 'application/javascript'
                }
            ],
            defaultProperties: [
                {
                    id: 'http://www.w3.org/2000/01/rdf-schema#label',
                    $labels: [{
                        id: 'default',
                        value: 'Label'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'This is the label of this subject.'
                    }],
                    type: 'STRING_PROPERTY'
                },
                {
                    id: '$$uri',
                    $labels: [{
                        id: 'default',
                        value: 'uri'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'The uri of this subject.'
                    }],
                    type: 'STRING_PROPERTY'
                }
            ],
            defaultGraphURIs: [],
            baseURL: 'https://leipert.io/sparql',
            resultURL: 'https://leipert.io/sparql?timeout=5000&debug=on',
            allowedLanguages: ['*', 'de', 'en'],
            fallBackLanguages: ['en'],
            aggregateFunctions: [
                {
                    id: '$$count',
                    $labels: [{
                        id: 'default',
                        value: 'Count property'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'Counts how often a subject has a certain property.'
                    }],
                    operator: 'COUNT(%alias%)',
                    type: 'AGGREGATE_PROPERTY',
                    restrictTo: null
                },
                {
                    id: '$$concat',
                    $labels: [{
                        id: 'default',
                        value: 'Concat property'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'Concats all values of the same property URI.'
                    }],
                    operator: 'GROUP_CONCAT(%alias%,", ")',
                    type: 'AGGREGATE_PROPERTY',
                    restrictTo: null
                },
                {
                    id: '$$sum',
                    $labels: [{
                        id: 'default',
                        value: 'Sum a property'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'Sums up all values a number property.'
                    }],
                    operator: 'SUM(%alias%)',
                    type: 'AGGREGATE_PROPERTY',
                    restrictTo: 'NUMBER_PROPERTY'
                },
                {
                    id: '$$avg',
                    $labels: [{
                        id: 'default',
                        value: 'Average a property'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'Returns the average of a number property.'
                    }],
                    operator: 'AVG(%alias%)',
                    type: 'AGGREGATE_PROPERTY',
                    restrictTo: 'NUMBER_PROPERTY'
                },
                {
                    id: '$$min',
                    $labels: [{
                        id: 'default',
                        value: 'Get minimum of a property'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'Returns the minimum of a number property.'
                    }],
                    operator: 'MIN(%alias%)',
                    type: 'AGGREGATE_PROPERTY',
                    restrictTo: 'NUMBER_PROPERTY'
                },
                {
                    id: '$$max',
                    $labels: [{
                        id: 'default',
                        value: 'Get maximum of a property'
                    }],
                    $comments: [{
                        id: 'default',
                        value: 'Returns the maximum of a number property.'
                    }],
                    operator: 'MAX(%alias%)',
                    type: 'AGGREGATE_PROPERTY',
                    restrictTo: 'NUMBER_PROPERTY'
                }
            ],
            endPointQueries: {
                getDirectProperties: '<%uri%> (rdfs:subClassOf|(owl:equivalentClass|^owl:equivalentClass))* ?class .' +
                '?uri rdfs:domain ?class .' +
                'OPTIONAL { ?uri rdfs:range ?range }  .' +
                'OPTIONAL { ?uri rdf:type ?type }  .' +
                'OPTIONAL { ?uri rdfs:label ?label . BIND(LANG(?label) AS ?label_loc) } .' +
                'OPTIONAL { ?uri rdfs:comment ?comment . BIND(LANG(?comment) AS ?comment_loc) } .' +
                'FILTER ( !isBlank(?class) && !isBlank(?uri) && !isBlank(?range) ) ',
                getInverseProperties: '<%uri%> (rdfs:subClassOf|(owl:equivalentClass|^owl:equivalentClass))* ?class .' +
                '?uri rdfs:range ?class .' +
                'OPTIONAL { ?uri rdfs:domain ?range }  .' +
                'OPTIONAL { ?uri rdf:type ?type }  .' +
                'OPTIONAL { ?uri rdfs:label ?label . BIND(LANG(?label) AS ?label_loc) } .' +
                'OPTIONAL { ?uri rdfs:comment ?comment . BIND(LANG(?comment) AS ?comment_loc) } .' +
                'FILTER ( !isBlank(?class) && !isBlank(?uri) && !isBlank(?range) ) ',
                getSuperAndEqClasses: '<%uri%> (rdfs:subClassOf|(owl:equivalentClass|^owl:equivalentClass))* ?uri ' +
                'FILTER ( !isBlank(?uri) )',
                getSubAndEqClasses: '<%uri%> (^rdfs:subClassOf|(owl:equivalentClass|^owl:equivalentClass))* ?uri ' +
                'FILTER ( !isBlank(?uri) )',
                getAvailableClasses: '{?uri a rdfs:Class .} UNION {?uri a owl:Class .} .' +
                'FILTER ( !isBlank(?uri) )' +
                'OPTIONAL { ?uri rdfs:label ?label . BIND(LANG(?label) AS ?label_loc) } .' +
                'OPTIONAL { ?uri rdfs:comment ?comment . BIND(LANG(?comment) AS ?comment_loc)} ',
                getPossibleRelation: '<%uri1%> (rdfs:subClassOf|(owl:equivalentClass|^owl:equivalentClass))* ?class1 .' +
                '<%uri2%> (rdfs:subClassOf|(owl:equivalentClass|^owl:equivalentClass))* ?class2 .' +
                '{ ' +
                '?uri rdfs:domain ?class1 . ' +
                '?uri rdfs:range ?class2  .' +
                '} UNION { ' +
                '?uri rdfs:domain ?class2 . ' +
                '?uri rdfs:range ?class1  .' +
                '}'
            }
        });
})();