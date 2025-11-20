"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface Props {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
      ],
    }),
    []
  );

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Type your description here..."
        className="h-64 mb-12" // Added height and margin for toolbar
      />
    </div>
  );
}
