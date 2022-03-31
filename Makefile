compile:
	@rm build  -rf
	@mkdir build
	@npm i
	@node_modules/.bin/pkg . -t node16-linux,node16-macos,node16-win -C brotli

start:
	@node src/index.js ./test-folder/
