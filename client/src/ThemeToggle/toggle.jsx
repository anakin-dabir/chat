import { useState, useEffect } from 'react'


const MyAwesomeThemeComponent = () => {
    const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];
    const [currentTheme, setCurrentTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'light')
    const toggle = (e) => {
        setCurrentTheme(e.target.value);
    }
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', JSON.stringify(currentTheme));
    }, [currentTheme]);
    return (


        <select value={currentTheme} onChange={toggle} className="select select-bordered select-primary w-full max-w-xs">
            <option disabled="disabled" value="selected">Choose your superpower</option>
            {themes.map((theme, i) => {
                return <option key={i} value={theme}>{theme}</option>
            })}
        </select>
    );
}

export default MyAwesomeThemeComponent;