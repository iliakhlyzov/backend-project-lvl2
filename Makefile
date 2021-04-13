lint:
	npx eslint .

asciinema:
	asciinema rec

publish:
	npm publish --dry-run

asciinema:
	asciinema rec

make install link:
	npm i 

make test:
	npm test

make test-coverage:
	npm test -- --coverage --coverageProvider=v8

make install:
	npm install deps

dependency:
	npm ci