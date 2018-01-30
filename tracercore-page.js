/* global URL ImageTracer dat */
"use strict";

const elImage = document.getElementById('source');
const elPicker = document.getElementById('picker');

const traceOptions = {
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

let fileUrl;

function traceImage() {
  if (fileUrl) ImageTracer.imageToSVG(fileUrl, svgString => {
    elImage.src = 'data:image/svg+xml,' + svgString;
  }, traceOptions);
}

const optionConstraints = {
  ltres: {min: 0},
  qtres: {min: 0},
  colorsampling: {values: {Disabled: 0, Random: 1, Deterministic: 2}},
  numberofcolors: {min: 2, step: 1},
  mincolorratio: {min: 0},
  colorquantcycles: {min: 1, step: 1},
  scale: {min: 0},
  roundcoords: {min: 0, max: 20, step: 1},
  lcpr: {min: 0},
  qcpr: {min: 0}
};

const gui = new dat.GUI();

gui.remember(traceOptions);

for (let key of Object.keys(traceOptions)) {
  const opts = optionConstraints[key];
  let controller = opts && opts.values ?
    gui.add(traceOptions, key, opts.values) : gui.add(traceOptions, key);
  if (opts) {
    if (opts.min) controller.min(opts.min);
    if (opts.max) controller.min(opts.max);
    if (opts.step) controller.min(opts.step);
  }
  controller.onFinishChange(traceImage);
}

elPicker.addEventListener('change', evt => {
  fileUrl = URL.createObjectURL(elPicker.files[0]);
  //elImage.src = fileUrl;
  traceImage(fileUrl);
});
