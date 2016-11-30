// REQUIRES
const compile = require('google-closure-compiler-js').compile;
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawnSync;

// FUNCTIONS
const Minify = function () {
	console.log("Minifying JS code...");
	try
	{
		stats = fs.statSync('build/sage.js');
		fs.unlinkSync('build/sage.js');
	}
	catch (e) { }
	try
	{
		stats = fs.statSync('build/sage.min.js');
		fs.unlinkSync('build/sage.min.js');
	}
	catch (e) { }
	let js = ConcatFiles("engine");
	fs.writeFileSync("build/sage.js", js);
	let out = compile({
		jsCode: [{ src: js }]
	});
	fs.writeFileSync("build/sage.min.js", out);
};

const CreateDoc = function () {
	console.log("Creating Documentation...");
	try
	{
		stats = fs.statSync('build/doc');
		DeleteFolder('build/doc');
	}
	catch (e) { }
	fs.writeFileSync("conf.js", "{\"templates\":{\"default\":{\"outputSourceFiles\":false}}}");
	fs.mkdirSync("build/doc");
	if (process.platform == "win32")
	{
		spawn("cmd.exe", ["/c", "call", "node_modules\\.bin\\jsdoc", "engine", "-r", "-d", "build/doc", "-c", "conf.js", "-t", "node_modules/namis", "-R", "README.md"]);
	}
	else
	{
		spawn("./node_modules/.bin/jsdoc", ["engine", "-r", "-d", "build/doc", "-c", "conf.js", "-t", "node_modules/namis", "-R", "README.md"]);
	}
	fs.unlinkSync('conf.js');
};

const CreateDocset = function () {
	console.log("Creating Docset...");
	try
	{
		stats = fs.statSync('build/SAGE.docset');
		DeleteFolder('build/SAGE.docset');
	}
	catch (e) { }
	try
	{
		stats = fs.statSync('build/SAGE');
		DeleteFolder('build/SAGE');
	}
	catch (e) { }
	if (process.platform == "win32")
	{
		spawn("cmd.exe", ["/c", "call", "node_modules\\.bin\\jsdoc", "engine", "-r", "-d", "build\\SAGE", "-t", "node_modules\\jsdoc-dash-template", "-R", "README.md"]);
	}
	else
	{
		spawn("./node_modules/.bin/jsdoc", ["engine", "-r", "-d", "build/SAGE", "-t", "node_modules/jsdoc-dash-template", "-R", "README.md"]);
	}
	fs.renameSync("build/SAGE/SAGE.docset", "build/SAGE.docset");
	DeleteFolder("build/SAGE");
};

const DeleteFolder = function (folder) {
	let contains = fs.readdirSync(folder);
	contains.forEach(function (element) {
		let curr = path.join(folder, element);
		let stats = fs.statSync(curr);
		if (stats.isFile())
		{
			fs.unlinkSync(curr);
		}
		else if (stats.isDirectory())
		{
			DeleteFolder(curr);
		}
	});
	fs.rmdirSync(folder);
};

const ConcatFiles = function (folder) {
	let contains = fs.readdirSync(folder);
	let result = "";
	contains.forEach(function (element) {
		let curr = path.join(folder, element);
		let stats = fs.statSync(curr);
		if (stats.isFile())
		{
			result += fs.readFileSync(curr);
		}
		else if (stats.isDirectory())
		{
			result += ConcatFiles(curr);
		}
	});
	return result;
};

// EXECUTE
try
{
	stats = fs.statSync('build');
}
catch (e)
{
	fs.mkdirSync("build");
}
if (process.argv[2] == "compile")
{
	Minify();
}
else if (process.argv[2] == "doc")
{
	CreateDoc();
}
else if (process.argv[2] == "docset")
{
	CreateDocset();
}