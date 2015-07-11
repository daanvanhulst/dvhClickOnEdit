'use strict';
var GulpConfig = (function () {
    function GulpConfig() {
        this.source = './src/';

        this.distPath = './dist';
        this.allTypeScript = this.source + '**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + 'tsd.d.ts';
        this.appTypeScriptReferences = this.typings + 'app.d.ts';
    
		this.AllLESS = this.source + '**/*.less';
		this.mainLessFile = this.source + 'dvhClickToEdit.less';

        this.AllHTML = this.source + '**/*.html'
	}
    return GulpConfig;
})();
module.exports = GulpConfig;