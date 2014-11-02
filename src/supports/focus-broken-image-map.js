define(function defineSupportsFocusBrokenImageMap(require) {
  'use strict';

  var detectFocus = require('./detect-focus');
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
  var canFocusBrokenImageMaps = detectFocus('div', function(element) {
    element.innerHTML = '<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#broken-image-map-test" alt="" src="data:image/png;base64,broken-image-test">';
      return element.querySelector('area');
  });

  return canFocusBrokenImageMaps;
});