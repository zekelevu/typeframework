/// <reference path="../TypeFramework.ts" />

declare var require: NodeJS.Require;
var _ = <LoDash.LoDashStatic> require('lodash');
var fs = <NodeJS.FS.FSStatic> require('fs');
var path = <NodeJS.Path> require('path');

var extend = function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

module TF {
    export var collections: WL.Collection[] = [];
}