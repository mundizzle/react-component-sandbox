import React from 'react'
import ReactDOM from 'react-dom'

import * as components from './components'

Object.keys(components).forEach(component => {
  window[component] = components[component]
})

window.React = React
window.ReactDOM = ReactDOM
window.mountNode = document.getElementById('mountNode')

const reactEditor = CodeMirror.fromTextArea(
  document.getElementById('reactEditor'),
  {
    mode: 'javascript',
    lineNumbers: 'true'
  }
)

const markupEditor = CodeMirror.fromTextArea(
  document.getElementById('markupEditor'),
  {
    mode: 'xml',
    htmlMode: true,
    readOnly: true
  }
)

const evaluate = () => {
  try {
    eval(
      Babel.transform(reactEditor.getValue(), {
        presets: ['es2015', 'stage-2', 'react']
      }).code
    )
    markupEditor.setValue(
      html_beautify(mountNode.innerHTML, { indent_size: 2 })
    )
  } catch (e) {
    mountNode.innerHTML = `<p style="text-align: center;"><img src="data:image/png;base64,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" /></p>`
    mountNode.className = 'error'
    markupEditor.setValue(e.toString())
  }
}

reactEditor.on('change', evaluate)
evaluate()

const availableComponents = document.getElementById('availableComponents')
Object.keys(components).forEach(component => {
  var item = document.createElement('li')
  var text = document.createTextNode(`<${component} />`)
  item.appendChild(text)
  availableComponents.appendChild(item)
})
