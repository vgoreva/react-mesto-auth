import { Link } from "react-router-dom"

function AuthPage({ name, title, children, titleButton, onSubmit }) {
    return (
        <section className="login">
            <h2 className="login__title">{title}</h2>
            <form className="login__form" name={`login_type_${name}`} noValidate="" onSubmit={onSubmit}>
            {children}
                <button className={`login__button login__button_type_${name}`} type="submit">{titleButton}</button>
                {name === "register" ? <span className="login__note">Уже зарегистрированы? <Link to={"/sign-in"} className="login__link"> Войти </Link> </span> : ""}
            </form>
        </section>
    )
}

export default AuthPage