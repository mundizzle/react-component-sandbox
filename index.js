import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

const name = 'mundi'
const App = () => {
  return (
    <div>
      <h1>Cool Page</h1>
      <p>Hello <b>{name}</b></p>
    </div>
  )
}

window.App = App
window.React = React
window.ReactDOM = ReactDOM
window.ReactDOMServer = ReactDOMServer

const babelConfig = { presets: ['es2015', 'stage-2', 'react'] }

const evaluate = function() {
  const value = reactEditor.getValue()

  const renderValue = `
  ${value}
  ReactDOM.render(<App />, document.getElementById('root'))
  `

  const renderToStaticMarkupValue = `
  ${value}
  ReactDOMServer.renderToStaticMarkup(<App />)
  `

  markupEditor.setValue(
    html_beautify(
      eval(Babel.transform(renderToStaticMarkupValue, babelConfig).code)
    )
  )
  eval(Babel.transform(renderValue, babelConfig).code)
}

const editorConfig = {
  mode: 'javascript',
  lineNumbers: 'true',
  theme: 'solarized'
}

const reactEditor = CodeMirror.fromTextArea(
  document.getElementById('reactEditor'),
  editorConfig
)

const markupEditor = CodeMirror.fromTextArea(
  document.getElementById('markupEditor'),
  Object.assign(editorConfig, { readOnly: true })
)

reactEditor.on('change', evaluate)
evaluate()
