"use client";

import dynamic from "next/dynamic";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  return (
    <div>
      <FroalaEditor
        tag="textarea"
        model={value}
        onModelChange={onChange}
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
    </div>
  );
}
