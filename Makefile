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
	npx jest

make test_coverage:
	npx jest --coverage