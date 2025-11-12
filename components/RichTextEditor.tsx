import React from "react";
import FroalaEditor from "react-froala-wysiwyg";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <FroalaEditor
      tag="textarea"
      model={value}
      onModelChange={(content) => onChange(content)}
      config={{
        placeholderText: "Type your description here...",
        charCounterCount: true,
        toolbarButtons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "|",
          "formatOL",
          "formatUL",
          "|",
          "insertLink",
          "insertImage",
          "|",
          "undo",
          "redo",
        ],
        quickInsertTags: ["p", "h1", "h2", "h3", "ul", "ol", "li"],
      }}
    />
  );
};

export default RichTextEditor;
