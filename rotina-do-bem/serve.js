const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
const ROOT = __dirname;

const mimeTypes = {
	".html": "text/html",
	".js": "text/javascript",
	".wasm": "application/wasm",
	".pck": "application/octet-stream",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".svg": "image/svg+xml",
	".json": "application/json",
	".ttf": "font/ttf",
	".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
	res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
	res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

	let filePath = path.join(ROOT, req.url === "/" ? "index.html" : req.url);
	filePath = path.normalize(filePath);

	if (!filePath.startsWith(ROOT)) {
		res.writeHead(403);
		res.end();
		return;
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end("Not Found");
			return;
		}
		const ext = path.extname(filePath);
		res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
		res.writeHead(200);
		res.end(data);
	});
});

server.listen(PORT, () => {
	console.log(`Serving at http://127.0.0.1:${PORT}/`);
});
