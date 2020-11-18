
window.MathJax = {
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    processEscapes: true
  },
  TeX: {
    Macros: {
      R: "{ \\mathbb R }",
      Z: "{ \\mathbb Z }",
      Q: "{ \\mathbb Q }",
      N: "{ \\mathbb N }",
      set: ["\\{ #1 \\}", 1],
      setofall: "\\{",
      suchthat: "\\vert",
      setend: "\\}",
      abs: ["\\left\\lvert #1 \\right\\rvert",1],
      eps: "\\varepsilon"
    },
    equationNumbers: { autoNumber: "AMS" }
  },
  "HTML-CSS": { availableFonts: ["TeX"] }
};
