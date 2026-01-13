
"use strict";
const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");

// Make SASS a no-op so the pipeline won't try to compile .scss at all
build.subTask("sass", (g, buildOptions, done) => done());

// Belt-and-suspenders: strip any webpack rules that target .scss/.sass
build.configureWebpack.mergeConfig({
  additionalConfiguration: (config) => {
    const rules = (config.module && config.module.rules) ? config.module.rules : [];
    config.module = config.module || {};
    config.module.rules = rules.filter(rule => {
      const t = rule.test && rule.test.toString();
      return !(t && (t.includes("scss") || t.includes("sass")));
    });
    return config;
  }
});

build.initialize(gulp);
``
