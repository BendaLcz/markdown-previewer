import './App.scss';
import './fonts.css';

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
//import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
//import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism';

/* MAIN REACT COMPONENT */

class App extends React.Component{
  constructor (props) {
    super (props);
    this.state = {
      input: initialInput,
      displayEditor: "",
      displayPreview: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleEditorView = this.toggleEditorView.bind(this);
    this.togglePreviewView = this.togglePreviewView.bind(this);
  }
  
  handleChange (event) {
    this.setState({
      input: event.target.value
    });
  }
  
  toggleEditorView () {
    if (this.state.displayEditor === "") {
      this.setState({
        displayEditor: "minimized"
      })
    }
    else {
      this.setState({
        displayEditor: ""
      })
    }
  }
  
  togglePreviewView () {
    if (this.state.displayPreview === "") {
      this.setState({
        displayPreview: "minimized"
      })
    }
    else {
      this.setState({
        displayPreview: ""
      })
    }
  }
  
  render () {
    return (
      <div id="wrapper">
        <div id="main">
          <Editor input={this.state.input} handleChange={this.handleChange} display={this.state.displayEditor} toggleView={this.toggleEditorView} />
          <Preview input={this.state.input} display={this.state.displayPreview} toggleView={this.togglePreviewView} />
          <div id="footer">
            <p>&copy; 2021 Libor Benda</p>
          </div>
        </div>
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <div id="editor-wrapper">
      <div id="editor-header">
        <div id="editor-title">
          <i className="fas fa-terminal"></i> Editor
        </div>
        <div id="editor-minimize">
          <button onClick={props.toggleView}><i className={props.display === "" ? "fas fa-window-minimize" : "fas fa-window-maximize"}></i></button>
        </div>
      </div>
      <textarea id="editor" className={props.display} onChange={props.handleChange}>{props.input}</textarea>
    </div>
  );
};

const Preview = (props) => {
  let markdown = props.input;

  return (
    <div id="preview-wrapper">
      <div id="preview-header">
        <div id="preview-title">
          <i className="fas fa-code"></i> Preview
        </div>
        <div id="preview-minimize">
          <button onClick={props.toggleView}><i className={props.display === "" ? "fas fa-window-minimize" : "fas fa-window-maximize"}></i></button>
        </div>
      </div>
      <div id="preview" className={props.display}><ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /></div>
    </div>
  );
};

/* INITIAL INPUT PLACEHOLDER BORROWED FROM THE FCC EXAMPLE */

const initialInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;


export default App;
