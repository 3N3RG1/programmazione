import ReactMarkdown from 'react-markdown'  // React-markdown extension
import remarkGfm from 'remark-gfm' // Git Flavored Markdown - which adds support for strikethrough, tables, tasklists and URLs directly
import rehypeRaw from 'rehype-raw' // use HTML in Markdown
import sanitizeHtml from "sanitize-html" // https://www.npmjs.com/package/sanitize-html?ref=blixt-dev
// import ContentEditable from 'react-contenteditable'
import { useState, useCallback } from 'react'

export default function Markdown() {
    const [content, setContent] = useState('scrivi qualcosa')

    // const onContentChange = useCallback(evt => {
	// 	const sanitizeConf = {
	// 		allowedTags: ["picture", "source", "img", "details", "summary", "sup", "sub", "br" ], // tag che accetta GFM
	// 		allowedAttributes: { source: ["media", "srcset"], img: ["src", "alt"], details: ["opens"] }
	// 	}
	// 	setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))
	// }, [])

    return (
        <div style={{display: 'flex', width: '100%', height: '100%'}}>
            <Left content={content} setContent={setContent}/>
            <Right content={content}/>
        </div>
    )
}

function Left({content, setContent}) {
    const sanitizeConf = {
        allowedTags: ["picture", "source", "img", "details", "summary", "sup", "sub", "br" ],
        allowedAttributes: { source: ["media", "srcset"], img: ["src", "alt"], details: ["open"] }
    }

    return (
        <textarea
            style={{width: '100%', height: '100%', backgroundColor: 'white', color: 'blue', overflowY: "scroll"}}
            // onChange={e => setContent(sanitizeHtml(e.target.value, sanitizeConf))}
            // onFocus={e => setContent(sanitizeHtml(e.target.value, sanitizeConf))}
            onChange={e => setContent(e.target.value)}
        >
            {content}
        </textarea>
    )
    // return (
	// 	<ContentEditable
    //      style={{width: '100%', height: '100%', backgroundColor: 'white', color: 'black', overflowY: "scroll"}}
	// 		onChange={onContentChange}
	// 		onBlur={onContentChange}
	// 		html={content}
    //  />
	// )
}

function Right({content}) {
    return (
        <div style={{width: '100%', height: '100%', backgroundColor: 'silver', color: 'white', overflowY: "scroll"}}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // rehypePlugins={[rehypeRaw]}
                components={{
                    


                    em: ({node, ...props}) => <i style={{color: 'red'}} {...props} />,
                    h1: ({node, ...props}) => <h1 style={{borderBottom: '1px solid blue', color: 'red'}} {...props} />,
                    code: ({node, ...props}) => <code style={{backgroundColor: 'lime', color: 'purple'}} {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}