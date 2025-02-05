"use client";

import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; 


// TODO terrible component, can probably be refined

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && Prism.languages[language]) {
      setHighlightedCode(Prism.highlight(code, Prism.languages[language], language));
    }
  }, [isMounted, code, language]);

  if (!isMounted) return null; 

  return (
    <div className="relative w-[35vw] mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-4 overflow-x-auto">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <span className="text-sm text-gray-400 ml-auto">{language}</span>
      </div>

      {/* Code Block */}
      <pre className="overflow-x-auto">
				<code>

				</code>
        <code
          className={`language-${language} text-sm`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
