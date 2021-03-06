module.exports = {
  "cacheBust": true,
  "cleanPublic": true,
  "defaultPattern": "all",
  "defaultShowPatternInfo": false,
  "ishControlsHide": {
    "s": false,
    "m": false,
    "l": false,
    "full": false,
    "random": false,
    "disco": false,
    "hay": true,
    "mqs": false,
    "find": false,
    "views-all": false,
    "views-annotations": false,
    "views-code": false,
    "views-new": false,
    "tools-all": false,
    "tools-docs": false
  },
  "ishViewportRange": {
    "s": [
      240,
      500,
      240,
      500
    ],
    "m": [
      500,
      800,
      500,
      800
    ],
    "l": [
      800,
      2600,
      800,
      2600
    ]
  },
  "logLevel": "info",
  "outputFileSuffixes": {
    "rendered": ".rendered",
    "rawTemplate": "",
    "markupOnly": ".markup-only"
  },
  "paths": {
    "source": {
      "root": "source/",
      "patterns": "source/_patterns/",
      "data": "source/_data/",
      "meta": "source/_meta/",
      "annotations": "source/_annotations/",
      "styleguide": "dist/",
      "patternlabFiles": {
        "general-header": "views/partials/general-header.mustache",
        "general-footer": "views/partials/general-footer.mustache",
        "patternSection": "views/partials/patternSection.mustache",
        "patternSectionSubtype": "views/partials/patternSectionSubtype.mustache",
        "viewall": "views/viewall.mustache"
      },
      "js": "source/js",
      "images": "source/images",
      "fonts": "source/fonts",
      "css": "source/css"
    },
    "public": {
      "root": "public/",
      "patterns": "public/patterns/",
      "data": "public/styleguide/data/",
      "annotations": "public/annotations/",
      "styleguide": "public/styleguide/",
      "js": "public/js",
      "images": "public/images",
      "fonts": "public/fonts",
      "css": "public/css"
    }
  },
  "patternExtension": "mustache",
  "patternStateCascade": [
    "inprogress",
    "inreview",
    "complete",
    "inprogress",
    "inreview",
    "complete"
  ],
  "patternExportDirectory": "pattern_exports",
  "patternExportPatternPartials": [],
  
	"serverOptions": {
    "port": 3000,
		"wait": 1000,
    "noCssInject": true,
    mount: [
      ['/Components', '../DanskeSpil.Website/develop/Website/Components'],
      ['/BuildArtifacts', '../DanskeSpil.Website/develop/Website/BuildArtifacts']
    ],
		proxy: [
      ["/mockapi", "http://127.0.0.1:3010/mockapi"],
      ['/dli', 'http://127.0.0.1:3010/mockapi'],
      ['/dlo', 'http://127.0.0.1:3010/mockapi'],
      ['/evolutionGaming', 'http://127.0.0.1:3010/mockapi/evolutionGaming']
		]
	},
  "starterkitSubDir": "dist",
  "styleGuideExcludes": [],
  "theme": {
    "color": "dark",
    "density": "compact",
    "layout": "horizontal"
  },
  "uikits": [
    {
      "name": "uikit-workshop",
      "outputDir": "",
      "enabled": true,
      "excludedPatternStates": [],
      "excludedTags": []
    }
  ]
}
