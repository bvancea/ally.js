define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var queryFocusable = require('ally/query/focusable');

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/focusable.all',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var result = queryFocusable({
          strategy: 'all',
        }).map(fixture.nodeToString);

        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.focusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          '#image-map-area-nolink',
          supports.focusRedirectImgUsemap && '#img-usemap',
          supports.focusObjectSvg && '#object-svg',
          platform.is.TRIDENT && '#svg',
          supports.focusObjectSvg && '#object-tabindex-svg',
          '#svg-link',
          !supports.AVOID_QUICKTIME && '#embed',
          !supports.AVOID_QUICKTIME && '#embed-tabindex-0',
          '#embed-svg',
          '#embed-tabindex-svg',
          !supports.AVOID_MEDIA && supports.focusAudioWithoutControls && '#audio',
          !supports.AVOID_MEDIA && '#audio-controls',
          '#label',
          '#input',
          '#input-tabindex--1',
          '#input-disabled',
          supports.focusFieldset && 'fieldset',
          '#fieldset-disabled-input',
          '#span-contenteditable',
          document.body.style.webkitUserModify !== undefined && '#span-user-modify',
          '#img-ismap-link',
          supports.focusImgIsmap && '#img-ismap',
          supports.focusScrollContainer && '#scroll-container',
          supports.focusScrollBody && '#scroll-body',
          supports.focusScrollContainerWithoutOverflow && '#scroll-container-without-overflow',
          supports.focusScrollContainerWithoutOverflow && '#scroll-body-without-overflow',
          supports.focusScrollContainer && '#div-section-overflow-scroll',
          supports.focusScrollContainer && !supports.focusScrollBody && '#section-div-overflow-scroll',
          supports.focusScrollBody && '#section-div-overflow-scroll-body',
          supports.focusFlexboxContainer && '#flexbox-container',
          supports.focusFlexboxContainer && '#flexbox-container-child',
          '#focusable-flexbox',
          supports.focusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      },

      context: function() {
        var expected = [
          '#link',
          '#link-tabindex--1',
        ];
        var result = queryFocusable({
          strategy: 'all',
          context: '.context',
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = [
          'div',
          '#link',
          '#link-tabindex--1',
        ];
        var result = queryFocusable({
          strategy: 'all',
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'children of <canvas>': function() {
        var container = fixture.add([
          /*eslint-disable indent */
          '<canvas>',
            '<input type="text" id="canvas-input">',
            '<input type="text" id="canvas-input-tabindex--1" tabindex="-1">',
            '<a href="#void" id="canvas-a">hello</a>',
            '<a href="#void" id="canvas-a-tabindex--1" tabindex="-1">hello</a>',
            '<span tabindex="0" id="canvas-span-tabindex-0">hello</span>',
            '<span tabindex="-1" id="canvas-span-tabindex--1">hello</span>',
          '</canvas>',
          /*eslint-enable indent */
        ], 'canvas-container');

        var expected = [
          '#canvas-input',
          '#canvas-input-tabindex--1',
          '#canvas-a',
          '#canvas-a-tabindex--1',
          '#canvas-span-tabindex-0',
          '#canvas-span-tabindex--1',
        ];
        var result = queryFocusable({
          strategy: 'all',
          context: container,
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'extended: Shadow DOM': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var host = document.createElement('div');
        host.id = 'first-shadow-host';
        fixture.root.appendChild(host);
        shadowInputFixture.createShadowRoot(fixture);

        var result = queryFocusable({
          strategy: 'all',
        }).map(fixture.nodeToString);

        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.focusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          '#image-map-area-nolink',
          supports.focusRedirectImgUsemap && '#img-usemap',
          supports.focusObjectSvg && '#object-svg',
          supports.focusObjectSvg && '#object-tabindex-svg',
          '#svg-link',
          !supports.AVOID_QUICKTIME && '#embed',
          !supports.AVOID_QUICKTIME && '#embed-tabindex-0',
          '#embed-svg',
          '#embed-tabindex-svg',
          !supports.AVOID_MEDIA && supports.focusAudioWithoutControls && '#audio',
          !supports.AVOID_MEDIA && '#audio-controls',
          '#label',
          '#input',
          '#input-tabindex--1',
          '#input-disabled',
          '#fieldset-disabled-input',
          '#span-contenteditable',
          document.body.style.webkitUserModify !== undefined && '#span-user-modify',
          '#img-ismap-link',
          supports.focusScrollContainer && '#scroll-container',
          supports.focusScrollContainer && '#div-section-overflow-scroll',
          supports.focusScrollContainer && !supports.focusScrollBody && '#section-div-overflow-scroll',
          supports.focusScrollBody && '#section-div-overflow-scroll-body',
          supports.focusFlexboxContainer && '#flexbox-container',
          supports.focusFlexboxContainer && '#flexbox-container-child',
          '#focusable-flexbox',
          supports.focusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
          '#first-input',
          '#second-input',
          '#third-input',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
