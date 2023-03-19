import s from "./css/Layout.module.css"

const Layout = (props)=>{
    return (
        <>
           
            <header className={s.header}>
                <h1 className={s.title}>COVID-19 Statistics</h1>
            </header>
            <main className={s.main}>
                {props.children}
            </main>
        </>
    )
}
export default Layout;
