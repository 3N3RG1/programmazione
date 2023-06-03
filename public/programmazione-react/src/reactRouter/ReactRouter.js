import { Routes, Route } from 'react-router-dom'; // Routes e Route
import NavBar from './NavBar';
import Home from './Home';
import Post from './Post';
import Error from './Error';
import Aside from './Aside';
import './reactRouter.css';

export default function ReactRouter() {
    const slice = [0, 15]

    return (
        <>
            <NavBar slice={slice}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={'/post/:n'} element={<Post slice={slice} />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Aside slice={slice}/>
        </>
    )
}

// - sistema la navbar e trova un modo per non fargli fare tutto il fetch

// chiedi ad alberto se conviene caricare subito tutti i post oppure no? (ci sarebbe il problema dei link)
// controlla react appunti
// metti il goback

// CSS:
// - navBar: sistema la grandezza dei link che danno problemi quando rimpicciolisco la pagina