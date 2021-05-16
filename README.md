### Hexlet tests and linter status:
[![Actions Status](https://github.com/iliakhlyzov/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/iliakhlyzov/backend-project-lvl2/actions)
<a href="https://codeclimate.com/github/iliakhlyzov/backend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/736ec53f8dd0cbf00c0e/maintainability" /></a>
<a href="https://codeclimate.com/github/iliakhlyzov/backend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/736ec53f8dd0cbf00c0e/test_coverage" /></a>
[![Super-Linter](https://github.com/iliakhlyzov/backend-project-lvl2/actions/workflows/superlinter.yml/badge.svg)](https://github.com/iliakhlyzov/backend-project-lvl2/actions/workflows/superlinter.yml)


<h2>Описание</h2>
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/.

Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

<h3>Возможности утилиты:</h3>

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json


<h3>Пример использования:</h3>

  Формат plain:
  
    $ gendiff --format plain path/to/file.yml another/path/file.json

    Property 'common.follow' was added with value: false
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed


  Формат stylish:
  
    $ gendiff filepath1.json filepath2.json

    {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }

<h3>Оформление</h3>

- В файле README.md приложены ссылки на asciinema каждого шага.
- В файле README.md стоят бейджики Codeclimate и Github Actions.
- В репозитории нет лишних (временных файлов и директорий). Все лишнее добавлено в .gitignore.

<h3>Сервисы</h3>

- На Codeclimate проверяется покрытие тестами, бейджик его отображает.
- На Github Actions проверяются и стандарты кодирования и прогоняются тесты.
- Бейджик Github Actions зелёный, то есть проверки должны проходить.

<h3>Код</h3>
<h3>Порядок проверки</h3>

Проверка кода идет по пунктам указанным ниже. Если на верхнем уровне есть серьезные проблемы, то проверка останавливается до исправления.

- Конфигурация (линтеры, запуск тестов, CI).
- Тесты (фикстуры, дублирование, уровень погружения).
- Исполняемый файл (библиотеки и скрипты).
- Основной поток выполнения главной библиотечной функции.
- Парсинг данных (отсутствие побочных эффектов).
- Построение внутреннего представления (алгоритм, структура).
- Форматеры

<h3>Что есть</h3>

- Код построен в иммутабельном стиле.
- Только es6+ совместимый код: импорты, экспорты.
- Внутреннее представление — это дерево, где каждый элемент — это нода имеющий свой тип.
- Вывод внутри форматеров строится на основе типов нод.
- Фикстуры представлены во всех форматах. Внутри фикстур только вложенные структуры данных.

<h3>Чего нет</h3>

- Переменные (let) и циклы. Только функции высшего порядка + рекурсия.
- Классы.

<h3>Архитектура</h3>

В ходе разработки требовалось выполнять множество операций: чтение файлов, парсинг входящих данных, построение дерева различий, формирование необходимого вывода. 

Помимо внутренней архитектуры, в этом проекте появилась необходимость работать с параметрами командной строки. 

Для организации этой части кода используется популярная библиотека commander.js, архитектура которой позволяет легко строить консольные утилиты.

____

https://asciinema.org/a/405811 - демонстрация работы с .json

https://asciinema.org/a/407241 - демонстрация работы с .yml

https://asciinema.org/a/407991 - демонстрация работы с вложенными структурами

https://asciinema.org/a/408047 - демонстарция работы с разными рендерами

https://asciinema.org/a/408051 - демонстрация работы с выходным форматом json
