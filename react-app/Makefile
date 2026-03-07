.PHONY: run-bb install clean

run-bb: install
	npm run dev

install:
	@if [ ! -d "node_modules" ]; then \
		echo "Installing dependencies..."; \
		npm install; \
	else \
		echo "Dependencies already installed."; \
	fi

clean:
	rm -rf node_modules dist

.DEFAULT_GOAL := run-bb
