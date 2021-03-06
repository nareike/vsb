(function () {
    'use strict';
    angular.module('VSB.filters', ['VSB.config'])
        .filter('replaceURIsWithPrefixes', replaceURIsWithPrefixes)
        .filter('beautifySPARQL', beautifySPARQL);

    function replaceURIsWithPrefixes(globalConfig) {
        return function (string) {
            if(!_.isString(string)){
                return string;
            }
            for (var key in globalConfig.prefixes) {
                if (globalConfig.prefixes.hasOwnProperty(key)) {
                    var regex = new RegExp('<?' + globalConfig.prefixes[key] + '(\\w+)>?', 'ig');
                    string = string.replace(regex, key + ':$1');
                }
            }
            return string;
        };
    }

    function beautifySPARQL() {
        return function (string) {
            return string
                .replace(/<http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#type>/ig, 'a')
                .replace(/where\s+/ig, 'WHERE \n')
                .replace(/limit/ig, 'LIMIT')
                .replace(/ +\.\s+/ig, ' .\n')
                .replace(/ +;\s+/ig, ' .\n')
                .replace(/\{/ig, '\n{\n')
                .replace(/}\s+/ig, '\n}\n')
                .replace(/^\?/igm, '\t?')
                .replace(/^FILTER/igm, '\tFILTER')
                .replace(/^BIND/igm, '\tBIND')
                .replace(/select distinct\s+/ig, 'SELECT DISTINCT \n')
                ;
        };
    }
})();