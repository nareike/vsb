'use strict';

/*
 * Subject directive
 * Creates the possibility to use a <subject> element,
 * which will be replaced with the contents of template/subject.html
 * Additionally a subject directive uses it's own scope which is needed,
 * so that each subject can hold it's own property list
 */

angular.module('GSB.directives.subject', [])

    .directive('subject', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            subject: '='
        },
        templateUrl: 'template/subject.html'
    }
})