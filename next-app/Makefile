.PHONY: next-bb install clean

next-bb: install
	npm run dev

install:
	@if [ ! -d "node_modules" ]; then \
		echo "Installing dependencies..."; \
		npm install; \
	else \
		echo "Dependencies already installed."; \
	fi

clean:
	rm -rf node_modules .next

.DEFAULT_GOAL := next-bb
