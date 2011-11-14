SHELL := /bin/bash
NODE = node

test:
	@$(NODE) test/run.js

clean:
	rm test/tmp/*

.PHONY: test clean
