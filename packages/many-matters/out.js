[
  {
    "type": "Workshop",
    "props": {
      "name": "Many Minor Matters",
      "author": "Ashi Krishnan <hi@ashi.io>"
    },
    "children": [
      "\n",
      {
        "type": "Concept",
        "props": {
          "name": "Introduction"
        },
        "children": [
          "Many minor matters is a mechanism for maintainably managing many markups\n",
          "(or downs).\n",
          "\n",
          {
            "type": "Action",
            "props": {
              "name": "Say again?"
            },
            "children": [
              "MMM uses indentation and a very light syntax to distinguish between embedded\n",
              "pieces of text in different languages. This is to solve the various escaping\n",
              "problems that can happen when you try to, for example, write `JS` code or\n",
              "*Markdown* inside JSX.\n",
              "\n",
              "This file starts with a matter header with a single prop.\n"
            ],
            "indent": 4
          }
        ],
        "indent": 2
      },
      {
        "type": "Concept",
        "props": {
          "name": "About matters"
        },
        "children": [
          {
            "type": "Action",
            "props": {
              "name": "Simple matters"
            },
            "children": [
              "This is what a matter looks like: indented, and with a head at the top.\n",
              "Indented lines without tags are not considered new matters.\n",
              "\n",
              {
                "type": "Hint",
                "props": {
                  "name": ""
                },
                "children": [
                  "This matter is a Hint. It'll generate a `<Hint>` tag in the JSX output. That's\n",
                  "the extent of what MMM knows about what it's doing---it's a very thin wrapper\n",
                  "on top of JSX.\n"
                ],
                "indent": 6
              }
            ],
            "indent": 4
          },
          {
            "type": "Action",
            "props": {
              "name": "Separators and leaf blocks"
            },
            "children": [
              "\n",
              "MMM aims to get out of the way of whatever languages you want to write about:\n",
              "\n",
              {
                "type": "Code.Block",
                "props": {
                  "name": "mmm"
                },
                "children": [
                  "@-[Code] js\n",
                  "// This is a tag with a separator. The separator is the '-' before the\n",
                  "// [Code], and it tells MMM that this matter is a *leaf*. MMM will not\n",
                  "// try to parse deeper Matters.\n",
                  "/*\n",
                  "  So,\n",
                  "    @[This]\n",
                  "    is not a new matter.\n",
                  "*/\n",
                  "// MMM will still try to parse consecutive Matters, though. You must\n",
                  "// include the separator again, like this:  \n",
                  "\n",
                  "@-[Code] python\n",
                  "# The purpose of all this is to keep MMM from getting tripped up on \n",
                  "# languages where '@[' is a reasonable way to start a line.\n",
                  "\n",
                  "@-[Code] objc  \n",
                  "// So we can show an array literal in objective C, for instance:\n",
                  "@[@\"Apples\", @\"Bananas\", @\"Cucumbers\"];    \n"
                ],
                "indent": 6
              }
            ],
            "indent": 4
          },
          "When displayed, the above matters look like:\n",
          "\n",
          {
            "type": "Code.Block",
            "props": {
              "name": "js"
            },
            "children": [
              "// This is a tag with a separator. The separator is the '-' before the\n",
              "// [Code], and it tells MMM that this matter is a *leaf*. MMM will not\n",
              "// try to parse deeper Matters.\n",
              "/*\n",
              "  So,\n",
              "    @[This]\n",
              "    is not a new matter.\n",
              "*/\n",
              "// MMM will still try to parse consecutive Matters, though. You must\n",
              "// include the separator again, like this:  \n"
            ],
            "indent": 6
          },
          {
            "type": "Code.Block",
            "props": {
              "name": "python"
            },
            "children": [
              "# The purpose of all this is to keep MMM from getting tripped up on \n",
              "# languages where '@[' is a reasonable way to start a line.\n"
            ],
            "indent": 6
          },
          {
            "type": "Code.Block",
            "props": {
              "name": "objc"
            },
            "children": [
              "// So we can show an array literal in objective C, for instance:\n",
              "@[@\"Apples\", @\"Bananas\", @\"Cucumbers\"];    \n"
            ],
            "indent": 6
          }
        ],
        "indent": 2
      },
      {
        "type": "Concept",
        "props": {
          "name": "Things that don't work yet"
        },
        "children": [
          "\n",
          {
            "type": "Action",
            "props": {
              "name": "Inclusions"
            },
            "children": [
              "This is an inclusion:\n",
              "\n",
              {
                "type": "Code",
                "props": {
                  "name": "mmm"
                },
                "children": [
                  "@[...] ./intro.mmm\n"
                ],
                "indent": 6
              },
              "It includes all the matters from intro.mmm right here.\n",
              "\n",
              "Inclusions don't work yet.\n"
            ],
            "indent": 4
          }
        ],
        "indent": 2
      }
    ],
    "indent": 0
  }
]
module.exports = () =>
React.createElement(Workshop, {
  "name": "Many Minor Matters",
  "author": "Ashi Krishnan <hi@ashi.io>"
} , "\n",
  React.createElement(Concept, {
  "name": "Introduction"
} , "Many minor matters is a mechanism for maintainably managing many markups\n(or downs).\n\n",
    React.createElement(Action, {
  "name": "Say again?"
} , "MMM uses indentation and a very light syntax to distinguish between embedded\npieces of text in different languages. This is to solve the various escaping\nproblems that can happen when you try to, for example, write `JS` code or\n*Markdown* inside JSX.\n\nThis file starts with a matter header with a single prop.\n")),
  React.createElement(Concept, {
  "name": "About matters"
} ,     React.createElement(Action, {
  "name": "Simple matters"
} , "This is what a matter looks like: indented, and with a head at the top.\nIndented lines without tags are not considered new matters.\n\n",
      React.createElement(Hint, {
  "name": ""
} , "This matter is a Hint. It'll generate a `<Hint>` tag in the JSX output. That's\nthe extent of what MMM knows about what it's doing---it's a very thin wrapper\non top of JSX.\n")),
    React.createElement(Action, {
  "name": "Separators and leaf blocks"
} , "\nMMM aims to get out of the way of whatever languages you want to write about:\n\n",
      React.createElement(Code.Block, {
  "name": "mmm"
} , "@-[Code] js\n// This is a tag with a separator. The separator is the '-' before the\n// [Code], and it tells MMM that this matter is a *leaf*. MMM will not\n// try to parse deeper Matters.\n/*\n  So,\n    @[This]\n    is not a new matter.\n*/\n// MMM will still try to parse consecutive Matters, though. You must\n// include the separator again, like this:  \n\n@-[Code] python\n# The purpose of all this is to keep MMM from getting tripped up on \n# languages where '@[' is a reasonable way to start a line.\n\n@-[Code] objc  \n// So we can show an array literal in objective C, for instance:\n@[@\"Apples\", @\"Bananas\", @\"Cucumbers\"];    \n")),
"When displayed, the above matters look like:\n\n",
      React.createElement(Code.Block, {
  "name": "js"
} , "// This is a tag with a separator. The separator is the '-' before the\n// [Code], and it tells MMM that this matter is a *leaf*. MMM will not\n// try to parse deeper Matters.\n/*\n  So,\n    @[This]\n    is not a new matter.\n*/\n// MMM will still try to parse consecutive Matters, though. You must\n// include the separator again, like this:  \n"),
      React.createElement(Code.Block, {
  "name": "python"
} , "# The purpose of all this is to keep MMM from getting tripped up on \n# languages where '@[' is a reasonable way to start a line.\n"),
      React.createElement(Code.Block, {
  "name": "objc"
} , "// So we can show an array literal in objective C, for instance:\n@[@\"Apples\", @\"Bananas\", @\"Cucumbers\"];    \n")),
  React.createElement(Concept, {
  "name": "Things that don't work yet"
} , "\n",
    React.createElement(Action, {
  "name": "Inclusions"
} , "This is an inclusion:\n\n",
      React.createElement(Code, {
  "name": "mmm"
} , "@[...] ./intro.mmm\n"),
"It includes all the matters from intro.mmm right here.\n\nInclusions don't work yet.\n")))
