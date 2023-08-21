import { useState } from "react";
import "./styles.css";

export default function Practise() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  children,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  expanded = false,
  collapsedNumWords = 10,
  className = "",
  buttonColor = "#000",
}) {
  const [isOpen, setIsOpen] = useState(expanded);

  function getFirstXWords(text, collapsedNumWords) {
    // 用空格分割文本为单词数组
    const words = text.trim().split(" ");
    // 去除数组中的空字符串
    const nonEmptyWords = words.filter((word) => word !== "");
    // 选取前二十个单词
    const firstTwentyWords = nonEmptyWords.slice(0, collapsedNumWords);
    // 将选取的单词重新组合成文本
    const result = firstTwentyWords.join(" ");
    return result;
  }

  const shortText = getFirstXWords(children, collapsedNumWords) + "... ";
  const longText = children + "... ";

  return (
    <div className={className}>
      {!isOpen ? shortText : longText}
      <button
        style={{ color: `${buttonColor}` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? expandButtonText : collapseButtonText}
      </button>
    </div>
  );
}

// export default function App() {
//     return (
//       <div>
//         <TextExpander>
//           Space travel is the ultimate adventure! Imagine soaring past the stars
//           and exploring new worlds. It's the stuff of dreams and science fiction,
//           but believe it or not, space travel is a real thing. Humans and robots
//           are constantly venturing out into the cosmos to uncover its secrets and
//           push the boundaries of what's possible.
//         </TextExpander>

//         <TextExpander
//           collapsedNumWords={20}
//           expandButtonText="Show text"
//           collapseButtonText="Collapse text"
//           buttonColor="#ff6622"
//         >
//           Space travel requires some seriously amazing technology and
//           collaboration between countries, private companies, and international
//           space organizations. And while it's not always easy (or cheap), the
//           results are out of this world. Think about the first time humans stepped
//           foot on the moon or when rovers were sent to roam around on Mars.
//         </TextExpander>

//         <TextExpander expanded={true} className="box">
//           Space missions have given us incredible insights into our universe and
//           have inspired future generations to keep reaching for the stars. Space
//           travel is a pretty cool thing to think about. Who knows what we'll
//           discover next!
//         </TextExpander>
//       </div>
//     );
//   }

//   function TextExpander({
//     collapsedNumWords = 10,
//     expandButtonText = "Show more",
//     collapseButtonText = "Show less",
//     buttonColor = "#1f09cd",
//     expanded = false,
//     className,
//     children
//   }) {
//     const [isExpanded, setIsExpanded] = useState(expanded);

//     const displayText = isExpanded
//       ? children
//       : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";
//       ???要好好学习js哇

//     const buttonStyle = {
//       background: "none",
//       border: "none",
//       font: "inherit",
//       cursor: "pointer",
//       marginLeft: "6px",
//       color: buttonColor
//     };

//     return (
//       <div className={className}>
//         <span>{displayText}</span>
//         <button onClick={() => setIsExpanded((exp) => !exp)} style={buttonStyle}>
//           {isExpanded ? collapseButtonText : expandButtonText}
//         </button>
//       </div>
//     );
//   }
