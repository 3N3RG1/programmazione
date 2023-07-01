import ReactMarkdown from 'react-markdown'  // React-markdown extension
import remarkGfm from 'remark-gfm' // Git Flavored Markdown - which adds support for strikethrough, tables, tasklists and URLs directly
import rehypeRaw from 'rehype-raw' // use HTML in Markdown
import sanitizeHtml from "sanitize-html" // https://www.npmjs.com/package/sanitize-html?ref=blixt-dev
// import ContentEditable from 'react-contenteditable'
import { useState, useCallback } from 'react'

export default function Markdown() {
    const [content, setContent] = useState('scrivi qualcosa')

    // const onContentChange = useCallback(evt => {
    //     setContent(evt.currentTarget.innerHTML)
    // }, [])

    const onContentChange = useCallback(evt => {
		const sanitizeConf = {
			allowedTags: ["br"], // ctrl+b: bold, ctrl+i: alternative (emp), ctrl+a: seleziona tutto, ctrl+p: stamp
			// allowedAttributes: { a: ["href"] }
		}
		setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))
	}, [])

    return (
        <div style={{display: 'flex', width: '100%', height: '100%'}}>
            <Left content={content} onContentChange={onContentChange} setContent={setContent}/>
            <Right content={content}/>
        </div>
    )
}

function Left({content, onContentChange, setContent}) {
    return (
        <textarea
            style={{width: '100%', height: '100%', backgroundColor: 'white', color: 'blue', overflowY: "scroll"}}
            onChange={e => setContent(e.target.value)}
            onFocus={e => setContent(e.target.value)}
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
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
            </ReactMarkdown>
        </div>
    )
}