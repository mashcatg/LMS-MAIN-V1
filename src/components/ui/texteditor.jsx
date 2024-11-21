import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div>
      <div className="toolbar">
        <button onMouseDown={(e) => {e.preventDefault(); toggleInlineStyle('BOLD');}}>Bold</button>
        <button onMouseDown={(e) => {e.preventDefault(); toggleInlineStyle('ITALIC');}}>Italic</button>
        <button onMouseDown={(e) => {e.preventDefault(); toggleInlineStyle('UNDERLINE');}}>Underline</button>
      </div>
      <div className="editor" style={{ border: '1px solid #ddd', padding: '10px' }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default TextEditor;