var eslint = require('eslint')
var test = require('tape')
var path = require('path')

var linter = new eslint.CLIEngine({
  configFile: path.join(__dirname, '..', 'eslintrc.json')
})

test('it should throw an error on space before function parens.', function(t) {
  t.plan(1)

  var file = path.join(__dirname, 'space-before-function-paren.js')
  var result = linter.executeOnFiles([file]).results[0]

  var expectedMessage = 'Unexpected space before function parentheses.'
  var actualMessage = result.messages[0].message

  t.equals(expectedMessage, actualMessage, 'No space before function parens.')
})

test('it should throw an error on space after generator star.', function(t) {
  t.plan(1)

  var file = path.join(__dirname, 'generator-star-spacing.js')
  var result = linter.executeOnFiles([file]).results[0]

  var expectedMessage = 'Unexpected space after *.'
  var actualMessage = result.messages[0].message

  t.equals(expectedMessage, actualMessage, 'No space after generator star.')
})

test('it should throw an error on missing object curly spaces.', function(t) {
  t.plan(1)

  var file = path.join(__dirname, 'object-curly-spacing.js')
  var result = linter.executeOnFiles([file]).results[0]

  var expectedMessages = [
    'A space is required after \'{\'.',
    'A space is required before \'}\'.'
  ]

  var actualMessages = [
    result.messages[0].message,
    result.messages[1].message
  ]

  t.same(expectedMessages, actualMessages, 'Must have spaces before and after object curly braces.')
})
