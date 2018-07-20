/**
 * Created by hqer on 2015/4/6.
 */
module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: '<json:package.json>',
        sprite:{
            options:{
                banner:'/*<%=pkg.name %> <%=grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            all:{
                src:"sprite/*.png",
                dest:"dataSeparation/img/sprite.png",
                destCss:"dataSeparation/css/sprite.css"
            }
        }
    });
    grunt.loadNpmTasks("grunt-spritesmith");
    grunt.registerTask('default', ['sprite']);
};
