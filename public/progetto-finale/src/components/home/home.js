import './home.css'

export default function Home() {
    return (
        <>
            <header className="homeHeader">
                <img src="" alt="EasyNotes"/>
                <div>
                    <div>
                        <a href="" target="_blank">documentation</a>
                    </div>
                    <div className="homeSign">
                        <div>Sign Up</div>
                        <div>Sign In</div>
                    </div>
                </div>
            </header>
            <main className="homeMain">
                <section>
                    <div>
                        What is EasyNotes?
                    </div>
                    <div>
                        EasyNotes è un'applicazione che ti permette di scrivere velocemente e facilmente appunti di qualsiasi tipo. <br/>
                        Scrivi gli appunti direttamente in Markdown e ottiene la traduzione istantanea.
                        Con EasyNotes è possibile accedere a tutti gli appunti online degli altri utenti.
                    </div>
                </section>

                <section>
                    {/* qua metto l'esempio di come funiziona l'app */}
                </section>

                <section>
                    <div>
                        Perchè segliere EasyNotes invece di altre app si appunti?
                    </div>
                    <div>
                        Markdown is portable. Files containing Markdown-formatted text can be opened using virtually any application. If you decide you don’t like the Markdown application you’re currently using, you can import your Markdown files into another Markdown application. That’s in stark contrast to word processing applications like Microsoft Word that lock your content into a proprietary file format.

                        Markdown is platform independent. You can create Markdown-formatted text on any device running any operating system.

                        Markdown is future proof. Even if the application you’re using stops working at some point in the future, you’ll still be able to read your Markdown-formatted text using a text editing application. This is an important consideration when it comes to books, university theses, and other milestone documents that need to be preserved indefinitely.
                    </div>
                </section>
            </main>
        </>
    )
}