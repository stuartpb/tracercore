/* global URL ImageTracer dat */
"use strict";

window.noFallbackNeeded = function () {
  var es = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  return 'orbW';
};

var elImage = document.getElementById('source');
var elPicker = document.getElementById('picker');

var traceOptions = {
  ltres: 1,
  qtres: 1,
  rightangleenhance: true,
  colorsampling: 2, // enum - 0: disabled, generating a palette; 1: random sampling; 2: deterministic sampling
  numberofcolors: 16,
  mincolorratio: 0,
  colorquantcycles: 3,
  blurradius: 0,
  blurdelta: 20,
  strokewidth: 1,
  linefilter: false,
  scale: 1,
  roundcoords: 1,
  viewbox: false,
  desc: false,
  lcpr: 0,
  qcpr: 0
};

var fileUrl = void 0;

function traceImage() {
  if (fileUrl) ImageTracer.imageToSVG(fileUrl, function (svgString) {
    elImage.src = 'data:image/svg+xml,' + svgString;
  }, traceOptions);
}

var optionConstraints = {
  ltres: { min: 0 },
  qtres: { min: 0 },
  colorsampling: { values: { Disabled: 0, Random: 1, Deterministic: 2 } },
  numberofcolors: { min: 2, step: 1 },
  mincolorratio: { min: 0 },
  colorquantcycles: { min: 1, step: 1 },
  scale: { min: 0 },
  roundcoords: { min: 0, max: 20, step: 1 },
  lcpr: { min: 0 },
  qcpr: { min: 0 }
};

var gui = new dat.GUI();

gui.remember(traceOptions);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(traceOptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var key = _step.value;

    var opts = optionConstraints[key];
    var controller = opts && opts.values ? gui.add(traceOptions, key, opts.values) : gui.add(traceOptions, key);
    if (opts) {
      if (opts.min) controller.min(opts.min);
      if (opts.max) controller.min(opts.max);
      if (opts.step) controller.min(opts.step);
    }
    controller.onFinishChange(traceImage);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

elPicker.addEventListener('change', function (evt) {
  fileUrl = URL.createObjectURL(elPicker.files[0]);
  //elImage.src = fileUrl;
  traceImage(fileUrl);
});
