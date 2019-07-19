
const argv = require('argv');
const path = require('path');
const log = require('fancy-log');
const fs = require('fs');
const gulp = require('gulp');
const color = require('ansi-colors');

const args = argv.option({
  name: 'theme',
  short: 't',
  type: 'string'
}).run();

const basePath = '../DanskeSpil.Website/develop/Website/BuildArtifacts';

/**
 * Copy a file, but wrapped in a promise
 */
function copy(source, dest) {
  return new Promise( (resolve, reject) => {
    
    try {
      fs.copyFile(source, dest, (err) => {
        if (err) {
          reject(`Region: ${args.options.theme} was not found`);
        }

        resolve();
      });
    } catch (err) {
      log('err', err);
    }
  });
}

/**
 * Copy files related to the given region
 **/
function copyRegionBundle() {

  if (!args.options.theme) {
    return Promise.resolve();
  }
  
  const scriptsSource = path.join(basePath, 'Scripts/DanskeSpil', `region-${args.options.theme}.html`);
  const scriptsDest = './source/_patterns/00-meta/_region-script-bundle.mustache';
  const scriptsPromise = copy(scriptsSource, scriptsDest).then( (err) => {
    log(`Scripts for ${args.options.theme} copied`);
  });
  
  const stylesSource = path.join(basePath, 'Styles/DanskeSpil', `region-${args.options.theme}.html`)
  const stylesDest = './source/_patterns/00-meta/_region-style-bundle.mustache'; 
  const stylesPromise = copy(stylesSource, stylesDest).then( (err) => {
    log(`Styles for ${args.options.theme} copied`);
  });

  return Promise.all([scriptsPromise, stylesPromise]);
}

function copyCoreBundle() {

  const footerScriptsSource = path.join(basePath, 'Scripts/DanskeSpil/Core', `Footer.html`);
  const footerScriptsDest = './source/_patterns/00-meta/_core-script-footer-bundle.mustache';  
  const footerScriptsPromise = copy(footerScriptsSource, footerScriptsDest).then( (err) => {
    log(`Core footer scripts copied`);
  });


  const headerScriptsSource = path.join(basePath, 'Scripts/DanskeSpil/Core', `Head.html`);
  const headerScriptsDest = './source/_patterns/00-meta/_core-head-scripts-bundle.mustache';
  const headerScriptsPromise = copy(headerScriptsSource, headerScriptsDest).then( (err) => {
    log(`Core head styles copied`);
  });

  const stylesSource = path.join(basePath, 'Styles/DanskeSpil', `Core.html`);
  const stylesDest = './source/_patterns/00-meta/_core-style-bundle.mustache';
  const coreStylesPromise = copy(stylesSource, stylesDest).then( (err) => {
    log(`Core head styles copied`);
  });

  return Promise.all([footerScriptsPromise, headerScriptsPromise, coreStylesPromise]);

}

/**
 * Build a patternlab data file with the currently selected region set as bodyClass
 */
function buildRegionData() {
  
  const source = './source/_data/region.json';
  // Default values for the generated data file
  let json = {
    bodyClass: `region-unknown`,
    topNavigationTheme: `top-navigation-theme-unknown`,
    areaClass: `unknown-area`
  }

  // We have a theme from the command line
  if (args.options.theme) {

    // When a region needs custom classes for area and topnavigation
    let classLookup = {
      'avalon-bingo': {
        areaClass: 'bingo-avalon',
        topNavigationTheme: 'top-navigation-theme-bingo'
      },
      'avalon-keno': {
        areaClass: 'keno-avalon',
        topNavigationTheme: 'top-navigation-theme-keno'
      },
      'avalon-livecasino': {
        areaClass: 'content-area avalon-area',
        topNavigationTheme: 'top-navigation-theme-livecasino'
      },
      'avalon-oddset': {
        areaClass: 'content-area avalon-area',
        topNavigationTheme: 'top-navigation-theme-oddset'
      }
    };

    json = {
      bodyClass: `region-${args.options.theme}`,
      topNavigationTheme: classLookup[args.options.theme] ? classLookup[args.options.theme].topNavigationTheme : `top-navigation-theme-${args.options.theme}`,
      areaClass: classLookup[args.options.theme] ? classLookup[args.options.theme].areaClass : `${args.options.theme}-area`
    }  
  }

  return new Promise(( resolve, reject) => {
    fs.writeFileSync(source, JSON.stringify(json));
    resolve();
  })
  

}

module.exports = {
  region: copyRegionBundle,
  core: copyCoreBundle,
  buildBundleData: buildRegionData
}
