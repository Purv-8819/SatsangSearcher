import React from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": ".pdf", "text/plain": ".txt" },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>{props.text}</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
